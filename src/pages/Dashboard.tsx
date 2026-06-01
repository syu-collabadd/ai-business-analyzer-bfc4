import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Target, AlertTriangle, Lightbulb, DollarSign, ArrowUpRight, ArrowDownRight, BarChart2, ChevronRight, Download, RefreshCw, Zap } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// --- mock AI output generator ---
function generateInsights(form: Record<string, unknown>) {
  const industry = (form.industry as string) || 'SaaS'
  const mrr = Number(form.mrr) || 15000
  const employees = Number(form.employees) || 10

  const revenueScore = Math.min(95, Math.round(55 + (mrr / 5000) * 5 + Math.random() * 8))
  const marketFit = Math.min(98, Math.round(60 + Math.random() * 25))
  const riskScore = Math.min(100, Math.round(40 + Math.random() * 35))
  const growthIdx = Math.min(98, Math.round(65 + Math.random() * 25))
  const arr = mrr * 12
  const forecastArr = Math.round(arr * (1.3 + Math.random() * 0.5))
  const ltv = Math.round(mrr / employees * 8 + Math.random() * 500)
  const cac = Math.round(ltv / (3 + Math.random() * 2))

  const recs = [
    `Expand ${industry === 'E-commerce' ? 'paid acquisition' : 'content-led growth'} — strongest ROI signal detected`,
    'Improve onboarding: 23% of trial users drop before activation (industry avg: 14%)',
    'Introduce annual pricing: models show +18% revenue uplift at current conversion rate',
    'Target mid-market ICP — best fit for your pricing tier and team size',
    `Reduce dependency on ${industry === 'E-commerce' ? 'Google Ads' : 'inbound'} — single-channel risk detected`,
    'Launch a referral program: NPS indicators suggest strong advocate base',
    'Prioritize churn reduction: 1pp improvement worth ~$' + Math.round(mrr * 0.12).toLocaleString() + '/mo',
  ]

  return { revenueScore, marketFit, riskScore, growthIdx, arr, forecastArr, ltv, cac, recs }
}

// --- Revenue calculator ---
function RevenueCalculator({ baseMrr }: { baseMrr: number }) {
  const [mrr, setMrr] = useState(baseMrr || 15000)
  const [growth, setGrowth] = useState(15)
  const [churn, setChurn] = useState(3)
  const [months, setMonths] = useState(12)

  function project(m: number, g: number, c: number, n: number): number[] {
    const vals = [m]
    for (let i = 1; i <= n; i++) {
      vals.push(Math.round(vals[i - 1] * (1 + (g - c) / 100)))
    }
    return vals
  }

  const pts = project(mrr, growth, churn, months)
  const final = pts[pts.length - 1]
  const max = Math.max(...pts)

  const slider = (label: string, val: number, set: (v: number) => void, min: number, max: number, suffix: string) => (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-xs" style={{ color: '#a1a1aa' }}>{label}</label>
        <span className="text-xs font-medium" style={{ color: '#818cf8' }}>{val}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} value={val}
        onChange={e => set(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#6366f1', background: `linear-gradient(to right, #6366f1 ${((val - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) 0%)` }}
      />
    </div>
  )

  return (
    <div className="p-6 rounded-2xl" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
          <DollarSign size={14} style={{ color: '#818cf8' }} />
        </div>
        <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Revenue Model</p>
        <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>Live</span>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {slider('Starting MRR', mrr, setMrr, 1000, 200000, '')}
        {slider('Monthly growth rate', growth, setGrowth, 1, 50, '%')}
        {slider('Monthly churn rate', churn, setChurn, 0, 20, '%')}
        {slider('Projection period', months, setMonths, 3, 24, ' mo')}
      </div>

      {/* Mini chart */}
      <div className="flex items-end gap-1 mb-4" style={{ height: '80px' }}>
        {pts.map((v, i) => (
          <div key={i} className="flex-1 rounded-t" style={{
            height: `${(v / max) * 100}%`,
            background: i === pts.length - 1
              ? 'linear-gradient(180deg, #6366f1, #818cf8)'
              : `rgba(99,102,241,${0.15 + (i / pts.length) * 0.3})`,
            transition: 'height 0.3s ease',
          }} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '10px', color: '#71717a', marginBottom: '3px' }}>Projected MRR</p>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#f4f4f5' }}>${final.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '10px', color: '#71717a', marginBottom: '3px' }}>Projected ARR</p>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#818cf8' }}>${(final * 12).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, delta, deltaUp, color, sub }: { label: string; value: string; delta?: string; deltaUp?: boolean; color: string; sub?: string }) {
  return (
    <div className="p-5 rounded-2xl card-glow transition-all" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
      <p className="text-xs mb-3" style={{ color: '#71717a' }}>{label}</p>
      <p className="text-2xl font-bold mb-1" style={{ color }}>{value}</p>
      {delta && (
        <div className="flex items-center gap-1">
          {deltaUp ? <ArrowUpRight size={12} style={{ color: '#22d3ee' }} /> : <ArrowDownRight size={12} style={{ color: '#f87171' }} />}
          <span className="text-xs" style={{ color: deltaUp ? '#22d3ee' : '#f87171' }}>{delta}</span>
        </div>
      )}
      {sub && <p className="text-xs mt-1" style={{ color: '#52525b' }}>{sub}</p>}
    </div>
  )
}

function ScoreGauge({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="relative">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle cx="36" cy="36" r="28" fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${(score / 100) * (2 * Math.PI * 28)} ${2 * Math.PI * 28}`}
            strokeLinecap="round" transform="rotate(-90 36 36)" />
          <text x="36" y="40" textAnchor="middle" fill={color} fontSize="14" fontWeight="700">{score}</text>
        </svg>
      </div>
      <p style={{ fontSize: '11px', color: '#71717a', textAlign: 'center' }}>{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const formRaw = sessionStorage.getItem('analytica-form')
  const form = formRaw ? JSON.parse(formRaw) : {}
  const [insights, setInsights] = useState(() => generateInsights(form))
  const [refreshing, setRefreshing] = useState(false)

  const refresh = () => {
    setRefreshing(true)
    setTimeout(() => { setInsights(generateInsights(form)); setRefreshing(false) }, 800)
  }

  const name = form.name || 'Your Business'
  const mrr = Number(form.mrr) || 15000

  const risks = [
    { label: 'Revenue concentration', level: 'Medium', color: '#f59e0b' },
    { label: 'Single-channel acquisition', level: 'Medium', color: '#f59e0b' },
    { label: 'Churn above category avg.', level: 'Low', color: '#22d3ee' },
    { label: 'Pricing power', level: 'Low', color: '#22d3ee' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f11' }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
                <Zap size={12} style={{ color: '#818cf8' }} />
              </div>
              <p className="text-xs" style={{ color: '#71717a' }}>Analytica Report · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#f4f4f5' }}>{name}</h1>
            <p className="text-sm" style={{ color: '#71717a' }}>{form.industry || 'SaaS'} · {form.stage || 'Growth stage'}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refresh}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' }}>
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
              <Download size={12} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Score gauges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <ScoreGauge label="Revenue Score" score={insights.revenueScore} color="#6366f1" />
          <ScoreGauge label="Market Fit" score={insights.marketFit} color="#22d3ee" />
          <ScoreGauge label="Risk Score" score={insights.riskScore} color="#f59e0b" />
          <ScoreGauge label="Growth Index" score={insights.growthIdx} color="#a78bfa" />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Annual Run Rate" value={`$${(mrr * 12).toLocaleString()}`} delta="+23% YoY" deltaUp color="#f4f4f5" />
          <MetricCard label="12-mo Forecast ARR" value={`$${insights.forecastArr.toLocaleString()}`} delta="AI projected" deltaUp color="#818cf8" />
          <MetricCard label="Est. LTV" value={`$${insights.ltv.toLocaleString()}`} sub="per customer" color="#22d3ee" />
          <MetricCard label="Est. CAC" value={`$${insights.cac.toLocaleString()}`} delta={`LTV/CAC: ${Math.round(insights.ltv / insights.cac)}x`} deltaUp color="#a78bfa" />
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">

          {/* Revenue model (spans 2 cols) */}
          <div className="md:col-span-2">
            <RevenueCalculator baseMrr={mrr} />
          </div>

          {/* Risk panel */}
          <div className="p-6 rounded-2xl" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.12)' }}>
                <AlertTriangle size={14} style={{ color: '#f59e0b' }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Risk Vectors</p>
            </div>
            <div className="flex flex-col gap-3">
              {risks.map(r => (
                <div key={r.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-xs" style={{ color: '#a1a1aa' }}>{r.label}</p>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${r.color}18`, color: r.color }}>{r.level}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.12)' }}>
              <p style={{ fontSize: '11px', color: '#818cf8' }}>Overall risk profile: <strong>Moderate</strong></p>
              <p style={{ fontSize: '10px', color: '#71717a', marginTop: '2px' }}>2 areas to address in next 90 days</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-6 rounded-2xl mb-6" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.12)' }}>
              <Lightbulb size={14} style={{ color: '#a78bfa' }} />
            </div>
            <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Strategic Recommendations</p>
            <span className="ml-auto text-xs" style={{ color: '#52525b' }}>Ranked by impact</span>
          </div>
          <div className="flex flex-col gap-2">
            {insights.recs.map((r, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl transition-all group cursor-default" style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)' }}>
                <span className="text-xs font-bold mt-0.5 flex-shrink-0" style={{ color: i < 3 ? '#6366f1' : '#52525b' }}>#{i + 1}</span>
                <p className="text-sm flex-1" style={{ color: '#d4d4d8' }}>{r}</p>
                <ChevronRight size={14} className="flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#6366f1' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Competitive summary */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,211,238,0.1)' }}>
                <Target size={14} style={{ color: '#22d3ee' }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>ICP Profile</p>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { k: 'Company size', v: '20–150 employees' },
                { k: 'Verticals', v: form.industry || 'SaaS, Marketplace' },
                { k: 'Decision maker', v: 'Head of Growth / CEO' },
                { k: 'Avg. deal size', v: `$${Math.round(mrr / 30).toLocaleString()}/mo` },
                { k: 'Sales cycle', v: '14–21 days' },
              ].map(row => (
                <div key={row.k} className="flex justify-between text-sm">
                  <span style={{ color: '#71717a' }}>{row.k}</span>
                  <span style={{ color: '#d4d4d8' }}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
                <BarChart2 size={14} style={{ color: '#818cf8' }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Market Position</p>
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ height: '130px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              {[
                { x: 65, y: 30, size: 14, you: true, label: name },
                { x: 20, y: 58, size: 10, you: false, label: 'Competitor A' },
                { x: 50, y: 72, size: 8, you: false, label: '' },
                { x: 78, y: 65, size: 7, you: false, label: '' },
                { x: 38, y: 40, size: 6, you: false, label: '' },
              ].map((it, i) => (
                <div key={i} style={{ position: 'absolute', left: `${it.x}%`, top: `${it.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <div style={{
                    width: it.size, height: it.size, borderRadius: '50%',
                    background: it.you ? '#6366f1' : '#3f3f46',
                    boxShadow: it.you ? '0 0 14px rgba(99,102,241,0.6)' : 'none',
                  }} />
                  {it.label && <p style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', fontSize: '7px', color: it.you ? '#818cf8' : '#52525b', whiteSpace: 'nowrap', marginTop: '2px' }}>{it.label}</p>}
                </div>
              ))}
              <p style={{ position: 'absolute', bottom: 6, left: 6, fontSize: '8px', color: '#3f3f46' }}>← Value</p>
              <p style={{ position: 'absolute', top: 6, right: 6, fontSize: '8px', color: '#3f3f46' }}>Price →</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center p-8 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <p className="font-semibold mb-2" style={{ color: '#f4f4f5' }}>Want to go deeper?</p>
          <p className="text-sm mb-5" style={{ color: '#71717a' }}>Run another analysis, update your inputs, or share this report with your team.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/analyze"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', textDecoration: 'none' }}>
              Run new analysis <ArrowUpRight size={14} />
            </Link>
            <Link to="/"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa', textDecoration: 'none' }}>
              Back to home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
