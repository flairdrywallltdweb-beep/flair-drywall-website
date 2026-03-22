import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { scaleIn, staggerContainer, fadeInUp } from '@/lib/motionVariants'

export default function CTABanner() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.3 })

  return (
    <section className="cta-banner" ref={ref} aria-label="Call to action">
      <div className="cta-banner__bg" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="cta-banner__content"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-label section-label--light" variants={fadeInUp}>
            Ready to Get Started?
          </motion.span>

          <motion.h2 className="section-title section-title--light cta-banner__title" variants={fadeInUp}>
            Get a Free Quote on<br />Your Next Project
          </motion.h2>

          <motion.p className="section-subtitle section-subtitle--light cta-banner__subtitle" variants={fadeInUp}>
            Whether it's a full renovation or a single room — we provide fast,
            accurate, no-obligation estimates. Serving all of Alberta.
          </motion.p>

          <motion.div className="cta-banner__actions" variants={scaleIn}>
            <motion.a
              href="mailto:flairdrywallltd62@gmail.com"
              className="btn cta-banner__email-btn"
              whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            >
              <Mail size={18} />
              flairdrywallltd62@gmail.com
            </motion.a>

            <a href="#contact" className="btn btn--ghost cta-banner__form-btn">
              Fill Out the Form <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div className="cta-banner__trust" variants={fadeInUp}>
            {['Free Estimates', 'Fast Response', 'No Obligation', 'Alberta-Based'].map((t) => (
              <div key={t} className="cta-banner__trust-item">
                <span aria-hidden="true">✓</span>
                <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .cta-banner {
          position: relative;
          padding-block: clamp(4rem, 8vw, 7rem);
          overflow: hidden;
          text-align: center;
        }
        .cta-banner__bg {
          position: absolute;
          inset: 0;
          background: var(--grad-cta);
          z-index: 0;
        }
        .cta-banner__bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 50%, rgba(14,165,233,0.22) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(14,165,233,0.14) 0%, transparent 50%);
        }
        .cta-banner .container {
          position: relative;
          z-index: 1;
        }
        .cta-banner__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .cta-banner__title {
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          max-width: 16ch;
          text-align: center;
          margin-inline: auto;
          margin-bottom: 1.25rem;
        }
        .cta-banner__subtitle {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .cta-banner__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .cta-banner__email-btn {
          background: #fff;
          color: var(--color-primary);
          font-weight: 700;
          font-size: var(--text-base);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          padding: 0.9rem 2rem;
        }
        .cta-banner__email-btn:hover {
          background: var(--color-bg-alt);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.28);
        }
        .cta-banner__form-btn {
          padding: 0.9rem 1.75rem;
          font-size: var(--text-base);
        }
        .cta-banner__trust {
          display: flex;
          gap: clamp(1rem, 4vw, 2rem);
          flex-wrap: wrap;
          justify-content: center;
        }
        .cta-banner__trust-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.78);
          font-weight: 500;
        }
        .cta-banner__trust-item span:first-child {
          color: #4ADE80;
          font-weight: 700;
        }
        @media (max-width: 767px) {
          .cta-banner__actions { flex-direction: column; align-items: stretch; }
          .cta-banner__email-btn,
          .cta-banner__form-btn { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
