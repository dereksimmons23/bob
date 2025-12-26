import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Button, Logo } from '../components/ui'
import { BobSays } from '../components/BobSays'
import { ShareCard } from '../components/ShareCard'
import { BOB } from '../data/bob'
import { SoundEffects } from '../lib/sound'
import { supabase } from '../lib/supabase'

export function ChampionScreen({ champion, category, runnerUp, categoryType, bobComment, entrants, playerCount, matchupResults = [], onNewGame, onViewVault }) {
  const [showShare, setShowShare] = useState(false)
  const [shareLink, setShareLink] = useState(null)
  const [shareCopied, setShareCopied] = useState(false)
  const [showRecap, setShowRecap] = useState(false)

  // Use passed bobComment or fall back to random
  const displayComment = bobComment || BOB.random(categoryType === 'nye' ? BOB.championNYE : BOB.champion)
  const isNYE = categoryType === 'nye'

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
