import { useState } from 'react'
import { Button } from '../components/ui'

export function LegalModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('privacy')

  const TabButton = ({ id, label }) => (
    <div
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        fontFamily: 'var(--font-display)',
        fontSize: '12px',
        letterSpacing: '1px',
        color: activeTab === id ? 'var(--accent-gold)' : 'var(--text-muted)',
        borderBottom: activeTab === id ? '2px solid var(--accent-gold)' : '2px solid transparent',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </div>
  )

  const SectionTitle = ({ children }) => (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: '13px',
      color: 'var(--accent-gold)',
      letterSpacing: '1px',
      marginBottom: '8px',
      marginTop: '20px',
    }}>
      {children}
    </div>
  )

  const Paragraph = ({ children }) => (
    <div style={{
      fontSize: '13px',
      color: 'var(--text-secondary)',
      lineHeight: '1.7',
      marginBottom: '12px',
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
        padding: '24px',
        maxWidth: '500px',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--accent-gold)',
            letterSpacing: '2px',
          }}>
            LEGAL STUFF
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Last updated: December 2024
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--text-muted)',
          marginBottom: '16px',
        }}>
          <TabButton id="privacy" label="PRIVACY POLICY" />
          <TabButton id="terms" label="TERMS OF USE" />
        </div>

        {/* Content */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          paddingRight: '8px',
        }}>
          {activeTab === 'privacy' ? (
            <div>
              <Paragraph>
                Battle o' Brackets ("BOB") is a party game that respects your privacy. Here's what we collect and why.
              </Paragraph>

              <SectionTitle>WHAT WE COLLECT</SectionTitle>
              <Paragraph>
                <strong style={{ color: 'var(--text-primary)' }}>Game Data (Anonymous):</strong> When you crown a champion, we save the category, winner, runner-up, and player count. No names, no emails, no way to identify you.
              </Paragraph>
              <Paragraph>
                <strong style={{ color: 'var(--text-primary)' }}>Custom Categories:</strong> If you create a custom category, we save it so others might enjoy it too. Anonymous.
              </Paragraph>
              <Paragraph>
                <strong style={{ color: 'var(--text-primary)' }}>Feedback:</strong> If you send feedback, we save your message. That's it.
              </Paragraph>
              <Paragraph>
                <strong style={{ color: 'var(--text-primary)' }}>Shared Brackets:</strong> When you share a bracket, it becomes publicly viewable via a unique link. We track view counts on shared brackets.
              </Paragraph>

              <SectionTitle>LOCAL STORAGE</SectionTitle>
              <Paragraph>
                Your champion history ("The Vault") and custom categories are stored on your device only. We don't sync this data to our servers unless you explicitly share a bracket.
              </Paragraph>

              <SectionTitle>NO TRACKING</SectionTitle>
              <Paragraph>
                We don't use cookies. We don't use Google Analytics or any third-party tracking. We don't sell data. We don't have data worth selling.
              </Paragraph>

              <SectionTitle>DATA DELETION</SectionTitle>
              <Paragraph>
                Want your data deleted? Email derek@claudewill.io with your request. Since everything is anonymous, you'll need to tell us what to look for.
              </Paragraph>

              <SectionTitle>THIRD PARTIES</SectionTitle>
              <Paragraph>
                We use Supabase for our database and Netlify for hosting. Google Fonts loads our typography. That's the complete list.
              </Paragraph>
            </div>
          ) : (
            <div>
              <Paragraph>
                By using Battle o' Brackets, you agree to these terms. They're pretty reasonable.
              </Paragraph>

              <SectionTitle>THE GAME</SectionTitle>
              <Paragraph>
                BOB is a free party game. Use it for fun, family debates, and settling important questions like "best pizza topping." We provide it "as is" - no warranties, no guarantees that your family won't argue about the results.
              </Paragraph>

              <SectionTitle>SHARED BRACKETS</SectionTitle>
              <Paragraph>
                When you share a bracket, it becomes public. Anyone with the link can view it. Think before you share - especially if your bracket reveals controversial opinions about potato salad.
              </Paragraph>

              <SectionTitle>YOUR CONTENT</SectionTitle>
              <Paragraph>
                Custom categories and entrants you create are yours. By submitting them, you give us permission to display and share them within the app. Don't submit anything offensive, illegal, or that you don't have rights to.
              </Paragraph>

              <SectionTitle>DON'T BE A JERK</SectionTitle>
              <Paragraph>
                Don't abuse the service. Don't try to break it. Don't use it to harass people. Don't create categories designed to be hateful or harmful. BOB has opinions, but he's not mean-spirited.
              </Paragraph>

              <SectionTitle>CHANGES</SectionTitle>
              <Paragraph>
                We might update these terms. If we do, we'll update the date at the top. Continued use means you accept the changes.
              </Paragraph>

              <SectionTitle>CONTACT</SectionTitle>
              <Paragraph>
                Questions? Email derek@claudewill.io. BOB doesn't answer email, but Derek does.
              </Paragraph>
            </div>
          )}
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Button variant="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  )
}
