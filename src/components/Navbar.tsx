import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About Us',     href: '#whyus' },
  { label: 'Services',     href: '#services' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact Us',   href: '#contact' },
] as const

const SPRING = { stiffness: 400, damping: 40, mass: 0.5, restDelta: 0.001, restSpeed: 0.001 }

const DESKTOP_TALL = 210
const DESKTOP_SLIM = 72
const LOGO_BIG     = 190
const LOGO_SMALL   = 48

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('home')
  const [isDesktop, setIsDesktop] = useState(false)

  const { scrollY } = useScroll()

  // Scroll-linked raw values
  const rawHeight = useTransform(scrollY, [0, 200], [DESKTOP_TALL, DESKTOP_SLIM])
  const rawLogo   = useTransform(scrollY, [0, 200], [LOGO_BIG,     LOGO_SMALL])
  const rawShadow = useTransform(scrollY, [0, 100], [0, 1])

  // Physics spring — smooth, no bounce
  const navHeight = useSpring(rawHeight, SPRING)
  const logoSize  = useSpring(rawLogo,   SPRING)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      setMenuOpen(false)
      const el = document.getElementById(href.replace('#', ''))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    []
  )

  return (
    <>
      {/* Fixed navbar */}
      <motion.nav
        className="nav-root"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
      >
        <motion.div
          className="nav-inner"
          style={isDesktop ? { height: navHeight } : { height: 72 }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={handleNavClick('#home')}
            className="nav-logo"
            aria-label="Flair Drywall Ltd — Home"
          >
            <motion.img
              src="/Logo-removebg-preview.png"
              alt="Flair Drywall Ltd logo"
              className="nav-logo-img"
              style={isDesktop ? { width: logoSize, height: logoSize } : { width: 56, height: 56 }}
              width={LOGO_BIG}
              height={LOGO_BIG}
              loading="eager"
              fetchPriority="high"
            />
          </a>

          {/* Desktop links */}
          <ul className="nav-links" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href.replace('#', '')
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={handleNavClick(href)}
                    className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="nav-actions">
            <a href="#contact" onClick={handleNavClick('#contact')} className="nav-cta">
              Get Free Quote
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.15 }}><X    size={22} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Scroll-driven shadow overlay */}
        <motion.div className="nav-shadow" style={{ opacity: rawShadow }} aria-hidden />

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              className="nav-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul role="list" className="nav-mobile-list">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={href}
                      onClick={handleNavClick(href)}
                      className={`nav-mobile-link${active === href.replace('#', '') ? ' active' : ''}`}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="nav-mobile-cta">
                <a href="#contact" onClick={handleNavClick('#contact')} className="nav-cta" style={{ width: '100%', justifyContent: 'center' }}>
                  Get Free Quote
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      {/* Spacer — pushes page content below the fixed navbar */}
      <div style={{ height: isDesktop ? DESKTOP_TALL : 72 }} aria-hidden />

      <style>{`
        /* ── Fixed navbar sits above everything ── */
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 300;
          background: #fff;
          border-bottom: 1px solid #E8EEF6;
          will-change: transform;
        }

        /* Shadow fades in via MotionValue opacity — no CSS transition needed */
        .nav-shadow {
          position: absolute;
          inset: 0;
          box-shadow: 0 4px 24px rgba(30,58,95,0.12);
          pointer-events: none;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-inline: clamp(1rem, 5vw, 2rem);
          max-width: 1280px;
          margin-inline: auto;
          will-change: height;
        }


        /* ── Logo ── */
        .nav-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .nav-logo-img {
          object-fit: contain;
          flex-shrink: 0;
          display: block;
          will-change: width, height;
        }
        .nav-logo:hover .nav-logo-img { opacity: 0.88; }

        /* ── Desktop links ── */
        .nav-links {
          display: none;
          align-items: center;
          gap: 0.15rem;
          margin-left: auto;
          list-style: none;
          padding: 0;
          margin-top: 0;
          margin-bottom: 0;
        }
        @media (min-width: 1024px) { .nav-links { display: flex; } }

        .nav-link {
          padding: 0.45rem 0.8rem;
          font-size: 1.125rem;
          font-weight: 500;
          color: #4A6080;
          border-radius: 9999px;
          transition: color 0.15s ease;
          position: relative;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 55%; height: 2px;
          background: #0EA5E9;
          border-radius: 2px;
          transition: transform 0.2s ease;
        }
        .nav-link:hover { color: #1E3A5F; }
        .nav-link:hover::after,
        .nav-link--active::after { transform: translateX(-50%) scaleX(1); }
        .nav-link--active { color: #1E3A5F; font-weight: 600; }

        /* ── Actions ── */
        .nav-actions {
          display: none;
          align-items: center;
          flex-shrink: 0;
        }
        @media (min-width: 1024px) { .nav-actions { display: flex; } }

        /* ── CTA ── */
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.65rem 1.2rem;
          min-height: 44px;
          background: #0EA5E9;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
          letter-spacing: 0.015em;
          transition: background 0.15s ease, transform 0.2s ease, box-shadow 0.15s ease;
          box-shadow: 0 2px 12px rgba(14,165,233,0.35);
          white-space: nowrap;
        }
        .nav-cta:hover {
          background: #0284C7;
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(14,165,233,0.45);
        }

        /* ── Hamburger ── */
        .nav-hamburger {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px; height: 44px;
          border-radius: 8px;
          color: #1E3A5F;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s ease;
          flex-shrink: 0;
        }
        @media (min-width: 1024px) { .nav-hamburger { display: none; } }
        .nav-hamburger:hover { background: #F0F6FF; }

        /* ── Mobile drawer ── */
        .nav-mobile {
          background: #fff;
          border-top: 1px solid #E8EEF6;
          overflow: hidden;
        }
        .nav-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          padding: 0.6rem clamp(1rem,5vw,2rem) 0;
          list-style: none;
          margin: 0;
        }
        .nav-mobile-link {
          display: block;
          padding: 0.9rem 1rem;
          min-height: 44px;
          font-size: 1rem;
          font-weight: 500;
          color: #4A6080;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .nav-mobile-link:hover,
        .nav-mobile-link.active { background: #F0F6FF; color: #1E3A5F; }
        .nav-mobile-cta {
          padding: 1rem clamp(1rem,5vw,2rem);
          display: flex;
        }
      `}</style>
    </>
  )
}
