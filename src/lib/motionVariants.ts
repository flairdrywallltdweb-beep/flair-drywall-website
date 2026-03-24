import type { Variants } from 'framer-motion'

// Easing curve — matches Material Design's "standard" easing
const ease = [0.22, 1, 0.36, 1] as const

export const fadeInUp: Variants = {
  // y reduced 32→20: smaller translate = less GPU rasterisation area per frame.
  // duration reduced 0.55→0.4: full hero animation sequence now ends at ~0.75s
  // instead of ~1.4s, halving the window where 8+ GPU layers compete with
  // early scroll attempts.
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
}

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease } },
}

export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.6, ease } },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.90 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.5, ease } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.0 } },
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

export const heroEntrance: Variants = {
  // staggerChildren 0.15→0.08, delayChildren 0.25→0.1:
  // Full sequence now completes at 0.1 + (0.08 × 5) + 0.4 = ~0.9s max.
  // Previously: 0.25 + (0.15 × 5) + 0.55 = ~1.55s.
  // Reduces the window where 8+ active GPU compositor layers compete
  // with user scroll attempts on page load.
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
