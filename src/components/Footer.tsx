import { Mail, Heart } from 'lucide-react'

const handleScroll = (href: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  const el = document.getElementById(href.replace('#', ''))
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const QUICK_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'About Us',     href: '#whyus' },
  { label: 'Services',     href: '#services' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact Us',   href: '#contact' },
]

const SERVICES = [
  'Drywall Installation',
  'Insulation',
  'Spray Foam',
  'Mud Taping',
  'Texture Finishing',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <a href="#home" onClick={handleScroll('#home')} className="footer__logo-wrap" aria-label="Flair Drywall Ltd — Back to top">
              <img src="/Logo-removebg-preview.png" alt="Flair Drywall Ltd" width={225} height={225} loading="lazy" />
            </a>
            <p className="footer__tagline">
              Professional drywall installation, insulation, and finishing services
              across Alberta — quality workmanship on every project.
            </p>
            <a
              href="https://www.tiktok.com/@flairdrywallltd"
              className="footer__tiktok-btn"
              aria-label="Follow Flair Drywall on TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.16 8.16 0 004.77 1.52V6.94a4.85 4.85 0 01-1-.25z"/>
              </svg>
              <span>Follow on TikTok</span>
            </a>
          </div>

          {/* Quick links */}
          <nav className="footer__nav" aria-label="Quick links">
            <h3 className="footer__heading">Quick Links</h3>
            <ul role="list">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={handleScroll(href)} className="footer__link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div className="footer__services">
            <h3 className="footer__heading">Our Services</h3>
            <ul role="list">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#contact" onClick={handleScroll('#contact')} className="footer__link">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h3 className="footer__heading">Contact Us</h3>
            <div className="footer__contact-items">
              <div className="footer__contact-item">
                <Mail size={16} aria-hidden="true" />
                <a href="mailto:flairdrywallltd62@gmail.com" className="footer__link">
                  flairdrywallltd62@gmail.com
                </a>
              </div>
            </div>

            <a href="#contact" onClick={handleScroll('#contact')} className="btn btn--accent footer__cta">
              Get Free Quote
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Flair Drywall Ltd. All rights reserved.
          </p>
          <p className="footer__made">
            Made with <Heart size={13} aria-label="love" /> in Alberta, Canada
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-deep);
          color: var(--color-on-dark);
          padding-top: clamp(0.5rem, 1vw, 1rem);
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--grad-accent);
        }
        .footer::after {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          border-radius: var(--radius-full);
          background: rgba(37,99,235,0.08);
          pointer-events: none;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-bottom: clamp(2.5rem, 5vw, 4rem);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: relative;
          z-index: 1;
        }
        @media (min-width: 640px)  { .footer__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) {
          .footer__grid { grid-template-columns: 2.5fr 1fr 1fr 1.5fr; }
          .footer__nav,
          .footer__services,
          .footer__contact { padding-top: 3.5rem; }
        }
        .footer__brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .footer__logo-wrap {
          display: inline-block;
          margin-bottom: 1rem;
          margin-top: 0;
        }
        .footer__logo-wrap img {
          object-fit: contain;
          width: 120px;
          height: 120px;
        }
        @media (min-width: 640px) {
          .footer__logo-wrap img { width: 160px; height: 160px; }
        }
        @media (min-width: 1024px) {
          .footer__logo-wrap img { width: 225px; height: 225px; }
        }
        .footer__tagline {
          font-size: var(--text-sm);
          color: var(--color-on-dark-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          max-width: 34ch;
        }
        .footer__social {
          display: flex;
          gap: 0.75rem;
        }
        .footer__tiktok-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 1.25rem;
          background: #000;
          color: #fff;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: 1.5px solid rgba(255,255,255,0.15);
          transition: background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast);
          white-space: nowrap;
        }
        .footer__tiktok-btn:hover {
          background: #1a1a1a;
          border-color: rgba(255,255,255,0.35);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
        }
        .footer__heading {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1.25rem;
        }
        .footer__nav ul,
        .footer__services ul {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer__link {
          font-size: var(--text-sm);
          color: var(--color-on-dark-muted);
          transition: color var(--t-fast);
          display: inline-block;
        }
        .footer__link:hover { color: var(--color-accent); }
        .footer__contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.75rem;
        }
        .footer__contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: var(--text-sm);
          color: var(--color-on-dark-muted);
        }
        .footer__contact-item svg { color: var(--color-accent); flex-shrink: 0; }
        .footer__contact-item a { color: var(--color-on-dark-muted); transition: color var(--t-fast); word-break: break-all; }
        .footer__contact-item a:hover { color: var(--color-accent); }
        .footer__cta { font-size: 0.875rem; padding: 0.65rem 1.4rem; }
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-block: 1.5rem;
          position: relative;
          z-index: 1;
        }
        .footer__copy,
        .footer__made {
          font-size: var(--text-xs);
          color: rgba(255,255,255,0.35);
        }
        .footer__made {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .footer__made svg { color: #F87171; }
      `}</style>
    </footer>
  )
}
