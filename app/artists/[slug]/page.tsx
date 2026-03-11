'use client'

import { useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import NVRLogo from '@/components/NVRLogo'
import { artists, getArtist } from '@/lib/artists'

export default function ArtistPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const artist = getArtist(slug)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [slug])

  if (!artist) return notFound()

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="artist-page-nav">
        <Link href="/" className="nav-logo" style={{ opacity: 0.7 }}>
          <NVRLogo size={22} color="currentColor" />
          NothingVeryReal
        </Link>
        <ul className="artist-switcher">
          {artists.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/artists/${a.slug}`}
                className={a.slug === slug ? 'active' : ''}
                style={a.slug === slug ? { color: artist.accent } : {}}
              >
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 48px 64px',
          overflow: 'hidden',
        }}
      >
        {/* Artist-tinted ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 70% 80% at 50% 20%, ${artist.accent}18 0%, var(--bg) 75%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Ghost name */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(100px, 16vw, 200px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'transparent',
            WebkitTextStroke: `1px ${artist.accent}10`,
            whiteSpace: 'nowrap',
            top: '50%',
            left: '-10px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          {artist.name}
        </div>

        {/* Bottom vignette */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(9,9,11,0.9) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: artist.accent,
              marginBottom: '20px',
              opacity: 0,
              animation: 'fadeUp 1s 0.3s forwards',
            }}
          >
            {artist.descriptor}
          </p>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 300,
              lineHeight: 1,
              color: 'var(--text)',
              opacity: 0,
              animation: 'fadeUp 1s 0.5s forwards',
            }}
          >
            {artist.name}
          </h1>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg2)' }}>
        <div className="about-layout">
          {/* Bio */}
          <div className="reveal">
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 300,
                lineHeight: 1.4,
                color: 'var(--text)',
              }}
            >
              {artist.bio}
            </p>
          </div>

          {/* Tags + Music */}
          <div>
            <div className="artist-tags reveal" style={{ marginBottom: '48px' }}>
              {artist.tags.map((tag) => (
                <span
                  key={tag}
                  className="artist-tag"
                  style={{ borderColor: `${artist.accent}33`, color: 'var(--muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Music embed placeholder */}
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <p
                className="section-label"
                style={{ color: artist.accent, marginBottom: '24px' }}
              >
                Music
              </p>
              <div
                style={{
                  height: '100px',
                  background: 'var(--bg)',
                  border: `1px solid ${artist.accent}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: 'var(--muted)', fontSize: '9px', letterSpacing: '0.2em' }}>
                  EMBED PLAYER COMING SOON
                </p>
              </div>
            </div>

            {/* Links */}
            {artist.links.length > 0 && (
              <div className="contact-links reveal" style={{ marginTop: '48px', alignItems: 'flex-start' }}>
                {artist.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={
                      {
                        '--accent': artist.accent,
                      } as React.CSSProperties
                    }
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <Link
          href="/"
          className="contact-link"
          style={{ fontSize: '10px', letterSpacing: '0.2em' }}
        >
          ← Back to collective
        </Link>
        <span className="footer-mark">NVR</span>
      </footer>
    </>
  )
}
