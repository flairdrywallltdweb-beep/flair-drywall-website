import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Why Us',   href: '#whyus' },
  { label: 'Process',  href: '#process' },
  { label: 'Contact',  href: '#contact' },
] as const

// Spring config — snappy but smooth, zero bounce
const SPRING = { stiffness: 300, damping: 38, mass: 0.8 }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('home')

  const { scrollY } = useScroll()

  // Continuous scroll-linked MotionValues — no binary state toggle for dimensions
  const rawHeight = useTransform(scrollY, [0, 120], [210, 72])
  const rawLogo   = useTransform(scrollY, [0, 120], [200, 52])

  // Spring-smooth the MotionValues — GPU-composited, zero layout reflow
  const navHeight  = useSpring(rawHeight, SPRING)
  const logoSize   = useSpring(rawLogo,   SPRING)

  // Keep scrolled state only for box-shadow (cheap CSS change)
  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 80))
  }, [scrollY])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Track active section via IntersectionObserver
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
    <motion.nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Main navigation"
    >
      {/* motion.div receives the spring MotionValue — no CSS transition needed */}
      <motion.div className="navbar__inner" style={{ height: navHeight }}>

        {/* ── Logo ── */}
        <a href="#home" onClick={handleNavClick('#home')} className="navbar__logo" aria-label="Flair Drywall Ltd — Home">
          <motion.img
            src="/Logo-removebg-preview.png"
            alt="Flair Drywall Ltd logo"
            className="navbar__logo-img"
            style={{ width: logoSize, height: logoSize }}
            width={200}
            height={200}
            loading="eager"
            fetchPriority="high"
          />
        </a>

        {/* ── Desktop links ── */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href.replace('#', '')
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={handleNavClick(href)}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* ── Desktop actions ── */}
        <div className="navbar__actions">
          <a
            href="#contact"
            onClick={handleNavClick('#contact')}
            className="navbar__cta-btn"
          >
            Get Free Quote
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen
              ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.18 }}><X    size={22} /></motion.span>
              : <motion.span key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.span>
            }
          </AnimatePresence>
        </button>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul role="list">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055 }}
                >
                  <a
                    href={href}
                    onClick={handleNavClick(href)}
                    className={`navbar__mobile-link${active === href.replace('#', '') ? ' active' : ''}`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="navbar__mobile-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
            >
              <a href="#contact" onClick={handleNavClick('#contact')} className="navbar__cta-btn" style={{ justifyContent: 'center', width: '100%' }}>
                Get Free Quote
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: var(--z-nav);
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #E8EEF6;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .navbar--scrolled {
          box-shadow: 0 2px 20px rgba(30,58,95,0.10);
          border-bottom-color: #DBEAFE;
        }

        /* ─── Inner layout — height driven by MotionValue, no CSS transition ── */
        .navbar__inner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-inline: clamp(1rem, 5vw, 2rem);
          max-width: var(--container-max);
          margin-inline: auto;
          overflow: hidden;
        }
        /* Mobile: fixed height, no spring animation */
        @media (max-width: 1023px) { .navbar__inner { height: 80px !important; } }

        /* ─── Logo — size driven by MotionValue ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
        }
        .navbar__logo-img {
          object-fit: contain;
          flex-shrink: 0;
          display: block;
        }
        /* Mobile: fixed size, no spring */
        @media (max-width: 1023px) {
          .navbar__logo-img { width: 64px !important; height: 64px !important; }
        }
        .navbar__logo:hover .navbar__logo-img { opacity: 0.88; }

        /* ─── Desktop nav links ── */
        .navbar__links {
          display: none;
          align-items: center;
          gap: 0.15rem;
          margin-left: auto;
        }
        @media (min-width: 1024px) { .navbar__links { display: flex; } }

        .navbar__link {
          padding: 0.45rem 0.8rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-muted);
          border-radius: var(--radius-full);
          transition: color 0.18s ease, background 0.18s ease;
          position: relative;
          text-decoration: none;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 55%;
          height: 2px;
          background: var(--color-accent);
          border-radius: 2px;
          transition: transform 0.22s ease;
        }
        .navbar__link:hover { color: var(--color-deep); }
        .navbar__link:hover::after,
        .navbar__link--active::after { transform: translateX(-50%) scaleX(1); }
        .navbar__link--active { color: var(--color-deep); font-weight: 600; }

        /* ─── Desktop actions ── */
        .navbar__actions {
          display: none;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        @media (min-width: 1024px) { .navbar__actions { display: flex; } }

        /* ─── CTA Button ── */
        .navbar__cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.2rem;
          background: var(--color-accent);
          color: #fff;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          text-decoration: none;
          letter-spacing: 0.015em;
          transition: background 0.18s ease, transform 0.25s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 12px rgba(14,165,233,0.35);
        }
        .navbar__cta-btn:hover {
          background: var(--color-accent-hov);
          transform: translateY(-1px);
          box-shadow: 0 5px 18px rgba(14,165,233,0.45);
        }

        /* ─── Hamburger ── */
        .navbar__hamburger {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          color: var(--color-deep);
          transition: background 0.18s ease;
          cursor: pointer;
        }
        @media (min-width: 1024px) { .navbar__hamburger { display: none; } }
        .navbar__hamburger:hover { background: var(--color-bg-alt); }

        /* ─── Mobile drawer ── */
        .navbar__mobile {
          background: #fff;
          overflow: hidden;
          border-top: 1px solid #E8EEF6;
        }
        .navbar__mobile ul {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.75rem clamp(1rem, 5vw, 2rem) 0;
        }
        .navbar__mobile-link {
          display: block;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-muted);
          border-radius: var(--radius-md);
          transition: background 0.15s ease, color 0.15s ease;
          text-decoration: none;
        }
        .navbar__mobile-link:hover,
        .navbar__mobile-link.active {
          background: var(--color-bg-alt);
          color: var(--color-deep);
        }
        .navbar__mobile-cta {
          padding: 1rem clamp(1rem, 5vw, 2rem);
          display: flex;
        }
      `}</style>
    </motion.nav>
  )
}
