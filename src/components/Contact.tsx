import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { Mail, CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import { slideInLeft, slideInRight } from '@/lib/motionVariants'

// ─── EmailJS Configuration ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_j8788je'
const EMAILJS_TEMPLATE_ID = 'template_n7adw0n'
const EMAILJS_PUBLIC_KEY  = 'uQgl5BmKyzS1u6QSB'
// ─────────────────────────────────────────────────────────────────────────────

const quoteSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  phone:   z.string().min(7, 'Please enter a valid phone number'),
  email:   z.string().email('Please enter a valid email address'),
  service: z.enum(
    ['drywall-installation', 'insulation', 'spray-foam', 'mud-taping', 'texture-finishing', 'other'],
    { required_error: 'Please select a service' }
  ),
  message: z.string().min(10, 'Please provide more detail (at least 10 characters)').max(1000, 'Message is too long'),
})

type QuoteFormData = z.infer<typeof quoteSchema>

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const SERVICE_OPTIONS = [
  { value: 'drywall-installation', label: 'Drywall Installation' },
  { value: 'insulation',           label: 'Insulation' },
  { value: 'spray-foam',           label: 'Spray Foam' },
  { value: 'mud-taping',           label: 'Mud Taping' },
  { value: 'texture-finishing',    label: 'Texture Finishing' },
  { value: 'other',                label: 'Other / Not Sure' },
]

export default function Contact() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.1 })
  const [formState, setFormState] = useState<FormState>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({ resolver: zodResolver(quoteSchema) })

  const onSubmit = async (data: QuoteFormData) => {
    setFormState('submitting')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  data.name,
          from_email: data.email,
          reply_to:   data.email,
          phone:      data.phone,
          service:    SERVICE_OPTIONS.find((s) => s.value === data.service)?.label ?? data.service,
          message:    data.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setFormState('success')
      reset()
    } catch (err) {
      console.error('[Contact] EmailJS error:', err)
      setFormState('error')
    }
  }

  return (
    <section id="contact" className="section section--alt" ref={ref} aria-label="Contact us">
      <div className="container">
        {/* Header */}
        <div className="section-header section-header--center">
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Request Your Free Quote
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            Fill out the form and we'll get back to you within 24 hours with
            a detailed, no-obligation estimate.
          </motion.p>
        </div>

        <div className="contact__layout">
          {/* Form */}
          <motion.div
            className="contact__form-wrap"
            variants={slideInLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                /* Success state */
                <motion.div
                  key="success"
                  className="contact__success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="contact__success-icon" aria-hidden="true">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 size={52} />
                    </motion.div>
                  </div>
                  <h3>Quote Request Sent!</h3>
                  <p>Thank you, we'll contact you within 24 hours with your free estimate.</p>
                  <button className="btn btn--outline" onClick={() => setFormState('idle')}>
                    Send Another Request
                  </button>
                </motion.div>
              ) : (
                /* Form state */
                <motion.form
                  key="form"
                  className="contact__form"
                  onSubmit={handleSubmit(onSubmit)}
                  exit={{ opacity: 0 }}
                  noValidate
                  aria-label="Quote request form"
                >
                  {formState === 'error' && (
                    <div className="contact__error-banner" role="alert">
                      <AlertCircle size={18} aria-hidden="true" />
                      <div>
                        <strong>Message failed to send.</strong>{' '}
                        Please email us directly at{' '}
                        <a href="mailto:flairdrywallltd62@gmail.com">flairdrywallltd62@gmail.com</a>
                      </div>
                    </div>
                  )}

                  {/* Row: Name + Phone */}
                  <div className="contact__row">
                    <div className="contact__field">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        {...register('name')}
                      />
                      {errors.name && <span id="name-error" className="contact__field-error" role="alert">{errors.name.message}</span>}
                    </div>
                    <div className="contact__field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(403) 555-0123"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        {...register('phone')}
                      />
                      {errors.phone && <span id="phone-error" className="contact__field-error" role="alert">{errors.phone.message}</span>}
                    </div>
                  </div>

                  {/* Row: Email */}
                  <div className="contact__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email')}
                    />
                    {errors.email && <span id="email-error" className="contact__field-error" role="alert">{errors.email.message}</span>}
                  </div>

                  {/* Service dropdown */}
                  <div className="contact__field">
                    <label htmlFor="service">Service Needed *</label>
                    <select
                      id="service"
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      {...register('service')}
                    >
                      <option value="">Select a service…</option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    {errors.service && <span id="service-error" className="contact__field-error" role="alert">{errors.service.message}</span>}
                  </div>

                  {/* Message */}
                  <div className="contact__field">
                    <label htmlFor="message">Project Details *</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project — size, location, timeline, and any specific requirements…"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      {...register('message')}
                    />
                    {errors.message && <span id="message-error" className="contact__field-error" role="alert">{errors.message.message}</span>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary contact__submit"
                    disabled={formState === 'submitting'}
                    aria-busy={formState === 'submitting'}
                  >
                    {formState === 'submitting'
                      ? <><Loader2 size={18} className="spin" aria-hidden="true" /> Sending…</>
                      : <><Send size={18} aria-hidden="true" /> Send Quote Request</>
                    }
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            className="contact__info"
            variants={slideInRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="contact__info-card">
              <h3 className="contact__info-title">Contact Information</h3>

              <div className="contact__info-items">
                <div className="contact__info-item">
                  <Mail size={20} aria-hidden="true" />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:flairdrywallltd62@gmail.com">flairdrywallltd62@gmail.com</a>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="contact__badges">
                <h4>Why Choose Flair Drywall?</h4>
                {[
                  '10+ Years in Alberta',
                  'Free, No-Obligation Estimates',
                  'Licensed & Insured',
                  'Residential & Commercial',
                  '100% Satisfaction Guarantee',
                ].map((badge) => (
                  <div key={badge} className="contact__badge">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact__layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 1024px) {
          .contact__layout { grid-template-columns: 3fr 2fr; align-items: start; }
        }
        .contact__form-wrap {
          background: var(--color-bg);
          border-radius: var(--radius-2xl);
          padding: clamp(1.5rem, 4vw, 2.5rem);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          min-height: 480px;
          display: flex;
          flex-direction: column;
        }
        .contact__form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1;
        }
        .contact__row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 768px) { .contact__row { grid-template-columns: 1fr 1fr; } }
        .contact__field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .contact__field label {
          font-size: clamp(0.875rem, 2vw, 1rem);
          font-weight: 600;
          color: var(--color-deep);
        }
        .contact__field input,
        .contact__field select,
        .contact__field textarea {
          padding: 0.75rem 1rem;
          min-height: 44px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-text);
          background: var(--color-bg);
          transition: border-color var(--t-fast), box-shadow var(--t-fast);
          outline: none;
          width: 100%;
          appearance: auto;
        }
        .contact__field input::placeholder,
        .contact__field textarea::placeholder { color: #aab4c8; }
        .contact__field input:focus,
        .contact__field select:focus,
        .contact__field textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .contact__field input[aria-invalid="true"],
        .contact__field select[aria-invalid="true"],
        .contact__field textarea[aria-invalid="true"] {
          border-color: #EF4444;
        }
        .contact__field-error {
          font-size: 0.8rem;
          color: #EF4444;
          font-weight: 500;
        }
        .contact__submit {
          width: 100%;
          justify-content: center;
          padding: 0.9rem;
          font-size: var(--text-base);
          margin-top: 0.25rem;
        }
        .contact__submit:disabled { opacity: 0.75; cursor: not-allowed; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact__error-banner {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: var(--radius-md);
          padding: 1rem;
          font-size: var(--text-sm);
          color: #B91C1C;
        }
        .contact__error-banner a { color: #B91C1C; text-decoration: underline; font-weight: 600; }
        /* Success */
        .contact__success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 1rem;
          padding: 3rem 1rem;
          flex: 1;
        }
        .contact__success-icon { color: #22C55E; }
        .contact__success h3 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          color: var(--color-deep);
        }
        .contact__success p {
          font-size: var(--text-base);
          color: var(--color-muted);
          max-width: 36ch;
        }
        /* Info card */
        .contact__info-card {
          background: var(--color-deep);
          border-radius: var(--radius-2xl);
          padding: clamp(1.5rem, 3vw, 2rem);
          box-shadow: var(--shadow-deep);
          position: relative;
          overflow: hidden;
        }
        .contact__info-card::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          border-radius: var(--radius-full);
          background: rgba(37,99,235,0.25);
          pointer-events: none;
        }
        .contact__info-title {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: #fff;
          margin-bottom: 1.75rem;
          position: relative;
        }
        .contact__info-items {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
          position: relative;
        }
        .contact__info-item {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          color: var(--color-accent);
        }
        .contact__info-item > svg { flex-shrink: 0; margin-top: 2px; }
        .contact__info-item div {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .contact__info-item strong {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
        }
        .contact__info-item span,
        .contact__info-item a {
          font-size: var(--text-sm);
          color: var(--color-on-dark);
          transition: color var(--t-fast);
        }
        .contact__info-item a:hover { color: var(--color-accent); }
        .contact__badges { position: relative; }
        .contact__badges h4 {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 1rem;
        }
        .contact__badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.82);
          font-weight: 500;
        }
        .contact__badge:last-child { border-bottom: none; }
        .contact__badge svg { color: #4ADE80; flex-shrink: 0; }
      `}</style>
    </section>
  )
}
