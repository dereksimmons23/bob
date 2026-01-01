import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Button, Logo } from '../components/ui'
import { BobSays } from '../components/BobSays'
import { ShareCard } from '../components/ShareCard'
import { BOB } from '../data/bob'
import { SoundEffects } from '../lib/sound'
import { supabase } from '../lib/supabase'
import { getDeviceId } from '../lib/storage'

export function ChampionScreen({ champion, category, runnerUp, categoryType, bobComment, entrants, playerCount, matchupResults = [], isMountRushmore = false, onNewGame, onViewVault }) {
  const [showShare, setShowShare] = useState(false)
  const [shareLink, setShareLink] = useState(null)
  const [shareCopied, setShareCopied] = useState(false)
  const [showRecap, setShowRecap] = useState(false)

  // Use passed bobComment or fall back to random
  const displayComment = bobComment || BOB.random(categoryType === 'nye' ? BOB.championNYE : BOB.champion)
  const isNYE = categoryType === 'nye'

  // Extract Mount Rushmore (Final Four) from matchup results
  const getMountRushmore = () => {
    if (!isMountRushmore || matchupResults.length === 0) return null

    // Get Final Four losers (semifinal losers = 3rd/4th place)
    const finalFourMatches = matchupResults.filter(m => m.round === 'Final Four')
    if (finalFourMatches.length !== 2) return null

    // Sort by margin - closer match = 3rd place (fought harder)
    const sorted = [...finalFourMatches].sort((a, b) => a.margin - b.margin)

    return {
      first: champion,
      second: runnerUp,
      third: sorted[0]?.loser,  // Closer semifinal loser = 3rd
      fourth: sorted[1]?.loser, // Bigger blowout loser = 4th
    }
  }

  const rushmore = getMountRushmore()

  // Compute dramatic moments
  const closestCall = matchupResults.length > 0
    ? matchupResults.reduce((closest, m) => (!closest || m.margin < closest.margin) ? m : closest, null)
    : null
  const biggestBlowout = matchupResults.length > 0
    ? matchupResults.reduce((biggest, m) => (!biggest || m.margin > biggest.margin) ? m : biggest, null)
    : null
  const tieBreakers = matchupResults.filter(m => m.wasTieBreaker)
  const totalVotes = matchupResults.reduce((sum, m) => sum + m.votesA + m.votesB, 0)

  // Auto-generate share link on mount
  useEffect(() => {
    const createShareLink = async () => {
      try {
        const { data, error } = await supabase
          .from('shared_brackets')
          .insert({
            category,
            champion,
            runner_up: runnerUp,
            entrants: entrants || [],
            player_count: playerCount || 1,
            bob_comment: displayComment || '',
            device_id: getDeviceId(),
          })
          .select('id')
          .single()

        if (!error && data) {
          setShareLink(`${window.location.origin}/b/${data.id}`)
        }
      } catch (err) {
        console.error('Error pre-creating share link:', err)
      }
    }
    createShareLink()
  }, [])

  // Confetti and sound on mount
  useEffect(() => {
    SoundEffects.play('champion')
    const duration = 4000
    const end = Date.now() + duration
    const colors = isNYE
      ? ['#ffd700', '#ffed4a', '#fff8dc', '#f5deb3', '#fffacd']
      : ['#ffd700', '#ffed4a', '#ff6b6b', '#4ecdc4', '#45b7d1']
    const frame = () => {
      confetti({ particleCount: isNYE ? 5 : 3, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: isNYE ? 5 : 3, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const handleShare = async () => {
    if (shareLink) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${champion} wins ${category}!`,
            text: `${champion.toUpperCase()} crowned champion of "${category}" in Battle o' Brackets! defeated ${runnerUp} in the final`,
            url: shareLink,
          })
          return
        } catch (err) {
          if (err.name === 'AbortError') return
        }
      }
      try {
        await navigator.clipboard.writeText(shareLink)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      } catch {
        setShowShare(true)
      }
    } else {
      setShowShare(true)
    }
  }

  // Mount Rushmore display
  if (rushmore) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div className="animate-scaleIn" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--text-secondary)',
          letterSpacing: '6px',
          marginBottom: '8px',
        }}>
          YOUR MOUNT RUSHMORE OF
        </div>

        <div className="animate-scaleIn" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--accent-gold)',
          letterSpacing: '4px',
          marginBottom: '24px',
        }}>
          {category.toUpperCase()}
        </div>

        <div className="animate-float" style={{ fontSize: '60px', marginBottom: '24px' }}>🗻</div>

        {/* Mount Rushmore Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '500px',
          width: '100%',
          marginBottom: '24px',
        }}>
          {[
            { place: '1st', name: rushmore.first, color: 'var(--accent-gold)', icon: '🥇' },
            { place: '2nd', name: rushmore.second, color: '#c0c0c0', icon: '🥈' },
            { place: '3rd', name: rushmore.third, color: '#cd7f32', icon: '🥉' },
            { place: '4th', name: rushmore.fourth, color: 'var(--text-muted)', icon: '4️⃣' },
          ].map((spot, i) => (
            <div
              key={i}
              className="animate-scaleIn"
              style={{
                background: 'var(--bg-card)',
                border: `2px solid ${spot.color}`,
                borderRadius: '16px',
                padding: '20px 16px',
                animationDelay: `${0.1 * (i + 1)}s`,
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{spot.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                color: spot.color,
                letterSpacing: '1px',
                lineHeight: '1.2',
              }}>
                {spot.name?.toUpperCase() || 'TBD'}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '4px',
              }}>
                {spot.place} Place
              </div>
            </div>
          ))}
        </div>

        <BobSays message="Four legends. One mountain. Carved in stone forever." mood="victory" />

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="large" onClick={onNewGame}>New Bracket</Button>
          <Button variant="secondary" size="large" onClick={handleShare}>
            {shareCopied ? '✓ Copied!' : 'Share'}
          </Button>
          <Button variant="ghost" size="large" onClick={onViewVault}>The Vault</Button>
        </div>

        {showShare && (
          <ShareCard
            champion={champion}
            category={category}
            runnerUp={runnerUp}
            entrants={entrants}
            playerCount={playerCount}
            bobComment={displayComment}
            existingShareLink={shareLink}
            matchupResults={matchupResults}
            closestCall={closestCall}
            biggestBlowout={biggestBlowout}
            isMountRushmore={true}
            rushmore={rushmore}
            onClose={() => setShowShare(false)}
          />
        )}
      </div>
    )
  }

  // Standard champion display
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
    }}>
      <div className="animate-scaleIn" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '24px',
        color: 'var(--text-secondary)',
        letterSpacing: '6px',
        marginBottom: '16px',
      }}>
        {category.toUpperCase()}
      </div>

      <div className="animate-float" style={{ fontSize: '100px', marginBottom: '16px' }}>🏆</div>

      <div className="animate-scaleIn" style={{
        fontFamily: 'var(--font-display)',
        fontSize: '56px',
        background: 'linear-gradient(135deg, var(--accent-gold) 0%, #ffed4a 50%, var(--accent-gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '3px',
        marginBottom: '24px',
        animationDelay: '0.2s',
      }}>
        {champion.toUpperCase()}
      </div>

      <div style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
        defeated <span style={{ color: 'var(--text-primary)' }}>{runnerUp}</span> in the final
      </div>

      <BobSays message={displayComment} mood="victory" />

      {/* Bracket Recap */}
      {matchupResults.length > 0 && (
        <div style={{ marginTop: '24px', width: '100%', maxWidth: '400px' }}>
          <button
            onClick={() => setShowRecap(!showRecap)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--text-muted)',
              borderRadius: '8px',
              padding: '12px 20px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Bracket Recap</span>
            <span style={{ fontSize: '12px' }}>{showRecap ? '▲' : '▼'}</span>
          </button>
          {showRecap && (
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--text-muted)',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
              padding: '16px',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {matchupResults.length} matchups  {totalVotes} total votes
              </div>

              {closestCall && closestCall.margin <= 1 && (
                <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--bg-card-hover)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '4px' }}>CLOSEST CALL</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                    {closestCall.winner} def. {closestCall.loser}
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                      ({closestCall.votesA}-{closestCall.votesB})
                    </span>
                  </div>
                </div>
              )}

              {biggestBlowout && biggestBlowout.margin >= 4 && (
                <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--bg-card-hover)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-pink)', letterSpacing: '1px', marginBottom: '4px' }}>BIGGEST BLOWOUT</div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                    {biggestBlowout.winner} crushed {biggestBlowout.loser}
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                      ({biggestBlowout.votesA}-{biggestBlowout.votesB})
                    </span>
                  </div>
                </div>
              )}

              {tieBreakers.length > 0 && (
                <div style={{ marginBottom: '12px', padding: '10px', background: 'var(--bg-card-hover)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-blue)', letterSpacing: '1px', marginBottom: '4px' }}>TIE-BREAKER{tieBreakers.length > 1 ? 'S' : ''}</div>
                  {tieBreakers.map((t, i) => (
                    <div key={i} style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                      {t.winner} survived vs {t.loser}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="large" onClick={onNewGame}>New Bracket</Button>
        <Button variant="secondary" size="large" onClick={handleShare}>
          {shareCopied ? '✓ Copied!' : shareLink ? 'Share' : 'Share'}
        </Button>
        <Button variant="ghost" size="large" onClick={() => setShowShare(true)}>More Options</Button>
        <Button variant="ghost" size="large" onClick={onViewVault}>The Vault</Button>
      </div>

      {showShare && (
        <ShareCard
          champion={champion}
          category={category}
          runnerUp={runnerUp}
          entrants={entrants}
          playerCount={playerCount}
          bobComment={displayComment}
          existingShareLink={shareLink}
          matchupResults={matchupResults}
          closestCall={closestCall}
          biggestBlowout={biggestBlowout}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  )
}
