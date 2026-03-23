import { motion } from 'framer-motion'
import { PhoneCall, ClipboardList, HardHat, CheckCircle2 } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { staggerContainer, fadeInUp } from '@/lib/motionVariants'

const STEPS = [
  {
    number: '01',
    icon: PhoneCall,
    title: 'Free Consultation',
    description: 'Contact us for a no-obligation consultation. We discuss your project vision, timeline, and answer any questions you have.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Site Assessment',
    description: 'Our team visits your site, takes accurate measurements, and prepares a detailed, transparent quote with no hidden fees.',
  },
  {
    number: '03',
    icon: HardHat,
    title: 'Expert Installation',
    description: 'Our skilled tradespeople get to work — efficiently, cleanly, and with precision — respecting your space throughout.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Quality Inspection',
    description: 'We go through everything top to bottom, making sure every detail is held to our highest standards before we call it complete.',
  },
]

export default function Process() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.12 })

  return (
    <section id="process" className="section section--alt" ref={ref} aria-label="Our work process">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            How We Work
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Simple. Transparent. Professional.
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            Our streamlined process takes the stress out of your project — from first
            call to final inspection.
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          className="process__steps"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {STEPS.map(({ number, icon: Icon, title, description }, idx) => (
            <motion.div key={number} className="process__step" variants={fadeInUp}>
              {/* Connector line (hidden on last item) */}
              {idx < STEPS.length - 1 && (
                <motion.div
                  className="process__connector"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.18 + 0.3, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}

              {/* Step card */}
              <div className="process__card">
                <div className="process__number-wrap" aria-hidden="true">
                  <span className="process__number">{number}</span>
                </div>
                <div className="process__icon" aria-hidden="true">
                  <Icon size={28} />
                </div>
                <h3 className="process__title">{title}</h3>
                <p className="process__desc">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="process__cta"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <a href="#contact" className="btn btn--primary">
            Start Your Free Consultation
          </a>
        </motion.div>
      </div>

      <style>{`
        .process__steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          position: relative;
        }
        @media (min-width: 640px) {
          .process__steps { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .process__steps { grid-template-columns: repeat(4, 1fr); }
        }
        .process__step { position: relative; }
        .process__connector {
          display: none;
        }
        @media (min-width: 1024px) {
          .process__connector {
            display: block;
            position: absolute;
            top: 3.5rem; /* vertically centered on icon */
            left: calc(50% + 2.5rem);
            width: calc(100% - 2rem);
            height: 2px;
            background: var(--grad-accent);
            z-index: 0;
          }
        }
        .process__card {
          position: relative;
          z-index: 1;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 3vw, 1.5rem);
          text-align: center;
          box-shadow: var(--shadow-card);
          transition: box-shadow var(--t-base), border-color var(--t-base), transform var(--t-spring);
        }
        .process__card:hover {
          box-shadow: var(--shadow-card-hov);
          border-color: rgba(37,99,235,0.25);
          transform: translateY(-4px);
        }
        .process__number-wrap {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--grad-cta);
          border-radius: var(--radius-full);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .process__number {
          font-size: 0.7rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.04em;
        }
        .process__icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background: var(--color-bg-alt);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.75rem auto 1.25rem;
          border: 2px solid var(--color-border);
          transition: background var(--t-base), color var(--t-base);
        }
        .process__card:hover .process__icon {
          background: var(--color-primary);
          color: #fff;
          border-color: var(--color-primary);
        }
        .process__title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-deep);
          margin-bottom: 0.75rem;
        }
        .process__desc {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.7;
        }
        .process__cta {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }
      `}</style>
    </section>
  )
}
