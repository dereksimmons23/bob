import { useState, useEffect, useCallback } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import {
  HomeScreen,
  SetupScreen,
  PlayingScreen,
  ChampionScreen,
  VaultScreen,
  CategoryLibrary,
  SharedBracketView,
  SharedVaultView,
  BrandShowcase,
  // QuickPlayScreen, // v3 experiment - hidden for NYE
} from './screens'
import {
  SettingsPanel,
  FeedbackModal,
  FeedbackAdmin,
  AboutModal,
  LegalModal,
  DevToolsModal,
} from './modals'
import { ConfirmModal } from './components'
import { generateBracket, advanceToNextRound } from './lib/bracket'
import { SoundEffects } from './lib/sound'
import { BOB } from './data/bob'
import { CATEGORY_LIBRARY } from './data/categories'
import { SEED_VAULT_DATA } from './data/seedVault'
import { supabase } from './lib/supabase'
import { getDeviceId } from './lib/storage'

function AppContent() {
  const {
    history,
    addToVault,
    deleteFromVault,
    editVaultEntry,
    clearVault,
    resetVault,
    customCategories,
    addCustomCategory,
    soundEnabled,
    toggleSound,
    playerCount,
    setPlayerCount,
    isDevMode,
  } = useApp()

  // Screen state
  const [screen, setScreen] = useState('home')

  // Game state
  const [category, setCategory] = useState('')
  const [categoryType, setCategoryType] = useState('custom')
  const [entrants, setEntrants] = useState([])
  const [bracket, setBracket] = useState(null)
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0)
  const [winners, setWinners] = useState([])
  const [matchupResults, setMatchupResults] = useState([])
  const [finalBracketResults, setFinalBracketResults] = useState([])
  const [champion, setChampion] = useState(null)
  const [runnerUp, setRunnerUp] = useState(null)
  const [championComment, setChampionComment] = useState('')

  // Year in Review state
  const [isYearInReview, setIsYearInReview] = useState(false)
  const [yirRound, setYirRound] = useState(0)
  const [yirWinners, setYirWinners] = useState([])

  // Mount Rushmore state
  const [isMountRushmore, setIsMountRushmore] = useState(false)

  // Undo state
  const [canUndo, setCanUndo] = useState(false)
  const [undoState, setUndoState] = useState(null)

  // BOB state
  const [bobMessage, setBobMessage] = useState('')
  const [bobMood, setBobMood] = useState('normal')

  // Modal state
  const [showSettings, setShowSettings] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showLegal, setShowLegal] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const [confirmModal, setConfirmModal] = useState(null)

  // Shared view state
  const [sharedData, setSharedData] = useState(null)

  // Check for shared routes
  useEffect(() => {
    const path = window.location.pathname
    if (path.startsWith('/b/')) {
      const shareId = path.substring(3)
      setSharedData({ type: 'bracket', id: shareId })
      setScreen('shared-bracket')
    } else if (path.startsWith('/v/')) {
      const shareId = path.substring(3)
      setSharedData({ type: 'vault', id: shareId })
      setScreen('shared-vault')
    }
  }, [])

  // Reset game
  const resetGame = useCallback(() => {
    setCategory('')
    setCategoryType('custom')
    setEntrants([])
    setBracket(null)
    setCurrentRoundIndex(0)
    setCurrentMatchupIndex(0)
    setWinners([])
    setMatchupResults([])
    setFinalBracketResults([])
    setChampion(null)
    setRunnerUp(null)
    setChampionComment('')
    setBobMessage('')
    setBobMood('normal')
    setIsYearInReview(false)
    setYirRound(0)
    setYirWinners([])
    setIsMountRushmore(false)
    setScreen('home')
  }, [])

  // Handle category selection from library
  const handleSelectFromLibrary = useCallback((cat, theme) => {
    if (!cat || !cat.name || !cat.entrants) {
      console.error('Invalid category:', cat)
      return
    }
    setCategory(cat.name)
    setCategoryType(theme || cat.type || 'library')
    setEntrants([...cat.entrants])
    setIsMountRushmore(cat.mountRushmore || false)
    setBobMessage(BOB.random(BOB.welcome))
    setBobMood('normal')
    setScreen('setup')
  }, [])

  // Start game
  const startGame = useCallback(() => {
    if (!category.trim() || entrants.length < 4) return

    const newBracket = generateBracket(entrants)
    setBracket(newBracket)
    setCurrentRoundIndex(0)
    setCurrentMatchupIndex(0)
    setWinners([])
    setMatchupResults([])
    setBobMessage(BOB.random(BOB.matchupIntros))
    setBobMood('normal')
    SoundEffects.play('vote')
    setScreen('playing')
  }, [category, entrants])

  // Handle vote result
  // Signature: (winner, votesA, votesB, margin, wasTieBreaker, loser)
  const handleVoteResult = useCallback((winner, votesA, votesB, margin, wasTieBreaker, loser) => {
    // Save undo state
    setUndoState({
      winners: [...winners],
      matchupResults: [...matchupResults],
      currentMatchupIndex,
      currentRoundIndex,
      bracket: { ...bracket },
    })

    const currentRound = bracket.rounds[currentRoundIndex]

    // Record result
    const result = {
      winner,
      loser,
      votesA,
      votesB,
      margin,
      wasTieBreaker,
      round: currentRound.name,
      isChampionship: currentRound.name === 'Championship',
    }
    setMatchupResults(prev => [...prev, result])

    // Add winner
    const newWinners = [...winners, winner]
    setWinners(newWinners)

    // Advance after delay
    setTimeout(() => {
      const matchupsInRound = currentRound.matchups.length

      if (currentMatchupIndex + 1 >= matchupsInRound) {
        // Round complete
        const roundWinners = currentRound.byes
          ? [...newWinners, ...currentRound.byes]
          : newWinners

        if (roundWinners.length === 1) {
          // Champion!
          const comment = isYearInReview
            ? "The MVP of 2025. All four champions competed. One prevailed. This is the one that defined your year."
            : BOB.random(categoryType === 'nye' ? BOB.championNYE : BOB.champion)
          setChampionComment(comment)

          if (isYearInReview) {
            setIsYearInReview(false)
            setYirRound(0)
            setYirWinners([])
          }

          const finalResults = [...matchupResults, result]
          setFinalBracketResults(finalResults)

          const newEntry = {
            category,
            champion: winner,
            runnerUp: loser,
            date: new Date().toLocaleDateString(),
            categoryType: isYearInReview ? 'nye' : categoryType,
            bobComment: comment,
            matchupResults: finalResults,
          }
          addToVault(newEntry)

          // Track in Supabase
          supabase.from('games').insert({
            category,
            category_type: categoryType,
            champion: winner,
            runner_up: loser,
            player_count: playerCount,
            entrant_count: entrants.length,
            matchup_results: JSON.stringify(finalResults),
            device_id: getDeviceId(),
          }).then(() => {}).catch(() => {})

          setChampion(winner)
          setRunnerUp(loser)
          SoundEffects.play('champion')
          setScreen('champion')
        } else if (roundWinners.length === 2) {
          // Championship round
          const champRound = {
            name: 'Championship',
            matchups: [{
              id: 'final',
              entrantA: roundWinners[0],
              entrantB: roundWinners[1],
              winner: null,
              votesA: 0,
              votesB: 0,
            }],
          }
          setBracket(prev => ({ ...prev, rounds: [...prev.rounds, champRound] }))
          setCurrentRoundIndex(currentRoundIndex + 1)
          setCurrentMatchupIndex(0)
          setWinners([])
          SoundEffects.play('dramatic')
          setBobMessage(BOB.random(BOB.championshipIntro))
          setBobMood('excited')
        } else {
          // Next round
          const updatedBracket = advanceToNextRound(bracket, roundWinners, currentRoundIndex)
          setBracket(updatedBracket)
          setCurrentRoundIndex(currentRoundIndex + 1)
          setCurrentMatchupIndex(0)
          setWinners([])
          SoundEffects.play('roundComplete')

          if (Math.random() < 0.25) {
            setBobMessage(BOB.random(BOB.impatience))
          } else {
            setBobMessage(BOB.random(BOB.matchupIntros))
          }
          setBobMood('normal')
        }
      } else {
        // Next matchup
        SoundEffects.play('advance')
        setCurrentMatchupIndex(currentMatchupIndex + 1)
      }

      setCanUndo(true)
      setTimeout(() => setCanUndo(false), 5000)
    }, 1500)
  }, [bracket, currentRoundIndex, currentMatchupIndex, winners, matchupResults, category, categoryType, playerCount, entrants, isYearInReview, addToVault])

  // Handle undo
  const handleUndo = useCallback(() => {
    if (!canUndo || !undoState) return
    setWinners(undoState.winners)
    setMatchupResults(undoState.matchupResults || [])
    setCurrentMatchupIndex(undoState.currentMatchupIndex)
    setCurrentRoundIndex(undoState.currentRoundIndex)
    setBracket(undoState.bracket)
    setCanUndo(false)
    setUndoState(null)
    setBobMessage("Fine. Let's redo that one. Democracy demands accuracy.")
    SoundEffects.play('vote')
  }, [canUndo, undoState])

  // Year in Review
  const startYearInReview = useCallback(() => {
    setIsYearInReview(true)
    setYirRound(1)
    setYirWinners([])
    // This would load 4 predetermined categories for YIR mode
    setScreen('library')
  }, [])

  // Save custom category
  const saveCustomCategory = useCallback(() => {
    if (!category.trim() || entrants.length < 4) return
    addCustomCategory({
      name: category,
      entrants: [...entrants],
      type: 'custom',
    })
    setBobMessage("Category saved. Future you will thank present you.")
    SoundEffects.play('vote')
  }, [category, entrants, addCustomCategory])

  // Handle confirm delete
  const handleConfirmDelete = useCallback((index, entry) => {
    setConfirmModal({
      message: `Delete "${entry.champion}" from ${entry.category}?`,
      confirmText: 'Delete',
      onConfirm: () => {
        deleteFromVault(index)
        setConfirmModal(null)
      },
    })
  }, [deleteFromVault])

  // Modal renderers
  const renderModals = () => (
    <>
      {showSettings && (
        <SettingsPanel
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onFeedback={() => setShowFeedback(true)}
          onAdmin={() => setShowAdmin(true)}
          onAbout={() => setShowAbout(true)}
          onLegal={() => setShowLegal(true)}
          onDevTools={() => setShowDevTools(true)}
          isDevMode={isDevMode}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
      {showAdmin && <FeedbackAdmin onClose={() => setShowAdmin(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showLegal && <LegalModal onClose={() => setShowLegal(false)} />}
      {confirmModal && (
        <ConfirmModal
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
          variant={confirmModal.variant}
        />
      )}
      {showDevTools && (
        <DevToolsModal
          onClose={() => setShowDevTools(false)}
          onClearAll={() => { localStorage.clear(); window.location.reload() }}
          onResetFirstVisit={() => { localStorage.removeItem('bob-has-visited'); window.location.reload() }}
          onResetVault={resetVault}
          onBrandShowcase={() => setScreen('brand')}
        />
      )}
    </>
  )

  // Shared views
  if (screen === 'shared-bracket' && sharedData?.id) {
    return (
      <SharedBracketView
        bracketId={sharedData.id}
        onHome={() => {
          window.history.pushState({}, '', '/')
          setScreen('home')
        }}
      />
    )
  }

  if (screen === 'shared-vault' && sharedData?.id) {
    return (
      <SharedVaultView
        vaultId={sharedData.id}
        onHome={() => {
          window.history.pushState({}, '', '/')
          setScreen('home')
        }}
      />
    )
  }

  // Home screen
  if (screen === 'home') {
    return (
      <>
        <HomeScreen
          historyCount={history.length}
          onQuickStart={() => setScreen('library')}
          onCustomBracket={() => {
            setCategoryType('custom')
            setScreen('setup')
          }}
          onViewVault={() => setScreen('vault')}
          onYearInReview={startYearInReview}
          onOpenSettings={() => setShowSettings(!showSettings)}
        />
        {renderModals()}
      </>
    )
  }

  // Brand showcase (dev only)
  if (screen === 'brand') {
    return (
      <BrandShowcase onBack={() => setScreen('home')} />
    )
  }

  // Library screen
  if (screen === 'library') {
    return (
      <>
        <CategoryLibrary
          onSelect={handleSelectFromLibrary}
          onCustom={() => {
            setCategoryType('custom')
            setScreen('setup')
          }}
          onBack={() => setScreen('home')}
          customCategories={customCategories}
        />
        {renderModals()}
      </>
    )
  }

  // Vault screen
  if (screen === 'vault') {
    return (
      <>
        <VaultScreen
          history={history}
          onBack={() => setScreen('home')}
          onNewGame={() => setScreen('library')}
          onClearHistory={() => {
            setConfirmModal({
              message: 'Clear all champions from The Vault? This cannot be undone.',
              confirmText: 'Clear All',
              onConfirm: () => {
                clearVault()
                setConfirmModal(null)
              },
            })
          }}
          onDeleteEntry={deleteFromVault}
          onEditEntry={editVaultEntry}
          onConfirmDelete={handleConfirmDelete}
        />
        {renderModals()}
      </>
    )
  }

  // Setup screen
  if (screen === 'setup') {
    return (
      <>
        <SetupScreen
          category={category}
          setCategory={setCategory}
          categoryType={categoryType}
          entrants={entrants}
          setEntrants={setEntrants}
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          bobMessage={bobMessage}
          bobMood={bobMood}
          onStart={startGame}
          onCancel={resetGame}
          onSaveCustom={categoryType === 'custom' ? saveCustomCategory : null}
          onOpenSettings={() => setShowSettings(!showSettings)}
          onLogoClick={() => setScreen('home')}
        />
        {renderModals()}
      </>
    )
  }

  // Playing screen
  if (screen === 'playing' && bracket) {
    return (
      <>
        <PlayingScreen
          bracket={bracket}
          currentRoundIndex={currentRoundIndex}
          currentMatchupIndex={currentMatchupIndex}
          winners={winners}
          category={category}
          categoryType={categoryType}
          playerCount={playerCount}
          bobMessage={bobMessage}
          bobMood={bobMood}
          isYearInReview={isYearInReview}
          yirRound={yirRound}
          canUndo={canUndo}
          onVote={handleVoteResult}
          onUndo={handleUndo}
          onExit={() => {
            setConfirmModal({
              message: 'Exit bracket? Progress will be lost.',
              confirmText: 'Exit',
              variant: 'warning',
              onConfirm: () => {
                setConfirmModal(null)
                resetGame()
              },
            })
          }}
          onOpenSettings={() => setShowSettings(!showSettings)}
        />
        {renderModals()}
      </>
    )
  }

  // Champion screen
  if (screen === 'champion') {
    return (
      <>
        <ChampionScreen
          champion={champion}
          category={category}
          runnerUp={runnerUp}
          categoryType={categoryType}
          bobComment={championComment}
          entrants={entrants}
          playerCount={playerCount}
          matchupResults={finalBracketResults}
          isMountRushmore={isMountRushmore}
          onNewGame={() => setScreen('library')}
          onViewVault={() => setScreen('vault')}
        />
        {renderModals()}
      </>
    )
  }

  return null
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
