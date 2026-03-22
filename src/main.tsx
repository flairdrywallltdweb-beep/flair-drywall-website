import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found in DOM')

createRoot(root).render(
  <StrictMode>
    {/* LazyMotion with domAnimation reduces Framer Motion bundle from ~150kb → ~18kb */}
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </StrictMode>
)
