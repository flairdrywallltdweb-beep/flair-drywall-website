import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, ZoomIn } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { staggerContainer, fadeInUp } from '@/lib/motionVariants'

// TODO: Replace placeholder cards with real <img> tags when client provides photos.
// Each item should include: src (image URL), alt (descriptive alt text), title (project name), location (city in Alberta).
const GALLERY_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: ['Basement Development', 'New Build Install', 'Commercial Office', 'Luxury Home', 'Kitchen Reno', 'Spray Foam Insulation', 'Texture Finish', 'Garage Drywall', 'Condo Renovation'][i],
  location: ['Calgary, AB', 'Edmonton, AB', 'Red Deer, AB', 'Lethbridge, AB', 'Calgary, AB', 'Edmonton, AB', 'Airdrie, AB', 'Cochrane, AB', 'Calgary, AB'][i],
  category: ['Drywall', 'Drywall', 'Commercial', 'Drywall', 'Taping', 'Insulation', 'Texture', 'Drywall', 'Renovation'][i],
  // When real images are available: src: '/gallery/project-1.jpg'
}))

export default function Gallery() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.08 })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox  = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const prevItem      = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null))
  const nextItem      = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_ITEMS.length : null))

  const current = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null

  return (
    <section id="gallery" className="section" ref={ref} aria-label="Project gallery">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Work
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Projects We're Proud Of
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            From cozy residential renovations to large commercial builds —
            every project gets our full attention and craftsmanship.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          className="gallery__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              className="gallery__card"
              variants={fadeInUp}
              whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 360, damping: 28 } }}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${item.title}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx) }}
            >
              {/* Placeholder background — remove when real images added */}
              <div className="gallery__placeholder" aria-hidden="true">
                <Camera size={36} />
              </div>

              {/* Hover overlay */}
              <div className="gallery__overlay">
                <div className="gallery__overlay-content">
                  <ZoomIn size={22} />
                  <span className="gallery__overlay-title">{item.title}</span>
                  <span className="gallery__overlay-loc">{item.location}</span>
                </div>
              </div>

              {/* Category badge */}
              <span className="gallery__badge">{item.category}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA below grid */}
        <motion.div
          className="gallery__cta"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>Ready to add your project to our portfolio?</p>
          <a href="#contact" className="btn btn--primary">Get Your Free Quote</a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && current && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Viewing: ${current.title}`}
          >
            <motion.div
              className="gallery__lightbox-content"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Placeholder in lightbox — replace with <img> when photos available */}
              <div className="gallery__lightbox-img" aria-hidden="true">
                <Camera size={64} />
                <p>Photo coming soon</p>
              </div>
              <div className="gallery__lightbox-info">
                <h3>{current.title}</h3>
                <p>{current.location}</p>
                <span className="gallery__badge">{current.category}</span>
              </div>
              <button className="gallery__lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
                <X size={20} />
              </button>
              <button className="gallery__lightbox-prev" onClick={prevItem} aria-label="Previous project">‹</button>
              <button className="gallery__lightbox-next" onClick={nextItem} aria-label="Next project">›</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        @media (min-width: 768px)  { .gallery__grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .gallery__grid { grid-template-columns: repeat(3, 1fr); } }

        .gallery__card {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4/3;
          box-shadow: var(--shadow-card);
        }
        .gallery__placeholder {
          width: 100%;
          height: 100%;
          background: var(--grad-cta);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.3);
        }
        .gallery__overlay {
          position: absolute;
          inset: 0;
          background: var(--grad-card);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity var(--t-base);
        }
        .gallery__card:hover .gallery__overlay { opacity: 1; }
        .gallery__overlay-content {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          color: #fff;
        }
        .gallery__overlay-content svg { color: var(--color-accent); margin-bottom: 0.25rem; }
        .gallery__overlay-title { font-size: var(--text-base); font-weight: 700; }
        .gallery__overlay-loc { font-size: var(--text-xs); color: rgba(255,255,255,0.7); }
        .gallery__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .gallery__cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 3rem;
          text-align: center;
        }
        .gallery__cta p { font-size: var(--text-lg); color: var(--color-muted); }
        /* Lightbox */
        .gallery__lightbox {
          position: fixed;
          inset: 0;
          background: rgba(15,27,45,0.92);
          z-index: var(--z-modal);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .gallery__lightbox-content {
          background: var(--color-bg);
          border-radius: var(--radius-2xl);
          overflow: hidden;
          max-width: 720px;
          width: 100%;
          position: relative;
          box-shadow: var(--shadow-xl);
        }
        .gallery__lightbox-img {
          aspect-ratio: 16/9;
          background: var(--grad-cta);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: rgba(255,255,255,0.35);
        }
        .gallery__lightbox-img p { font-size: var(--text-sm); }
        .gallery__lightbox-info {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .gallery__lightbox-info h3 { font-size: var(--text-xl); color: var(--color-deep); margin: 0; }
        .gallery__lightbox-info p { font-size: var(--text-sm); color: var(--color-muted); }
        .gallery__lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--t-fast);
        }
        .gallery__lightbox-close:hover { background: rgba(255,255,255,0.28); }
        .gallery__lightbox-prev,
        .gallery__lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background: rgba(37,99,235,0.15);
          color: var(--color-primary);
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--t-fast);
        }
        .gallery__lightbox-prev { left: 1rem; }
        .gallery__lightbox-next { right: 1rem; }
        .gallery__lightbox-prev:hover,
        .gallery__lightbox-next:hover { background: var(--color-primary); color: #fff; }
      `}</style>
    </section>
  )
}
