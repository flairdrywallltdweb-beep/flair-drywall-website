import { motion } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { heroEntrance, fadeInUp } from '@/lib/motionVariants'

const handleScroll = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const HERO_FEATURES = [
  'Residential & Commercial',
  'Free Estimates',
  'Serving All of Alberta',
]

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Drywall installation and finishing services in Alberta">
      {/* Background — structural geometric design */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
        <div className="hero__bg-diagonal" />
        <div className="hero__bg-glow" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow label */}
          <motion.p className="hero__eyebrow" variants={fadeInUp}>
            Drywall &amp; Insulation Specialists — Alberta
          </motion.p>

          {/* Main headline */}
          <motion.h1 className="hero__title" variants={fadeInUp}>
            Expert Drywall<br />
            <em className="hero__title-accent">Installation &amp; Finishing</em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p className="hero__subtitle" variants={fadeInUp}>
            Quality workmanship in drywall installation, insulation, spray foam,
            mud taping, and texture finishing — delivered with care and precision
            across Alberta.
          </motion.p>

          {/* Feature pills */}
          <motion.div className="hero__features" variants={fadeInUp}>
            {HERO_FEATURES.map((f) => (
              <div key={f} className="hero__feature">
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>{f}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div className="hero__ctas" variants={fadeInUp}>
            <a
              href="#contact"
              onClick={handleScroll('contact')}
              className="hero__btn hero__btn--primary"
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              onClick={handleScroll('services')}
              className="hero__btn hero__btn--ghost"
            >
              View Services
            </a>
          </motion.div>
        </motion.div>

        {/* Stats strip — right side on desktop */}
        <motion.div
          className="hero__stats"
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
        >
          {[
            { value: '10+',    label: 'Years of Experience' },
            { value: '1000+',  label: 'Projects Completed' },
            { value: 'Free',   label: 'Estimates — No Obligation' },
          ].map(({ value, label }) => (
            <motion.div key={label} className="hero__stat" variants={fadeInUp}>
              <strong className="hero__stat-value">{value}</strong>
              <span className="hero__stat-label">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero__scroll-btn"
        onClick={handleScroll('stats')}
        aria-label="Scroll to next section"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={22} />
      </motion.button>

      <style>{`
        .hero {
          position: relative;
          min-height: calc(100vh - 80px);
          min-height: calc(100svh - 80px);
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        /* ── Background layers ── */
        .hero__bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(150deg, #0C1929 0%, #1E3A5F 45%, #1a4a80 75%, #0c3060 100%);
          z-index: 0;
        }
        /* Subtle structural grid — suggests precision/craftsmanship */
        .hero__bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 0, transparent 80px),
            repeating-linear-gradient(0deg,  rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 0, transparent 80px);
          background-size: 80px 80px;
        }
        /* Diagonal block — breaks the flat gradient, adds dimension */
        .hero__bg-diagonal {
          position: absolute;
          inset: 0;
          background: rgba(14,165,233,0.055);
          clip-path: polygon(55% 0%, 100% 0%, 100% 100%, 35% 100%);
        }
        /* Soft glow accent */
        .hero__bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 50% 60% at 75% 40%, rgba(14,165,233,0.18) 0%, transparent 65%);
        }

        /* ── Container ── */
        .hero__container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-block: clamp(2.5rem, 5vw, 4rem);
        }
        @media (min-width: 1024px) {
          .hero__container {
            grid-template-columns: 1.4fr 0.6fr;
            align-items: center;
          }
        }

        /* ── Typography ── */
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(147,197,253,0.85);
          margin-bottom: 1.1rem;
        }
        .hero__title {
          font-family: var(--font-display);
          font-size: var(--text-4xl);
          font-weight: 700;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        /* Italic accent line — Cardo italic is elegant, intentional contrast */
        .hero__title-accent {
          display: block;
          font-style: italic;
          color: #7DD3FC;
          font-weight: 400;
        }
        .hero__subtitle {
          font-size: var(--text-lg);
          color: rgba(255,255,255,0.72);
          line-height: 1.75;
          max-width: 50ch;
          margin-bottom: 2rem;
        }
        .hero__features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        .hero__feature {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.80);
        }
        .hero__feature svg { color: #4ADE80; flex-shrink: 0; }

        /* ── CTAs ── */
        .hero__ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 2rem;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          border-radius: var(--radius-full);
          border: 2px solid transparent;
          letter-spacing: 0.02em;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, background 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }
        .hero__btn--primary {
          background: var(--color-accent);
          color: #fff;
          box-shadow: 0 4px 20px rgba(14,165,233,0.42);
        }
        .hero__btn--primary:hover {
          background: var(--color-accent-hov);
          box-shadow: 0 8px 30px rgba(14,165,233,0.5);
          transform: translateY(-3px);
        }
        .hero__btn--ghost {
          background: transparent;
          color: #fff;
          border-color: rgba(255,255,255,0.4);
        }
        .hero__btn--ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.8);
          transform: translateY(-3px);
        }

        /* ── Stats sidebar ── */
        .hero__stats {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          flex-wrap: wrap;
        }
        @media (min-width: 1024px) {
          .hero__stats {
            flex-direction: column;
            gap: 0;
            align-self: center;
          }
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 1.1rem 1.4rem;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(6px);
          min-width: 120px;
          transition: background 0.2s ease;
        }
        .hero__stat:hover { background: rgba(255,255,255,0.10); }
        @media (min-width: 1024px) {
          .hero__stat {
            border-radius: 0;
            border: none;
            border-left: 3px solid rgba(255,255,255,0.15);
            background: transparent;
            padding: 0.9rem 1.25rem;
          }
          .hero__stat:hover { background: transparent; border-left-color: var(--color-accent); }
        }
        .hero__stat-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 900;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .hero__stat-label {
          font-size: var(--text-xs);
          color: rgba(255,255,255,0.55);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── Scroll button ── */
        .hero__scroll-btn {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          color: rgba(255,255,255,0.4);
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          transition: color 0.18s ease;
          cursor: pointer;
        }
        .hero__scroll-btn:hover { color: rgba(255,255,255,0.85); }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .hero__ctas { flex-direction: column; }
          .hero__btn { width: 100%; }
          .hero__stats { gap: 0.65rem; }
          .hero__stat { flex: 1; min-width: 0; padding: 0.9rem; }
        }
      `}</style>
    </section>
  )
}
