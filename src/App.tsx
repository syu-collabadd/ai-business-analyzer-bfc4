import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Landing from './pages/Landing'
import InputForm from './pages/InputForm'
import Analyzing from './pages/Analyzing'
import ResultsPreview from './pages/ResultsPreview'
import Dashboard from './pages/Dashboard'

function AnimatedRoutes() {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [location.pathname])

  return (
    <div ref={ref} style={{ minHeight: '100%' }}>
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/analyze" element={<InputForm />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/results" element={<ResultsPreview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/ai-business-analyzer-bfc4">
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
