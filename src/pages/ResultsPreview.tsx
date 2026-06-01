import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, TrendingUp, Target, AlertTriangle, Lightbulb, BarChart2 } from 'lucide-react'
import Nav from '../components/Nav'

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 30
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 36 36)" style={{ transition: 'stroke-dasharray 1s ease' }} />
      <text x="36" y="40" textAnchor="middle" fill={color} fontSize="13" fontWeight="700">{score}</text>
    </svg>
  )
}

const previewCards = [
  {
    icon: TrendingUp,
    title: 'Revenue Outlook',
    score: 87,
    color: '#6366f1',
    teaser: 'Strong signals across pricing, retention and expansion levers. Top opportunity identified in...',
  },
  {
    icon: Target,
    title: 'Market Fit Score',
    score: 74,
    color: '#22d3ee',
    teaser: 'Product-market alignment is solid. Three ICP segments showing highest intent, including...',
  },
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    score: 62,
    color: '#f59e0b',
    teaser: 'Two moderate-risk vectors detected. Churn concentration and dependency on a single channel...',
  },
  {
    icon: Lightbulb,
    title: 'Growth Playbook',
    score: 91,
    color: '#a78bfa',
    teaser: '7 high-confidence actions ranked by impact. The top move could unlock 30% more revenue by...',
  },
]

function BlurCard({ card }: { card: typeof previewCards[0] }) {
  return (
    <div className="relative p-6 rounded-2xl overflow-hidden card-glow transition-all group" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.1)' }}>
            <card.icon size={17} style={{ color: card.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#f4f4f5' }}>{card.title}</p>
          </div>
        </div>
        <ScoreRing score={card.score} color={card.color} />
      </div>
      <p className="text-sm leading-relaxed" style={{ color: '#71717a' }}>{card.teaser}</p>
      {/* Blur overlay */}
      <div className="absolute inset-x-0 bottom-0 h-16 flex items-end justify-center pb-3"
        style={{ background: 'linear-gradient(to top, #1a1a1f 60%, transparent)' }}>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: '#52525b' }}>
          <Lock size={11} />
          <span>Unlock full report</span>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPreview() {
  const navigate = useNavigate()
  const formRaw = sessionStorage.getItem('analytica-form')
  const form = formRaw ? JSON.parse(formRaw) as { name: string; industry: string; stage: string } : null

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f11' }}>
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
            <BarChart2 size={12} />
            Analysis complete — {form?.name ?? 'Your business'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#f4f4f5' }}>Your results are ready</h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#71717a' }}>
            We found 4 key insight areas for {form ? `${form.industry} at ${form.stage}` : 'your business'}. Preview below — open the full dashboard to see everything.
          </p>
        </div>

        {/* Overall score */}
        <div className="p-6 rounded-2xl mb-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(129,140,248,0.05))', border: '1px solid rgba(99,102,241,0.2)' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#71717a' }}>Overall Business Health</p>
          <p className="text-6xl font-bold mb-2" style={{ color: '#818cf8' }}>78</p>
          <p className="text-sm" style={{ color: '#71717a' }}>/ 100 — Strong foundation with clear growth levers</p>
          <div className="mt-4 h-1.5 rounded-full overflow-hidden mx-auto max-w-xs" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full" style={{ width: '78%', background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
          </div>
        </div>

        {/* Preview cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {previewCards.map(c => <BlurCard key={c.title} card={c} />)}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl text-center" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="text-lg font-bold mb-2" style={{ color: '#f4f4f5' }}>Unlock the full strategic report</p>
          <p className="text-sm mb-6" style={{ color: '#71717a' }}>
            Get every metric, recommendation, and action — plus the revenue model you can edit live.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center justify-center gap-2 mx-auto px-8 py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 40px rgba(99,102,241,0.4)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(99,102,241,0.3)' }}>
            Open full dashboard <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
