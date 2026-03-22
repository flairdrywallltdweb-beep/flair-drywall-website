import { motion } from 'framer-motion'
import { Layers, Thermometer, Droplets, Paintbrush2, Sparkles, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { staggerContainer, fadeInUp } from '@/lib/motionVariants'

interface Service {
  icon: React.ElementType
  title: string
  description: string
  highlights: string[]
}

const SERVICES: Service[] = [
  {
    icon: Layers,
    title: 'Drywall Installation',
    description:
      'Precision drywall installation for new construction and renovations. We handle everything from framing to a flawless finished wall.',
    highlights: ['Residential & Commercial', 'New Construction', 'Renovations'],
  },
  {
    icon: Thermometer,
    title: 'Insulation',
    description:
      'Energy-efficient insulation solutions that keep Alberta homes warm in winter and cool in summer, reducing your energy bills year-round.',
    highlights: ['Batt & Blown-In', 'Energy Efficient', 'Soundproofing'],
  },
  {
    icon: Droplets,
    title: 'Spray Foam',
    description:
      'High-performance spray foam insulation that creates an airtight seal, preventing heat loss and moisture infiltration in walls and attics.',
    highlights: ['Open & Closed Cell', 'Airtight Seal', 'Moisture Barrier'],
  },
  {
    icon: Paintbrush2,
    title: 'Mud Taping',
    description:
      'Expert taping and mudding that creates invisible seams and a perfectly smooth surface ready for paint — no waves, no cracks.',
    highlights: ['Level 4 & 5 Finish', 'Crack-Free', 'Paint Ready'],
  },
  {
    icon: Sparkles,
    title: 'Texture Finishing',
    description:
      'From orange peel to knockdown, smooth skim coat to Venetian plaster — we bring walls to life with professional texture finishes.',
    highlights: ['Orange Peel', 'Knockdown', 'Smooth Finish'],
  },
]

export default function Services() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 })

  return (
    <section id="services" className="section" ref={ref} aria-label="Our Services">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What We Do
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Expert Services for Every Project
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            Whether it's a small residential repair or a large commercial build,
            Flair Drywall Ltd delivers the same standard of quality — every time.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="services__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map(({ icon: Icon, title, description, highlights }) => (
            <motion.div
              key={title}
              className="service-card"
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
            >
              <div className="service-card__icon" aria-hidden="true">
                <Icon size={26} />
              </div>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{description}</p>
              <ul className="service-card__highlights" aria-label={`${title} highlights`}>
                {highlights.map((h) => (
                  <li key={h}>
                    <span aria-hidden="true">✓</span> {h}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="service-card__link" aria-label={`Get a quote for ${title}`}>
                Get a Quote <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .services__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          box-shadow: var(--shadow-card);
          transition: box-shadow var(--t-base), border-color var(--t-base);
          cursor: default;
        }
        .service-card:hover {
          box-shadow: var(--shadow-card-hov);
          border-color: rgba(37,99,235,0.22);
        }
        .service-card:hover .service-card__icon {
          background: var(--color-primary);
          color: #fff;
        }
        .service-card__icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          background: var(--color-bg-alt);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          transition: background var(--t-base), color var(--t-base);
          flex-shrink: 0;
        }
        .service-card__title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-deep);
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }
        .service-card__desc {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.7;
          margin-bottom: 1.25rem;
          flex: 1;
        }
        .service-card__highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }
        .service-card__highlights li {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-primary);
          background: var(--color-bg-alt);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .service-card__highlights li span {
          color: var(--color-accent);
          font-size: 0.7rem;
        }
        .service-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          transition: gap var(--t-spring), color var(--t-fast);
          margin-top: auto;
        }
        .service-card__link:hover {
          color: var(--color-accent);
          gap: 0.6rem;
        }
      `}</style>
    </section>
  )
}
