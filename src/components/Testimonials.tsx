import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

// TODO: Replace with real customer testimonials when client provides them.
// Each testimonial needs: name, role (e.g., "Homeowner, Calgary"), text, rating (1-5).
const TESTIMONIALS = [
  {
    name: 'Michael T.',
    role: 'Homeowner, Calgary, AB',
    rating: 5,
    text: 'Flair Drywall did an absolutely outstanding job on our basement development. The mudding and taping was flawless — no cracks, no lines visible after painting. Highly professional team that cleaned up after themselves every day. Would hire again without hesitation.',
    initial: 'M',
  },
  {
    name: 'Sarah K.',
    role: 'General Contractor, Edmonton, AB',
    rating: 5,
    text: 'We\'ve partnered with Flair Drywall on multiple commercial projects over the past three years. They consistently deliver on time, on budget, and to a premium standard. Their spray foam insulation work is second to none in Alberta.',
    initial: 'S',
  },
  {
    name: 'David R.',
    role: 'Property Developer, Red Deer, AB',
    rating: 5,
    text: 'From the initial quote to the final walkthrough, the experience was seamless. The texture finishing on our spec homes looks incredible — our real estate agent noticed immediately. This is the quality that sets a property apart.',
    initial: 'D',
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 })
  const [active,   setActive]   = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance every 5 seconds, paused on hover
  useEffect(() => {
    if (isPaused || !inView) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [isPaused, inView])

  const prev = useCallback(() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), [])
  const next = useCallback(() => setActive((a) => (a + 1) % TESTIMONIALS.length), [])

  return (
    <section id="testimonials" className="section" ref={ref} aria-label="Customer testimonials">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Client Stories
          </motion.span>
          <motion.h2
            className="section-title testimonials__title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Trusted by Alberta Homeowners<br />& Contractors
          </motion.h2>
        </div>

        {/* Cards container */}
        <div
          className="testimonials__wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonials__cards">
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active
              return (
                <motion.div
                  key={t.name}
                  layout
                  className={`testimonials__card${isActive ? ' testimonials__card--active' : ''}`}
                  animate={{
                    scale:   isActive ? 1.04 : 0.95,
                    y:       isActive ? -18  : 0,
                    opacity: isActive ? 1    : 0.62,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                  onClick={() => setActive(i)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`Testimonial from ${t.name}`}
                  onKeyDown={(e) => { if (e.key === 'Enter') setActive(i) }}
                >
                  {/* Stars */}
                  <div className="testimonials__stars" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} size={15} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="testimonials__text">"{t.text}"</p>

                  {/* Author */}
                  <div className="testimonials__author">
                    <div className="testimonials__avatar" aria-hidden="true">{t.initial}</div>
                    <div>
                      <strong className="testimonials__name">{t.name}</strong>
                      <span className="testimonials__role">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="testimonials__nav">
            <button
              className="testimonials__nav-btn"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <motion.button
                  key={i}
                  className={`testimonials__dot${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.4 }}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials__nav-btn"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials__title {
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
        }
        .testimonials__wrapper {
          max-width: 1000px;
          margin-inline: auto;
        }
        .testimonials__cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          align-items: center;
          padding-block: 2.5rem;
        }
        @media (max-width: 767px) {
          .testimonials__card:not(.testimonials__card--active) {
            display: none;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .testimonials__cards { grid-template-columns: repeat(2, 1fr); }
          /* Hide second inactive card on tablet */
        }
        @media (min-width: 1024px) {
          .testimonials__cards { grid-template-columns: repeat(3, 1fr); }
        }
        .testimonials__card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: clamp(1.25rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-card);
          cursor: pointer;
          transition: border-color var(--t-base);
        }
        .testimonials__card--active {
          background: var(--color-deep);
          border-color: transparent;
          box-shadow: var(--shadow-deep);
          cursor: default;
        }
        .testimonials__stars {
          display: flex;
          gap: 3px;
          color: #FCD34D;
        }
        .testimonials__text {
          font-size: var(--text-sm);
          line-height: 1.8;
          color: var(--color-muted);
          font-style: italic;
          flex: 1;
        }
        .testimonials__card--active .testimonials__text {
          color: var(--color-on-dark);
        }
        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
        }
        .testimonials__avatar {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--grad-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1rem;
          color: #fff;
          flex-shrink: 0;
        }
        .testimonials__card--active .testimonials__avatar {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
        }
        .testimonials__name {
          display: block;
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-deep);
        }
        .testimonials__card--active .testimonials__name { color: #fff; }
        .testimonials__role {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-muted);
        }
        .testimonials__card--active .testimonials__role { color: var(--color-on-dark-muted); }
        /* Nav */
        .testimonials__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        .testimonials__nav-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          border: 2px solid var(--color-border);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast);
        }
        .testimonials__nav-btn:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }
        .testimonials__dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .testimonials__dot {
          width: 8px;
          height: 8px;
          padding: 8px;
          margin: -8px;
          border-radius: var(--radius-full);
          background: var(--color-border);
          transition: background var(--t-base), transform var(--t-spring);
          cursor: pointer;
        }
        .testimonials__dot.active {
          background: var(--color-primary);
          width: 24px;
        }
      `}</style>
    </section>
  )
}
