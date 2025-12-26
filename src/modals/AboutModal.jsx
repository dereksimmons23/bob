import { Button } from '../components/ui'

export function AboutModal({ onClose }) {
  const SectionTitle = ({ children }) => (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '14px',
      color: 'var(--accent-gold)',
      letterSpacing: '2px',
      marginBottom: '12px',
      marginTop: '24px',
    }}>
      {children}
    </div>
  )

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px',
      overflowY: 'auto',
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--accent-gold)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', marginBottom: '8px', letterSpacing: '4px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
            ]-[
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--accent-gold)',
            letterSpacing: '3px',
            marginBottom: '8px',
          }}>
            BATTLE O' BRACKETS
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Version 2.6
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: '18px',
          color: 'var(--text-primary)',
          lineHeight: '1.6',
          textAlign: 'center',
          fontStyle: 'italic',
          marginBottom: '8px',
        }}>
          "Build a bracket. Vote. Crown a champion."
        </div>
        <div style={{
          fontSize: '16px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: '24px',
        }}>
          Family game night just got a lot more interesting.
        </div>

        {/* How It Works */}
        <SectionTitle>HOW IT WORKS</SectionTitle>
        <div style={{
          background: 'var(--bg-deep)',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '14px',
          lineHeight: '1.8',
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: 'var(--accent-gold)' }}>1.</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>Pick a category (or make your own)</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: 'var(--accent-gold)' }}>2.</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>Add your contenders</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: 'var(--accent-gold)' }}>3.</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>Vote head-to-head until one reigns supreme</span>
          </div>
          <div>
            <span style={{ color: 'var(--accent-gold)' }}>4.</span>
            <span style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>Champions live forever in The Vault</span>
          </div>
        </div>

        {/* Who is BOB */}
        <SectionTitle>WHO IS BOB?</SectionTitle>
        <div style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          fontStyle: 'italic',
        }}>
          "I'm BOB. Battle o' Brackets. Yes, it's an acronym. I'm based on a real person - Uncle Robert Jake - who had opinions about everything and the dry wit to make them memorable. One of 11 kids. Trombone player. Early riser. I carry his spirit. Mostly the judgment."
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          lineHeight: '1.6',
          marginTop: '12px',
        }}>
          Also channeling: Bob Barker's warmth, Bob Newhart's deadpan timing, Bob Eubanks' chaos tolerance, and Bob Ross's calm in the storm.
        </div>

        {/* Origin Story */}
        <SectionTitle>THE ORIGIN STORY</SectionTitle>
        <div style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7',
          fontStyle: 'italic',
        }}>
          "I was created by Derek Claude Simmons and his AI collaborator, Anthropic's Claude. Derek's a media strategy guy from Minneapolis who thought family debates needed structure. Claude's an AI who seemed genuinely relieved to work on something fun. Together they built this. I'm the result."
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <Button variant="primary" onClick={onClose}>
            Got it. Let's battle.
          </Button>
        </div>
      </div>
    </div>
  )
}
