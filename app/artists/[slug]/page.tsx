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
    <div className="artist-page" data-artist={artist.slug}>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="artist-page-nav">
        <Link href="/" className="nav-logo artist-nav-logo">
          <NVRLogo size={22} color="currentColor" />
          NothingVeryReal
        </Link>
        <ul className="artist-switcher">
          {artists.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/artists/${a.slug}`}
                className={a.slug === slug ? 'active' : ''}
              >
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="artist-hero">
        {/* Artist-tinted ambient glow */}
        <div className="artist-hero-glow" />

        {/* Ghost name */}
        <div aria-hidden className="artist-hero-ghost">
          {artist.name}
        </div>

        {/* Bottom vignette */}
        <div aria-hidden className="artist-hero-vignette" />

        {/* Text content */}
        <div className="artist-hero-content">
          <p className="artist-hero-descriptor">{artist.descriptor}</p>
          <h1 className="artist-hero-title">{artist.name}</h1>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────── */}
      <section className="artist-content-section">
        <div className="about-layout">
          {/* Bio */}
          <div className="reveal">
            <p className="artist-bio">{artist.bio}</p>
          </div>

          {/* Tags + Music */}
          <div>
            <div className="artist-tags artist-tags--spaced reveal">
              {artist.tags.map((tag) => (
                <span key={tag} className="artist-tag artist-page-tag">
                  {tag}
                </span>
              ))}
            </div>

            {/* Music embed placeholder */}
            <div className="reveal reveal--delay-1">
              <p className="section-label artist-music-label">Music</p>
              <div className="artist-music-embed">
                <p className="artist-embed-placeholder">EMBED PLAYER COMING SOON</p>
              </div>
            </div>

            {/* Links */}
            {artist.links.length > 0 && (
              <div className="contact-links artist-links reveal">
                {artist.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
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
        <Link href="/" className="contact-link artist-back-link">
          ← Back to collective
        </Link>
        <span className="footer-mark">NVR</span>
      </footer>
    </div>
  )
}
