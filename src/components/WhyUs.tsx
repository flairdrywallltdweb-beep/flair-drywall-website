import { motion } from 'framer-motion'
import { ShieldCheck, Award, MapPin, Clock, CheckCircle2, Quote } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { slideInLeft, slideInRight, staggerContainer, fadeInUp } from '@/lib/motionVariants'

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured for your peace of mind on every project.',
  },
  {
    icon: Award,
    title: 'Quality Craftsmanship',
    description: 'We take pride in delivering flawless results that stand the test of time.',
  },
  {
    icon: MapPin,
    title: 'Alberta-Based Team',
    description: "Local experts who understand Alberta's climate and building codes.",
  },
  {
    icon: Clock,
    title: '10+ Years Experience',
    description: 'Over a decade of proven expertise in residential and commercial projects.',
  },
]

const GUARANTEES = [
  'Free, no-obligation estimates',
  'On-time project completion',
  'Clean, professional job sites',
  'Open communication throughout',
  '100% satisfaction guarantee',
]

export default function WhyUs() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section id="whyus" className="section section--alt" ref={ref} aria-label="Why choose us">
      <div className="container">
        <div className="whyus__layout">
          {/* Left column — trust points */}
          <motion.div
            className="whyus__left"
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">
              Built on Trust.<br />Finished with Pride.
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
              At Flair Drywall Ltd, we don't just install drywall — we build lasting
              relationships with our clients through honest work and exceptional results.
            </p>

            <motion.div
              className="whyus__points"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
                <motion.div key={title} className="whyus__point" variants={fadeInUp}>
                  <div className="whyus__point-icon" aria-hidden="true">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="whyus__point-title">{title}</h3>
                    <p className="whyus__point-desc">{description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — guarantee card */}
          <motion.div
            className="whyus__right"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="whyus__card">
              <div className="whyus__card-quote" aria-hidden="true">
                <Quote size={48} />
              </div>
              <h3 className="whyus__card-title">Our Promise to You</h3>
              <p className="whyus__card-text">
                "Every project receives our full attention and commitment.
                We treat your home or business like our own, ensuring every
                detail is perfect before we consider the job complete."
              </p>
              <ul className="whyus__guarantees" aria-label="Our guarantees">
                {GUARANTEES.map((g) => (
                  <li key={g}>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn btn--accent" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
                Start Your Project
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .whyus__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(3rem, 6vw, 5rem);
          align-items: start;
        }
        @media (min-width: 1024px) {
          .whyus__layout { grid-template-columns: 1fr 1fr; align-items: center; }
        }
        .whyus__points {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .whyus__point {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        .whyus__point-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          background: var(--color-primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .whyus__point-title {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-deep);
          margin-bottom: 0.25rem;
        }
        .whyus__point-desc {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.65;
        }
        .whyus__card {
          background: var(--color-deep);
          border-radius: var(--radius-2xl);
          padding: clamp(2rem, 4vw, 3rem);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-deep);
        }
        .whyus__card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 80% 0%, rgba(37,99,235,0.3) 0%, transparent 70%);
          pointer-events: none;
        }
        .whyus__card-quote {
          color: rgba(255,255,255,0.1);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .whyus__card-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          color: #fff;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }
        .whyus__card-text {
          font-size: var(--text-sm);
          color: var(--color-on-dark);
          line-height: 1.75;
          margin-bottom: 1.75rem;
          font-style: italic;
          position: relative;
          z-index: 1;
        }
        .whyus__guarantees {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          position: relative;
          z-index: 1;
        }
        .whyus__guarantees li {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.88);
          font-weight: 500;
        }
        .whyus__guarantees li svg { color: #4ADE80; flex-shrink: 0; }
        .whyus__card .btn { position: relative; z-index: 1; }
      `}</style>
    </section>
  )
}
