import { Suspense, lazy } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'

// Below-fold components are lazy loaded for faster initial LCP
const Services     = lazy(() => import('./components/Services'))
const WhyUs        = lazy(() => import('./components/WhyUs'))
const Gallery      = lazy(() => import('./components/Gallery'))
const Process      = lazy(() => import('./components/Process'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTABanner    = lazy(() => import('./components/CTABanner'))
const Contact      = lazy(() => import('./components/Contact'))
const Footer       = lazy(() => import('./components/Footer'))

function SectionSkeleton() {
  return <div className="section-skeleton" aria-hidden="true" />
}

export default function App() {
  return (
    <ErrorBoundary>
      {/* Navbar is not lazy — it must render immediately above the fold */}
      <Navbar />

      <main>
        {/* Hero + Stats are not lazy — critical above-fold content */}
        <Hero />
        <Stats />

        {/* All below-fold sections lazy loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          <ErrorBoundary>
            <Services />
          </ErrorBoundary>
          <ErrorBoundary>
            <WhyUs />
          </ErrorBoundary>
          <ErrorBoundary>
            <Gallery />
          </ErrorBoundary>
          <ErrorBoundary>
            <Process />
          </ErrorBoundary>
          <ErrorBoundary>
            <Testimonials />
          </ErrorBoundary>
          <ErrorBoundary>
            <CTABanner />
          </ErrorBoundary>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ErrorBoundary>
  )
}
