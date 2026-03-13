'use client'

import Link from 'next/link'
import NVRLogo from '@/components/NVRLogo'
import { artists } from '@/lib/artists'
import { useState } from 'react'

const BG_WORDS = [
  { text: 'nothing very real', x: 8,   y: 12, size: 3.8, opacity: 0.035, duration: 34, delay: 0,   rotate: -6  },
  { text: 'nothing',           x: 62,  y: 7,  size: 6.5, opacity: 0.028, duration: 44, delay: -18, rotate: 3   },
  { text: 'very real',         x: 30,  y: 55, size: 5.2, opacity: 0.03,  duration: 28, delay: -8,  rotate: -2  },
  { text: 'nothing very real', x: 50,  y: 80, size: 2.8, opacity: 0.04,  duration: 39, delay: -32, rotate: 8   },
  { text: 'real',              x: 80,  y: 35, size: 8,   opacity: 0.022, duration: 48, delay: -45, rotate: -12 },
  { text: 'nothing',           x: 15,  y: 70, size: 4.2, opacity: 0.03,  duration: 32, delay: -22, rotate: 5   },
  { text: 'very',              x: 72,  y: 60, size: 5.8, opacity: 0.025, duration: 37, delay: -14, rotate: -4  },
  { text: 'nothing very real', x: -5,  y: 40, size: 2.2, opacity: 0.045, duration: 24, delay: -7,  rotate: 90  },
  { text: 'NVR',               x: 45,  y: 25, size: 10,  opacity: 0.018, duration: 52, delay: -55, rotate: 0   },
  { text: 'nothing very real', x: 88,  y: 88, size: 1.8, opacity: 0.05,  duration: 27, delay: -28, rotate: 15  },
  { text: 'very',              x: 5,   y: 90, size: 3.2, opacity: 0.032, duration: 42, delay: -40, rotate: -8  },
  { text: 'real',              x: 55,  y: 45, size: 4.5, opacity: 0.027, duration: 35, delay: -19, rotate: 6   },
]

type Panel = 'artists' | 'about' | 'contact' | null

export default function Home() {
  const [activePanel, setActivePanel] = useState<Panel>(null)

  const toggle = (panel: Panel) =>
    setActivePanel((prev) => (prev === panel ? null : panel))

  return (
    <div className="page-shell">
      {/* ── ANIMATED BACKGROUND ─────────────────────────────── */}
      <div className="bg-layer" aria-hidden="true">
        {BG_WORDS.map((w, i) => (
          <span
            key={i}
            className="bg-word"
            style={{
              '--x': `${w.x}%`,
              '--y': `${w.y}%`,
              '--size': `${w.size}vw`,
              '--opacity': w.opacity,
              '--duration': `${w.duration}s`,
              '--delay': `${w.delay}s`,
              '--rotate': `${w.rotate}deg`,
            } as React.CSSProperties}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* ── TOP-LEFT LOGO ───────────────────────────────────── */}
      <Link href="/" className="home-logo" aria-label="NothingVeryReal home">
        <NVRLogo size={50} color="currentColor" />
      </Link>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="main-nav">
        <button type="button" className={`nav-btn${activePanel === 'artists' ? ' nav-btn--active' : ''}`} onClick={() => toggle('artists')}>
          Artists
        </button>
        <button type="button" className={`nav-btn${activePanel === 'about' ? ' nav-btn--active' : ''}`} onClick={() => toggle('about')}>
          About
        </button>
        <button type="button" className={`nav-btn${activePanel === 'contact' ? ' nav-btn--active' : ''}`} onClick={() => toggle('contact')}>
          Contact
        </button>
      </nav>

      {/* ── CENTRE TAGLINE ──────────────────────────────────── */}
      <div className="centre-tagline">
        <p className="tagline-eyebrow">A music collective</p>
        <h1 className="tagline-title">
          Nothing<br /><em>Very</em><br />Real
        </h1>
      </div>
      
      {/* ── VERTICAL LABEL ──────────────────────────────────── */}
      <div className="vertical-label">Music Collective — Est. 2017</div>

      {/* ── BACKDROP ────────────────────────────────────────── */}
      {activePanel && (
        <div className="overlay-backdrop" onClick={() => setActivePanel(null)} />
      )}

      {/* ── OVERLAY PANEL ───────────────────────────────────── */}
      <div className={`overlay-panel${activePanel ? ' overlay-panel--open' : ''}`}>
        {activePanel === 'artists' && (
          <div className="panel-content">
            <p className="panel-label">Artists</p>
            <div className="artists-grid">
              {artists.map((artist, i) => (
                <Link
                  key={artist.slug}
                  href={`/artists/${artist.slug}`}
                  className="artist-card"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div className="artist-index">0{i + 1}</div>
                  <div className="artist-name">{artist.name}</div>
                  {artist.alias && (
                    <div className="artist-alias">also {artist.alias}</div>
                  )}
                  <div className="artist-tags">
                    {artist.tags.map((tag) => (
                      <span key={tag} className="artist-tag">{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activePanel === 'about' && (
          <div className="panel-content">
            <p className="panel-label">About</p>
            <div className="about-layout">
              <p className="about-statement">
                Sound that<br />doesn&apos;t claim<br />to be <em>anything<br />more</em> than<br />itself.
              </p>
              <div>
                <p className="about-text">
                  NothingVeryReal is a music collective grounded in the belief that distinct voices
                  don&apos;t require a unified style — only a shared honesty about the act of making.
                  Five artists, one frequency, one recurring question: what are we actually
                  listening to?
                </p>
                <p className="about-text about-text--second">
                  The name is not nihilism. It&apos;s a gentle pressure on the idea that music, like
                  any perception, is provisional — shaped by context, resonance, and the particular
                  moment you encounter it. We&apos;re okay with that.
                </p>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'contact' && (
          <div className="panel-content">
            <p className="panel-label">Contact</p>
            <div className="contact-row">
              <h2 className="contact-heading">
                Get in<br />touch.
              </h2>
              <div className="contact-links">
                <a href="#" className="contact-link">Instagram</a>
                <a href="#" className="contact-link">SoundCloud</a>
                <a href="#" className="contact-link">Bandcamp</a>
                <a href="mailto:hello@nothingveryreal.com" className="contact-link">
                  hello@nothingveryreal.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
