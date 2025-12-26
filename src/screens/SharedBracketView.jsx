import { useState, useEffect } from 'react'
import { Button, Logo } from '../components/ui'
import { BobSays } from '../components/BobSays'
import { supabase } from '../lib/supabase'

export function SharedBracketView({ bracketId }) {
  const [bracket, setBracket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBracket = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('shared_brackets')
          .select('*')
          .eq('id', bracketId)
          .single()

        if (fetchError) throw fetchError
        if (!data) throw new Error('Bracket not found')

        setBracket(data)

        // Increment view count
        await supabase
          .from('shared_brackets')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', bracketId)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBracket()
  }, [bracketId])

  const handlePlayOwn = () => {
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
          <div style={{ color: 'var(--text-secondary)' }}>Loading bracket...</div>
        </div>
      </div>
    )
  }

  if (error || !bracket) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        padding: '24px',
        textAlign: 'center',
      }}>
        <Logo size="medium" />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: 'var(--accent-red)',
          marginBottom: '16px',
          letterSpacing: '2px',
        }}>
          BRACKET NOT FOUND
        </div>
        <BobSays message="This bracket has vanished into the void. Like tears in rain. Very dramatic." mood="normal" />
        <Button variant="primary" size="large" onClick={handlePlayOwn} style={{ marginTop: '24px' }}>
          Create Your Own Bracket
        </Button>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-deep)',
      padding: '24px',
      textAlign: 'center',
    }}>
      <Logo size="small" onClick={handlePlayOwn} />

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '20px',
        color: 'var(--text-secondary)',
        letterSpacing: '4px',
        marginBottom: '16px',
        marginTop: '24px',
      }}>
        {bracket.category.toUpperCase()}
      </div>

      <div style={{ fontSize: '80px', marginBottom: '16px' }}>🏆</div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '48px',
        background: 'linear-gradient(135deg, var(--accent-gold) 0%, #ffed4a 50%, var(--accent-gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '3px',
        marginBottom: '16px',
      }}>
        {bracket.champion.toUpperCase()}
      </div>

      <div style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '24px' }}>
        defeated <span style={{ color: 'var(--text-primary)' }}>{bracket.runner_up}</span> in the final
      </div>

      {bracket.bob_comment && (
        <BobSays message={bracket.bob_comment} mood="normal" />
      )}

      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px',
        color: 'var(--text-muted)',
        fontSize: '14px',
      }}>
        <span>{bracket.player_count || 1} voter{(bracket.player_count || 1) !== 1 ? 's' : ''}</span>
        <span></span>
        <span>{bracket.entrants?.length || 0} entrants</span>
        {bracket.view_count > 0 && (
          <>
            <span></span>
            <span>{bracket.view_count} view{bracket.view_count !== 1 ? 's' : ''}</span>
          </>
        )}
      </div>

      <div style={{
        marginTop: '32px',
        padding: '20px',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          color: 'var(--accent-gold)',
          marginBottom: '12px',
          letterSpacing: '2px',
        }}>
          THINK YOU CAN DO BETTER?
        </div>
        <Button variant="primary" size="large" onClick={handlePlayOwn}>
          Create Your Own Bracket
        </Button>
      </div>

      <div style={{
        marginTop: '24px',
        color: 'var(--text-muted)',
        fontSize: '12px',
      }}>
        Shared via Battle o' Brackets  Hosted by BOB
      </div>
    </div>
  )
}
