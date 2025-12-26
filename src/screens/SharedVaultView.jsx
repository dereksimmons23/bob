import { useState, useEffect } from 'react'
import { Button, Logo } from '../components/ui'
import { BobSays } from '../components/BobSays'
import { supabase } from '../lib/supabase'

export function SharedVaultView({ vaultId }) {
  const [vault, setVault] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('shared_vaults')
          .select('*')
          .eq('id', vaultId)
          .single()

        if (fetchError) throw fetchError
        if (!data) throw new Error('Vault not found')

        setVault(data)

        // Increment view count
        await supabase
          .from('shared_vaults')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', vaultId)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVault()
  }, [vaultId])

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
          <div style={{ color: 'var(--text-secondary)' }}>Loading vault...</div>
        </div>
      </div>
    )
  }

  if (error || !vault) {
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
          VAULT NOT FOUND
        </div>
        <BobSays message="This vault has been sealed forever. Or maybe it never existed. Either way, tragic." mood="normal" />
        <Button variant="primary" size="large" onClick={handlePlayOwn} style={{ marginTop: '24px' }}>
          Create Your Own Bracket
        </Button>
      </div>
    )
  }

  const champions = vault.champions || []

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-deep)',
      padding: '24px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Logo size="small" onClick={handlePlayOwn} />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--accent-gold)',
          letterSpacing: '3px',
          marginTop: '16px',
          marginBottom: '8px',
        }}>
          THE VAULT
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
          {champions.length} champion{champions.length !== 1 ? 's' : ''} crowned
        </div>
        {vault.view_count > 0 && (
          <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
            {vault.view_count} view{vault.view_count !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Champions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}>
        {champions.map((entry, index) => (
          <div
            key={index}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--accent-gold)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              color: 'var(--text-muted)',
              letterSpacing: '2px',
              marginBottom: '8px',
            }}>
              {entry.category?.toUpperCase() || 'CATEGORY'}
            </div>

            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>

            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              color: 'var(--accent-gold)',
              letterSpacing: '1px',
              marginBottom: '8px',
              lineHeight: '1.2',
            }}>
              {entry.champion?.toUpperCase() || 'CHAMPION'}
            </div>

            {entry.runnerUp && (
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
              }}>
                defeated <span style={{ color: 'var(--text-primary)' }}>{entry.runnerUp}</span>
              </div>
            )}

            {entry.bobComment && (
              <div style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                padding: '8px',
                background: 'var(--bg-deep)',
                borderRadius: '8px',
                marginBottom: '8px',
              }}>
                "{entry.bobComment}"
              </div>
            )}

            {entry.date && (
              <div style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}>
                {entry.date}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: '32px',
        padding: '20px',
        background: 'var(--bg-card)',
        borderRadius: '16px',
        maxWidth: '400px',
        margin: '32px auto 0',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          color: 'var(--accent-gold)',
          marginBottom: '12px',
          letterSpacing: '2px',
        }}>
          BUILD YOUR OWN VAULT
        </div>
        <Button variant="primary" size="large" onClick={handlePlayOwn}>
          Start a Bracket
        </Button>
      </div>

      <div style={{
        marginTop: '24px',
        color: 'var(--text-muted)',
        fontSize: '12px',
        textAlign: 'center',
      }}>
        Shared via Battle o' Brackets  Hosted by BOB
      </div>
    </div>
  )
}
