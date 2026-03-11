'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import NVRLogo from '@/components/NVRLogo'
import { artists } from '@/lib/artists'

export default function Home() {
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
  }, [])

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="site-nav">
        <Link href="/" className="nav-logo">
          <NVRLogo size={22} color="currentColor" />
          NothingVeryReal
        </Link>
        <ul className="nav-links">
          <li><a href="#artists">Artists</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ── VERTICAL LABEL ──────────────────────────────────── */}
      <div className="vertical-label">Music Collective — Est. ongoing</div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
        <div className="hero-ghost">NVR</div>

        <div className="hero-content">
          <p className="hero-eyebrow">A music collective</p>
          <h1 className="hero-title">
            Nothing<br /><em>Very</em><br />Real
          </h1>
          <p className="hero-sub">
            Five artists, one frequency. A shared understanding that sound is the closest
            thing to evidence that anything exists at all.
          </p>
        </div>

        <div className="hero-scroll">scroll</div>
      </section>

      {/* ── ARTISTS ─────────────────────────────────────────── */}
      <section id="artists">
        <p className="section-label reveal">Artists</p>

        <div className="artists-grid">
          {artists.map((artist, i) => (
            <Link
              key={artist.slug}
              href={`/artists/${artist.slug}`}
              className="artist-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
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
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section id="about">
        <p className="section-label reveal">About</p>

        <div className="about-layout">
          <div className="about-left reveal">
            <p className="about-statement">
              Sound that<br />doesn't claim<br />to be <em>anything<br />more</em> than<br />itself.
            </p>
          </div>
          <div className="about-right">
            <p className="about-text reveal">
              NothingVeryReal is a music collective grounded in the belief that distinct voices
              don't require a unified style — only a shared honesty about the act of making.
              Five artists, one frequency, one recurring question: what are we actually
              listening to?
            </p>
            <p className="about-text reveal" style={{ transitionDelay: '0.2s' }}>
              The name is not nihilism. It's a gentle pressure on the idea that music, like
              any perception, is provisional — shaped by context, resonance, and the particular
              moment you encounter it. We're okay with that.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────── */}
      <section id="contact">
        <p className="section-label reveal">Contact</p>

        <div className="contact-row">
          <h2 className="contact-heading reveal">
            Get in<br />touch.
          </h2>
          <div className="contact-links reveal">
            <a href="#" className="contact-link">Instagram</a>
            <a href="#" className="contact-link">SoundCloud</a>
            <a href="#" className="contact-link">Bandcamp</a>
            <a href="mailto:hello@nothingveryreal.com" className="contact-link">
              hello@nothingveryreal.com
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer>
        <span className="footer-copy">© NothingVeryReal. All sounds provisional.</span>
        <span className="footer-mark">NVR</span>
      </footer>
    </>
  )
}
