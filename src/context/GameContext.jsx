import { createContext, useContext, useState, useReducer, useCallback } from 'react'
import { generateBracket, advanceToNextRound, getRoundName } from '../lib/bracket'
import { SoundEffects } from '../lib/sound'
import { BOB } from '../data/bob'

const GameContext = createContext(null)

// Game state reducer for complex state transitions
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        bracket: action.bracket,
        category: action.category,
        categoryType: action.categoryType,
        entrants: action.entrants,
        currentRoundIndex: 0,
        currentMatchupIndex: 0,
        winners: [],
        matchupResults: [],
        champion: null,
        runnerUp: null,
        championComment: '',
        isPlaying: true,
      }

    case 'RECORD_VOTE':
      return {
        ...state,
        matchupResults: [...state.matchupResults, action.result],
      }

    case 'ADVANCE_MATCHUP':
      return {
        ...state,
        winners: [...state.winners, action.winner],
        currentMatchupIndex: state.currentMatchupIndex + 1,
      }

    case 'ADVANCE_ROUND':
      return {
        ...state,
        bracket: action.bracket,
        currentRoundIndex: state.currentRoundIndex + 1,
        currentMatchupIndex: 0,
        winners: [],
      }

    case 'CROWN_CHAMPION':
      return {
        ...state,
        champion: action.champion,
        runnerUp: action.runnerUp,
        championComment: action.comment,
        isPlaying: false,
      }

    case 'RESET_GAME':
      return {
        bracket: null,
        category: '',
        categoryType: 'custom',
        entrants: [],
        currentRoundIndex: 0,
        currentMatchupIndex: 0,
        winners: [],
        matchupResults: [],
        champion: null,
        runnerUp: null,
        championComment: '',
        isPlaying: false,
      }

    case 'SET_UNDO_STATE':
      return {
        ...state,
        undoState: action.undoState,
        canUndo: true,
      }

    case 'CLEAR_UNDO':
      return {
        ...state,
        undoState: null,
        canUndo: false,
      }

    default:
      return state
  }
}

const initialState = {
  bracket: null,
  category: '',
  categoryType: 'custom',
  entrants: [],
  currentRoundIndex: 0,
  currentMatchupIndex: 0,
  winners: [],
  matchupResults: [],
  champion: null,
  runnerUp: null,
  championComment: '',
  isPlaying: false,
  undoState: null,
  canUndo: false,
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Start a new game with given category and entrants
  const startGame = useCallback((category, categoryType, entrants) => {
    const bracket = generateBracket(entrants)
    dispatch({
      type: 'START_GAME',
      bracket,
      category,
      categoryType,
      entrants,
    })
  }, [])

  // Handle voting on a matchup
  const handleVote = useCallback((winner, votesA, votesB, margin, wasTieBreaker, loser) => {
    const currentRound = state.bracket.rounds[state.currentRoundIndex]
    const currentMatchup = currentRound.matchups[state.currentMatchupIndex]

    // Save undo state before making changes
    dispatch({
      type: 'SET_UNDO_STATE',
      undoState: { ...state },
    })

    // Record the vote result
    dispatch({
      type: 'RECORD_VOTE',
      result: {
        round: currentRound.name,
        entrantA: currentMatchup.entrantA,
        entrantB: currentMatchup.entrantB,
        winner,
        loser,
        votesA,
        votesB,
        margin,
        wasTieBreaker,
      },
    })

    // Get updated winners list
    const newWinners = [...state.winners, winner]
    const matchupsInRound = currentRound.matchups.length

    // Check if round is complete
    if (state.currentMatchupIndex + 1 >= matchupsInRound) {
      // Add byes from play-in round if applicable
      const allWinners = currentRound.byes
        ? [...newWinners, ...currentRound.byes]
        : newWinners

      // Check if we have a champion
      if (allWinners.length === 1) {
        SoundEffects.play('champion')
        const comment = BOB.random(BOB.championship) || BOB.random(BOB.reaction)
        dispatch({
          type: 'CROWN_CHAMPION',
          champion: winner,
          runnerUp: loser,
          comment,
        })
      } else {
        // Advance to next round
        SoundEffects.play('roundComplete')
        const updatedBracket = advanceToNextRound(state.bracket, allWinners, state.currentRoundIndex)
        dispatch({ type: 'ADVANCE_ROUND', bracket: updatedBracket })
      }
    } else {
      // Move to next matchup in current round
      SoundEffects.play('advance')
      dispatch({ type: 'ADVANCE_MATCHUP', winner })
    }
  }, [state])

  // Undo last vote
  const undoLastVote = useCallback(() => {
    if (state.undoState) {
      // Restore the previous state
      Object.keys(state.undoState).forEach(key => {
        state[key] = state.undoState[key]
      })
      dispatch({ type: 'CLEAR_UNDO' })
    }
  }, [state])

  // Reset the game
  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  // Get current matchup info
  const getCurrentMatchup = useCallback(() => {
    if (!state.bracket || !state.isPlaying) return null
    const round = state.bracket.rounds[state.currentRoundIndex]
    if (!round) return null
    return round.matchups[state.currentMatchupIndex]
  }, [state.bracket, state.currentRoundIndex, state.currentMatchupIndex, state.isPlaying])

  // Check if current matchup is championship
  const isChampionship = useCallback(() => {
    if (!state.bracket) return false
    const round = state.bracket.rounds[state.currentRoundIndex]
    return round?.name === 'Championship' || round?.matchups?.length === 1
  }, [state.bracket, state.currentRoundIndex])

  const value = {
    // State
    ...state,

    // Computed values
    currentMatchup: getCurrentMatchup(),
    isChampionship: isChampionship(),

    // Actions
    startGame,
    handleVote,
    undoLastVote,
    resetGame,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
