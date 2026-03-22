import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Award, Building2, ThumbsUp } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { staggerContainer, fadeInUp } from '@/lib/motionVariants'

interface StatItem {
  icon: React.ElementType
  value: number
  suffix: string
  label: string
  description: string
}

const STATS: StatItem[] = [
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
    description: 'A decade of expert craftsmanship',
  },
  {
    icon: Building2,
    value: 1000,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Homes and buildings across Alberta',
  },
  {
    icon: ThumbsUp,
    value: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    description: 'Quality guaranteed, every time',
  },
]

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const motionVal = useMotionValue(0)
  const spring    = useSpring(motionVal, { stiffness: 55, damping: 20 })
  const display   = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, target, motionVal])

  return <motion.span>{display}</motion.span>
}

export default function Stats() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 })

  return (
    <section id="stats" className="stats" ref={ref} aria-label="Company statistics">
      <div className="container">
        <motion.div
          className="stats__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {STATS.map(({ icon: Icon, value, suffix, label, description }) => (
            <motion.div key={label} className="stats__card" variants={fadeInUp}>
              <div className="stats__icon" aria-hidden="true">
                <Icon size={28} />
              </div>
              <div className="stats__number">
                <CountUp target={value} suffix={suffix} inView={inView} />
              </div>
              <h3 className="stats__label">{label}</h3>
              <p className="stats__desc">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .stats {
          padding-block: clamp(3.5rem, 6vw, 5rem);
          background: var(--grad-stats);
          position: relative;
          overflow: hidden;
        }
        .stats::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(14,165,233,0.15) 0%, transparent 70%);
          pointer-events: none;
        }
        .stats__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2px;
          position: relative;
          z-index: 1;
        }
        .stats__card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(2rem, 4vw, 3rem) 2rem;
          border-right: 1px solid rgba(255,255,255,0.1);
          transition: background var(--t-base);
        }
        .stats__card:last-child { border-right: none; }
        .stats__card:hover { background: rgba(255,255,255,0.05); }
        @media (max-width: 767px) {
          .stats__card { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .stats__card:last-child { border-bottom: none; }
        }
        .stats__icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.9);
          margin-bottom: 1.25rem;
          border: 1px solid rgba(255,255,255,0.18);
        }
        .stats__number {
          font-family: 'Oswald', sans-serif;
          font-size: clamp(3rem, 5.5vw, 4.25rem);
          font-weight: 700;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }
        .stats__label {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-bottom: 0.35rem;
          letter-spacing: 0.02em;
        }
        .stats__desc {
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }
      `}</style>
    </section>
  )
}
