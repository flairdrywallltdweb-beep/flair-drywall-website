import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const TESTIMONIALS = [
  {
    name: 'Sujan Singh',
    role: 'Homeowner, Calgary, AB',
    rating: 5,
    text: 'Hired Flair Drywall for my basement development and I was blown away. They showed up on time every single day, finished ahead of schedule, and left the site spotless. The walls came out perfectly level — you can tell these guys actually take pride in their work. 100% satisfied.',
    initial: 'S',
  },
  {
    name: 'Abrar Ahmed',
    role: 'Homeowner, Edmonton, AB',
    rating: 5,
    text: 'The mud taping on my renovation was unbelievable — completely clean, zero cracks, and the seams are totally invisible after paint. I\'ve had other guys do taping before and it never looked like this. Flair Drywall is on another level. Best in the business.',
    initial: 'A',
  },
  {
    name: 'Vikram Thakur',
    role: 'Homeowner, Red Deer, AB',
    rating: 5,
    text: 'Got soundproofing insulation done between floors and the difference is night and day. The team was professional, knowledgeable, and didn\'t cut any corners. Showed up when they said they would and cleaned up everything before they left. Genuinely impressed — 100% satisfied.',
    initial: 'V',
  },
  {
    name: 'Martin K.',
    role: 'Homeowner, Cochrane, AB',
    rating: 5,
    text: 'Flair Drywall gave me the best quote out of three companies I contacted — and they didn\'t compromise on quality at all. The spray foam work was clean, tight, and done right the first time. On time, professional, no surprises on the invoice. Would recommend to anyone.',
    initial: 'M',
  },
  {
    name: 'Emmanuel G.',
    role: 'Property Owner, Calgary, AB',
    rating: 5,
    text: 'The texture finishing on my living room ceiling looks incredible. Simple, clean, and consistent all the way through — exactly what I asked for. These guys really listen and deliver. The quote was fair, the work was expert, and the cleanup was thorough. Couldn\'t be happier.',
    initial: 'E',
  },
  {
    name: 'Scout Copper',
    role: 'Commercial Development Manager, Calgary, AB',
    rating: 5,
    text: 'I\'ve brought Flair Drywall onto multiple jobs now and they never disappoint. Always on time, always clean, and the craftsmanship speaks for itself. Their pricing is very reasonable for the quality you get. Reliable, expert team — exactly what you want on a job site.',
    initial: 'S',
  },
]

const TOTAL = TESTIMONIALS.length

function usePerView() {
  const [perView, setPerView] = useState(3)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perView
}

export default function Testimonials() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 })
  const perView  = usePerView()
  const maxIndex = TOTAL - perView
  const [index, setIndex]     = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Swipe tracking
  const touchStartX = useRef<number | null>(null)

  // Clamp on resize
  useEffect(() => {
    setIndex((i) => Math.min(i, TOTAL - perView))
  }, [perView])

  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex])
  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex])

  // Auto-advance
  useEffect(() => {
    if (isPaused || !inView) return
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 4500)
    return () => clearInterval(id)
  }, [isPaused, inView, maxIndex])

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev()
    }
    touchStartX.current = null
    setIsPaused(false)
  }

  // Correct math:
  // Track box-width = parent width (block element, no explicit width)
  // Each card = (100/perView)% of parent
  // translateX % is relative to element's OWN box width = parent width
  // So to move 1 card = -(100/perView)% of parent ✓
  const translateX = -(index * (100 / perView))

  return (
    <section id="testimonials" className="section" ref={ref} aria-label="Customer testimonials">
      <div className="container">
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
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Trusted by Alberta Homeowners<br />& Contractors
          </motion.h2>
        </div>

        <motion.div
          className="tc__root"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Viewport — clips the track */}
          <div
            className="tc__viewport"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Track — all cards in a row, no gap (padding inside cards instead) */}
            <div
              className="tc__track"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="tc__slide"
                  style={{ flex: `0 0 ${100 / perView}%` }}
                >
                  <div className="tc__card">
                    <div className="tc__quote-icon" aria-hidden="true">
                      <Quote size={26} />
                    </div>
                    <div className="tc__stars" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="tc__text">"{t.text}"</p>
                    <div className="tc__author">
                      <div className="tc__avatar" aria-hidden="true">{t.initial}</div>
                      <div>
                        <strong className="tc__name">{t.name}</strong>
                        <span className="tc__role">{t.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            className="tc__arrow tc__arrow--prev"
            onClick={prev}
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="tc__arrow tc__arrow--next"
            onClick={next}
            aria-label="Next testimonials"
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="tc__dots" role="tablist" aria-label="Testimonial navigation">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`tc__dot${i === index ? ' tc__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .tc__root {
          position: relative;
          /* Arrow buttons sit outside viewport, so give horizontal room */
          padding: 0 clamp(2rem, 5vw, 3rem);
        }

        /* Clips overflowing cards */
        .tc__viewport {
          overflow: hidden;
        }

        /* All cards in one horizontal line — no CSS gap (avoids math mismatch) */
        .tc__track {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          padding-block: 1.5rem;
          will-change: transform;
        }

        /* Each slide = 1/perView of viewport; padding creates visual gap */
        .tc__slide {
          flex-shrink: 0;
          padding-inline: clamp(0.35rem, 1vw, 0.6rem);
        }

        .tc__card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: clamp(1.25rem, 3vw, 1.75rem);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          box-shadow: var(--shadow-card);
          height: 100%;
          transition: box-shadow var(--t-base), border-color var(--t-base), transform var(--t-spring);
        }
        .tc__card:hover {
          box-shadow: var(--shadow-card-hov);
          border-color: rgba(37,99,235,0.22);
          transform: translateY(-4px);
        }

        .tc__quote-icon {
          color: var(--color-primary);
          opacity: 0.2;
          line-height: 1;
        }

        .tc__stars {
          display: flex;
          gap: 2px;
          color: #FCD34D;
        }

        .tc__text {
          font-size: var(--text-sm);
          line-height: 1.8;
          color: var(--color-muted);
          font-style: italic;
          flex: 1;
        }

        .tc__author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }

        .tc__avatar {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: var(--radius-full);
          background: var(--grad-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.9rem;
          color: #fff;
        }

        .tc__name {
          display: block;
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-deep);
        }

        .tc__role {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-muted);
          margin-top: 1px;
        }

        /* Arrow buttons — 44px touch target */
        .tc__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: var(--color-bg);
          border: 1.5px solid var(--color-border);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-card);
          transition: background var(--t-fast), border-color var(--t-fast), color var(--t-fast), opacity var(--t-fast);
          z-index: 2;
          flex-shrink: 0;
        }
        .tc__arrow--prev { left: 0; }
        .tc__arrow--next { right: 0; }
        .tc__arrow:hover:not(:disabled) {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }

        /* Dots — padded to 44px tall tap area */
        .tc__dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.35rem;
          margin-top: 1.25rem;
          padding: 0.75rem 0; /* extends tap area height */
        }
        .tc__dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background: var(--color-border);
          /* padding expands the tap target to ~44px without affecting visual size */
          padding: 10px;
          margin: -10px;
          transition: background var(--t-base), width var(--t-spring);
          cursor: pointer;
          /* Override the padding-trick visual — keep dot small */
          background-clip: content-box;
          border: 10px solid transparent;
        }
        .tc__dot--active {
          background-color: var(--color-primary);
          width: 24px;
        }

        @media (max-width: 639px) {
          .tc__root { padding: 0 clamp(1.75rem, 5vw, 2.5rem); }
          .tc__card { padding: 1.25rem; }
        }
      `}</style>
    </section>
  )
}
