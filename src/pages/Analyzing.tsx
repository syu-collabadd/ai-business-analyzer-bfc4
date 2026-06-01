import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

const steps = [
  { label: 'Parsing business context', duration: 1200 },
  { label: 'Benchmarking against 50M+ data points', duration: 1800 },
  { label: 'Mapping competitive landscape', duration: 1500 },
  { label: 'Modeling revenue scenarios', duration: 1600 },
  { label: 'Generating strategic recommendations', duration: 1400 },
  { label: 'Finalizing report', duration: 800 },
]

const total = steps.reduce((a, s) => a + s.duration, 0)

export default function Analyzing() {
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let elapsed = 0
    const tick = setInterval(() => {
      elapsed += 50
      setProgress(Math.min((elapsed / total) * 100, 100))
      let acc = 0
      for (let i = 0; i < steps.length; i++) {
        acc += steps[i].duration
        if (elapsed < acc) { setStepIndex(i); break }
        if (i === steps.length - 1) setStepIndex(i)
      }
      if (elapsed >= total) {
        clearInterval(tick)
        setProgress(100)
        setDone(true)
      }
    }, 50)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => navigate('/results'), 600)
      return () => clearTimeout(t)
    }
  }, [done, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: '#0f0f11' }}>
      {/* Pulsing orb */}
      <div className="relative flex items-center justify-center mb-12">
        <div className="absolute w-32 h-32 rounded-full animate-pulse-ring" style={{ background: 'rgba(99,102,241,0.15)' }} />
        <div className="absolute w-24 h-24 rounded-full" style={{ background: 'rgba(99,102,241,0.08)', animationDelay: '0.4s', animation: 'pulse-ring 1.4s ease-out 0.4s infinite' }} />
        <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center animate-spin-slow"
          style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
          <Zap size={26} className="text-white" fill="white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#f4f4f5' }}>Analyzing your business</h2>
      <p className="text-sm mb-10 text-center" style={{ color: '#71717a' }}>Our AI is running deep analysis. This takes about 10 seconds.</p>

      {/* Progress bar */}
      <div className="w-full max-w-sm mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs" style={{ color: '#71717a' }}>Processing…</span>
          <span className="text-xs font-medium" style={{ color: '#818cf8' }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
        </div>
      </div>

      {/* Steps list */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {steps.map((s, i) => {
          const state = i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'pending'
          return (
            <div key={s.label} className="flex items-center gap-3 transition-all">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: state === 'done' ? 'rgba(99,102,241,0.25)' : state === 'active' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  border: state === 'active' ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                {state === 'done' && <span style={{ fontSize: '9px', color: '#818cf8' }}>✓</span>}
                {state === 'active' && <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#818cf8', animation: 'pulse 1s ease-in-out infinite' }} />}
              </div>
              <span className="text-sm transition-all" style={{
                color: state === 'done' ? '#52525b' : state === 'active' ? '#f4f4f5' : '#3f3f46',
                fontWeight: state === 'active' ? 500 : 400,
              }}>{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
