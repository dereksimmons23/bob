import { useState, useEffect } from 'react'
import { Button } from '../components/ui'

// Font options for logo exploration
const FONT_OPTIONS = [
  { id: 'bangers', name: 'Bangers', family: "'Bangers', cursive", note: 'Current app font' },
  { id: 'bebas', name: 'Bebas Neue', family: "'Bebas Neue', sans-serif", note: 'Tall condensed' },
  { id: 'oswald', name: 'Oswald', family: "'Oswald', sans-serif", note: 'Semi-condensed' },
  { id: 'anton', name: 'Anton', family: "'Anton', sans-serif", note: 'Bold impact' },
  { id: 'monoton', name: 'Monoton', family: "'Monoton', cursive", note: 'Retro outline' },
  { id: 'righteous', name: 'Righteous', family: "'Righteous', cursive", note: 'Rounded retro' },
  { id: 'bungee', name: 'Bungee', family: "'Bungee', cursive", note: 'Chunky display' },
  { id: 'russo', name: 'Russo One', family: "'Russo One', sans-serif", note: 'Sports/athletic' },
  { id: 'black-ops', name: 'Black Ops One', family: "'Black Ops One', cursive", note: 'Military stencil' },
  { id: 'system', name: 'System UI', family: '-apple-system, BlinkMacSystemFont, sans-serif', note: 'Clean baseline' },
]

export function BrandShowcase({ onBack }) {
  const [bgMode, setBgMode] = useState('dark')
  const [selectedFont, setSelectedFont] = useState('bangers')

  // Load Google Fonts dynamically
  useEffect(() => {
    const fontFamilies = [
      'Bangers',
      'Bebas+Neue',
      'Oswald:wght@700',
      'Anton',
      'Monoton',
      'Righteous',
      'Bungee',
      'Russo+One',
      'Black+Ops+One',
    ]
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies.join('&family=')}&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  const currentFont = FONT_OPTIONS.find(f => f.id === selectedFont)
  const bg = bgMode === 'dark' ? 'var(--bg-deep)' : '#f5f5f5'
  const textColor = bgMode === 'dark' ? 'var(--text-primary)' : '#1a1a2e'
  const goldColor = 'var(--accent-gold)'

  const LogoVariant = ({ name, children, description }) => (
    <div style={{
      background: bg,
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      border: '1px solid var(--bg-card)',
    }}>
      <div style={{ marginBottom: '16px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '12px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '4px',
      }}>
        {name}
      </div>
      {description && (
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {description}
        </div>
      )}
    </div>
  )

  // Shared text styles - use selected font
  const bracketStyle = {
    fontFamily: currentFont?.family || 'var(--font-display)',
    color: goldColor,
    fontStyle: 'normal',
    fontWeight: 'bold',
  }

  const bobStyle = {
    fontFamily: currentFont?.family || 'var(--font-display)',
    color: goldColor,
    fontWeight: 'bold',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      padding: '20px',
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: goldColor,
          letterSpacing: '2px',
          marginBottom: '8px',
        }}>
          BRAND SHOWCASE
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Logo variations for Battle o' Brackets
        </div>

        {/* Background toggle */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          <Button
            size="small"
            variant={bgMode === 'dark' ? 'primary' : 'secondary'}
            onClick={() => setBgMode('dark')}
          >
            Dark
          </Button>
          <Button
            size="small"
            variant={bgMode === 'light' ? 'primary' : 'secondary'}
            onClick={() => setBgMode('light')}
          >
            Light
          </Button>
        </div>

        {/* Font selector */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '8px',
        }}>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-muted)',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            FONT: <span style={{ color: goldColor, fontWeight: 'bold' }}>{currentFont?.name}</span>
            <span style={{ marginLeft: '8px', opacity: 0.7 }}>({currentFont?.note})</span>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
          }}>
            {FONT_OPTIONS.map(font => (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font.id)}
                style={{
                  padding: '8px 12px',
                  background: selectedFont === font.id ? goldColor : 'var(--bg-deep)',
                  color: selectedFont === font.id ? '#1a1a2e' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontFamily: font.family,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                }}
              >
                {font.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section: Bracket-Only Marks */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
        marginTop: '32px',
      }}>
        BRACKET-ONLY MARKS
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <LogoVariant name="ABSTRACT" description="Current About modal">
          <span style={{ ...bracketStyle, fontSize: '48px', letterSpacing: '4px' }}>]-[</span>
        </LogoVariant>

        <LogoVariant name="MINIMAL" description="Tight spacing">
          <span style={{ ...bracketStyle, fontSize: '48px', letterSpacing: '0' }}>][</span>
        </LogoVariant>

        <LogoVariant name="EM DASH" description="Connected">
          <span style={{ ...bracketStyle, fontSize: '48px', letterSpacing: '2px' }}>]—[</span>
        </LogoVariant>

        <LogoVariant name="SPACED" description="Breathing room">
          <span style={{ ...bracketStyle, fontSize: '48px', letterSpacing: '12px' }}>] [</span>
        </LogoVariant>
      </div>

      {/* Section: BOB-Integrated */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
      }}>
        BOB-INTEGRATED
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <LogoVariant name="CLASSIC" description="Bracketed">
          <span style={{ ...bobStyle, fontSize: '36px', letterSpacing: '2px' }}>[BOB]</span>
        </LogoVariant>

        <LogoVariant name="INVERTED" description="Edgier">
          <span style={{ ...bobStyle, fontSize: '36px', letterSpacing: '2px' }}>]BOB[</span>
        </LogoVariant>

        <LogoVariant name="DASHED" description="Spaced">
          <span style={{ ...bracketStyle, fontSize: '36px' }}>]-<span style={bobStyle}>BOB</span>-[</span>
        </LogoVariant>

        <LogoVariant name="UNDERSCORED" description="Grounded">
          <span style={{ ...bracketStyle, fontSize: '36px' }}>]_<span style={bobStyle}>BOB</span>_[</span>
        </LogoVariant>
      </div>

      {/* Section: Strikethrough Experiments */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
      }}>
        STRIKETHROUGH EXPERIMENTS
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Using the B's horizontal lines to connect the brackets
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <LogoVariant name="CSS STRIKETHROUGH" description="Native text-decoration">
          <span style={{
            ...bobStyle,
            fontSize: '42px',
            letterSpacing: '4px',
            textDecoration: 'line-through',
            textDecorationColor: goldColor,
            textDecorationThickness: '3px',
          }}>
            ]BOB[
          </span>
        </LogoVariant>

        <LogoVariant name="EXTENDED STRIKE" description="Pseudo-element line">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ ...bobStyle, fontSize: '42px', letterSpacing: '4px' }}>]BOB[</span>
            <div style={{
              position: 'absolute',
              left: '-10px',
              right: '-10px',
              top: '50%',
              height: '4px',
              background: goldColor,
              transform: 'translateY(-50%)',
              zIndex: 0,
            }} />
          </div>
        </LogoVariant>

        <LogoVariant name="B-LINE CONNECTOR" description="Through the B's middle">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ ...bobStyle, fontSize: '42px', letterSpacing: '2px', position: 'relative', zIndex: 1 }}>
              <span style={{ ...bracketStyle, fontSize: '42px' }}>]</span>
              BOB
              <span style={{ ...bracketStyle, fontSize: '42px' }}>[</span>
            </span>
            <div style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '48%',
              height: '3px',
              background: goldColor,
              transform: 'translateY(-50%)',
              zIndex: 0,
            }} />
          </div>
        </LogoVariant>

        <LogoVariant name="DOUBLE LINE" description="Like an equals sign">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ ...bobStyle, fontSize: '42px', letterSpacing: '4px', position: 'relative', zIndex: 1 }}>]BOB[</span>
            <div style={{
              position: 'absolute',
              left: '-8px',
              right: '-8px',
              top: '40%',
              height: '3px',
              background: goldColor,
            }} />
            <div style={{
              position: 'absolute',
              left: '-8px',
              right: '-8px',
              top: '60%',
              height: '3px',
              background: goldColor,
            }} />
          </div>
        </LogoVariant>
      </div>

      {/* Section: Backwards B Experiments */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
      }}>
        BACKWARDS B EXPERIMENTS
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
        Using mirrored B's to form bracket shapes
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {/* Mirrored B helper */}
        {(() => {
          const MirroredB = ({ size = 42, style = {} }) => (
            <span style={{
              display: 'inline-block',
              transform: 'scaleX(-1)',
              ...bobStyle,
              fontSize: size,
              ...style,
            }}>B</span>
          )

          return (
            <>
              <LogoVariant name="ᗺOB" description="Backwards B + OB">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '2px' }}>
                  <MirroredB />
                  <span>OB</span>
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺOᗷ" description="Both B's mirrored">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '2px' }}>
                  <MirroredB />
                  <span>O</span>
                  <MirroredB />
                </div>
              </LogoVariant>

              <LogoVariant name="BOᗷ" description="Last B mirrored">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '2px' }}>
                  <span>BO</span>
                  <MirroredB />
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺ O B" description="Spaced out">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '12px' }}>
                  <MirroredB />
                  <span>O</span>
                  <span>B</span>
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺ[O]B" description="Bracketed O">
                <div style={{ ...bobStyle, fontSize: '36px' }}>
                  <MirroredB size={36} />
                  <span style={{ ...bracketStyle, fontSize: '36px', margin: '0 -2px' }}>[</span>
                  <span>O</span>
                  <span style={{ ...bracketStyle, fontSize: '36px', margin: '0 -2px' }}>]</span>
                  <span>B</span>
                </div>
              </LogoVariant>

              <LogoVariant name="|ᗺOB|" description="B's as bracket edges">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '0' }}>
                  <span style={{ opacity: 0.4 }}>|</span>
                  <MirroredB />
                  <span>O</span>
                  <span>B</span>
                  <span style={{ opacity: 0.4 }}>|</span>
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺ—O—B" description="Connected with dashes">
                <div style={{ ...bobStyle, fontSize: '36px' }}>
                  <MirroredB size={36} />
                  <span style={{ margin: '0 2px', opacity: 0.5 }}>—</span>
                  <span>O</span>
                  <span style={{ margin: '0 2px', opacity: 0.5 }}>—</span>
                  <span>B</span>
                </div>
              </LogoVariant>

              <LogoVariant name="TIGHT ᗺOB" description="Negative letter-spacing">
                <div style={{ ...bobStyle, fontSize: '48px', letterSpacing: '-4px' }}>
                  <MirroredB size={48} />
                  <span>OB</span>
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺ●B" description="Dot for O">
                <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '4px' }}>
                  <MirroredB />
                  <span style={{ fontSize: '24px', verticalAlign: 'middle' }}>●</span>
                  <span>B</span>
                </div>
              </LogoVariant>

              <LogoVariant name="STACKED ᗺOB" description="Vertical arrangement">
                <div style={{ textAlign: 'center', lineHeight: '0.85' }}>
                  <div style={{ ...bobStyle, fontSize: '32px' }}><MirroredB size={32} /></div>
                  <div style={{ ...bobStyle, fontSize: '32px' }}>O</div>
                  <div style={{ ...bobStyle, fontSize: '32px' }}>B</div>
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺOB UNDERLINE" description="With ground line">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '2px' }}>
                    <MirroredB />
                    <span>OB</span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '-4px',
                    right: '-4px',
                    height: '4px',
                    background: goldColor,
                  }} />
                </div>
              </LogoVariant>

              <LogoVariant name="ᗺ=O=B" description="Double-line connector">
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ ...bobStyle, fontSize: '42px', letterSpacing: '8px', position: 'relative', zIndex: 1 }}>
                    <MirroredB />
                    <span>O</span>
                    <span>B</span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: '35%',
                    height: '3px',
                    background: goldColor,
                    zIndex: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    right: '0',
                    top: '55%',
                    height: '3px',
                    background: goldColor,
                    zIndex: 0,
                  }} />
                </div>
              </LogoVariant>
            </>
          )
        })()}
      </div>

      {/* Section: Stacked */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
      }}>
        STACKED LAYOUTS
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <LogoVariant name="ICON + NAME" description="Current pattern">
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...bracketStyle, fontSize: '36px', letterSpacing: '4px', marginBottom: '4px' }}>]-[</div>
            <div style={{ ...bobStyle, fontSize: '18px', letterSpacing: '3px' }}>BOB</div>
          </div>
        </LogoVariant>

        <LogoVariant name="COMPACT STACK" description="Tighter">
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...bracketStyle, fontSize: '28px', letterSpacing: '2px' }}>]-[</div>
            <div style={{ ...bobStyle, fontSize: '24px', letterSpacing: '6px', marginTop: '-4px' }}>BOB</div>
          </div>
        </LogoVariant>

        <LogoVariant name="FULL NAME STACK" description="Battle o' Brackets">
          <div style={{ textAlign: 'center' }}>
            <div style={{ ...bracketStyle, fontSize: '32px', letterSpacing: '4px', marginBottom: '8px' }}>]-[</div>
            <div style={{ ...bobStyle, fontSize: '12px', letterSpacing: '2px' }}>BATTLE O' BRACKETS</div>
          </div>
        </LogoVariant>

        <LogoVariant name="INLINE FULL" description="Horizontal">
          <div style={{ textAlign: 'center' }}>
            <span style={{ ...bracketStyle, fontSize: '24px' }}>]</span>
            <span style={{ ...bobStyle, fontSize: '14px', letterSpacing: '1px', margin: '0 8px' }}>BATTLE O' BRACKETS</span>
            <span style={{ ...bracketStyle, fontSize: '24px' }}>[</span>
          </div>
        </LogoVariant>
      </div>

      {/* Section: Size Scale */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '14px',
        color: goldColor,
        letterSpacing: '1px',
        marginBottom: '16px',
      }}>
        SIZE SCALE
      </div>
      <div style={{
        background: bg,
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '24px',
        marginBottom: '32px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bracketStyle, fontSize: '64px', letterSpacing: '6px' }}>]-[</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>64px / Hero</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bracketStyle, fontSize: '48px', letterSpacing: '4px' }}>]-[</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>48px / Large</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bracketStyle, fontSize: '32px', letterSpacing: '3px' }}>]-[</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>32px / Medium</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bracketStyle, fontSize: '24px', letterSpacing: '2px' }}>]-[</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>24px / Small</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ ...bracketStyle, fontSize: '16px', letterSpacing: '1px' }}>]-[</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>16px / Icon</div>
        </div>
      </div>

      {/* Back button */}
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <Button variant="secondary" onClick={onBack}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
