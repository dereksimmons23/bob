import { useState, useEffect, useRef } from 'react'
import { Button } from './ui'
import { supabase } from '../lib/supabase'

export function ShareCard({ champion, category, runnerUp, entrants, playerCount, bobComment, existingShareLink, matchupResults = [], closestCall, biggestBlowout, onClose }) {
  const canvasRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [shareLink, setShareLink] = useState(existingShareLink || null)
  const [isGeneratingLink, setIsGeneratingLink] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#0a0e1a'
    ctx.fillRect(0, 0, 600, 400)

    // Gold gradient header
    const gradient = ctx.createLinearGradient(0, 0, 600, 0)
    gradient.addColorStop(0, '#ffd700')
    gradient.addColorStop(0.5, '#ffed4a')
    gradient.addColorStop(1, '#ffd700')

    // Title
    ctx.font = 'bold 36px Bangers, sans-serif'
    ctx.fillStyle = gradient
    ctx.textAlign = 'center'
    ctx.fillText("BATTLE o' BRACKETS", 300, 60)

    // Trophy
    ctx.font = '80px serif'
    ctx.fillText('🏆', 300, 160)

    // Category
    ctx.font = '18px Outfit, sans-serif'
    ctx.fillStyle = '#8892b0'
    ctx.fillText(category.toUpperCase(), 300, 210)

    // Champion
    ctx.font = 'bold 42px Bangers, sans-serif'
    ctx.fillStyle = '#ffd700'
    ctx.fillText(champion.toUpperCase(), 300, 270)

    // Runner up
    ctx.font = '16px Outfit, sans-serif'
    ctx.fillStyle = '#8892b0'
    ctx.fillText(`defeated ${runnerUp}`, 300, 310)

    // Footer
    ctx.font = '14px Outfit, sans-serif'
    ctx.fillStyle = '#4a5578'
    ctx.fillText('bob.claudewill.io', 300, 370)

    setImageUrl(canvas.toDataURL('image/png'))
  }, [champion, category, runnerUp])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = `bracket-champion-${category.replace(/\s+/g, '-').toLowerCase()}.png`
    link.href = imageUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyText = () => {
    let text = `🏆 ${champion.toUpperCase()}\nCrowned champion of "${category}" in Battle o' Brackets!\n\ndefeated ${runnerUp} in the final`

    // Add dramatic moments if available
    const drama = []
    if (closestCall && closestCall.margin <= 1) {
      drama.push(`🔥 Closest call: ${closestCall.winner} def. ${closestCall.loser} (${closestCall.votesA}-${closestCall.votesB})`)
    }
    if (biggestBlowout && biggestBlowout.margin >= 4) {
      drama.push(`💀 Biggest blowout: ${biggestBlowout.winner} crushed ${biggestBlowout.loser} (${biggestBlowout.votesA}-${biggestBlowout.votesB})`)
    }
    if (drama.length > 0) {
      text += `\n\n${drama.join('\n')}`
    }

    text += `\n\n${shareLink || 'bob.claudewill.io'}\n\n#BattleOBrackets`
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const handleGetLink = async () => {
    if (shareLink) {
      // Already have a link, just copy it
      await navigator.clipboard.writeText(shareLink)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
      return
    }

    setIsGeneratingLink(true)
    try {
      const { data, error } = await supabase
        .from('shared_brackets')
        .insert({
          category,
          champion,
          runner_up: runnerUp,
          entrants: entrants || [],
          player_count: playerCount || 1,
          bob_comment: bobComment || '',
        })
        .select('id')
        .single()

      if (error) throw error

      const link = `${window.location.origin}/b/${data.id}`
      setShareLink(link)
      await navigator.clipboard.writeText(link)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error('Error creating share link:', err)
      alert('Failed to create share link. Please try again.')
    } finally {
      setIsGeneratingLink(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '650px',
        width: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--accent-gold)',
          textAlign: 'center',
          marginBottom: '24px',
          letterSpacing: '2px',
        }}>
          SHARE YOUR CHAMPION
        </div>

        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        />

        {shareLink && (
          <div style={{
            background: 'var(--bg-deep)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--accent-gold)',
            wordBreak: 'break-all',
          }}>
            {shareLink}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            onClick={handleGetLink}
            disabled={isGeneratingLink}
          >
            {isGeneratingLink ? 'Creating...' : linkCopied ? '✓ Link Copied!' : shareLink ? 'Copy Link' : 'Get Shareable Link'}
          </Button>
          <Button variant="secondary" onClick={handleDownload}>Download Image</Button>
          <Button variant="ghost" onClick={handleCopyText}>Copy Text</Button>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
