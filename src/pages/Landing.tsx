import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Shield, TrendingUp, CheckCircle, ChevronRight, Star } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const logos = ['Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Loom', 'Clerk']

const features = [
  {
    icon: Brain,
    title: 'Deep Business Analysis',
    desc: 'Our AI processes your inputs against 50M+ data points, surfacing insights a team of analysts would take weeks to produce.',
    tags: ['NLP', 'Pattern Recognition', 'Benchmarks'],
  },
  {
    icon: TrendingUp,
    title: 'Revenue Forecasting',
    desc: 'Model your growth trajectory with scenario planning built in. Adjust assumptions in real time and see projections update instantly.',
    tags: ['Monte Carlo', 'Seasonality', 'Sensitivity'],
  },
  {
    icon: Shield,
    title: 'Competitive Intelligence',
    desc: 'Know where you stand. Analytica maps your position against competitors, identifies gaps, and ranks strategic opportunities.',
    tags: ['Market Mapping', 'SWOT', 'Positioning'],
  },
]

const pricing = [
  {
    name: 'Free',
    price: '0',
    desc: 'Get started with AI-powered insights.',
    cta: 'Start free',
    features: ['5 analyses / month', 'Core metrics', 'Export to PDF', 'Email support'],
    accent: false,
  },
  {
    name: 'Pro',
    price: '49',
    desc: 'For growing teams that need more depth.',
    cta: 'Start Pro trial',
    features: ['Unlimited analyses', 'Advanced forecasting', 'Competitor tracking', 'API access', 'Priority support'],
    accent: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: '199',
    desc: 'Custom workflows and dedicated support.',
    cta: 'Contact sales',
    features: ['Everything in Pro', 'Custom integrations', 'SSO / SAML', 'SLA guarantee', 'Dedicated CSM'],
    accent: false,
  },
]

function HeroGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{
        position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', top: '200px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(129,140,248,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />
    </div>
  )
}

function MockDashboard() {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{
      background: '#1a1a1f',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
    }}>
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        <div className="flex-1 mx-4 h-5 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>
      <div className="p-5 grid grid-cols-3 gap-3">
        {[
          { label: 'Revenue Score', val: '94', delta: '+12%', color: '#6366f1' },
          { label: 'Market Fit', val: '87', delta: '+6%', color: '#22d3ee' },
          { label: 'Growth Index', val: '73', delta: '+18%', color: '#a78bfa' },
        ].map(m => (
          <div key={m.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: '10px', color: '#71717a', marginBottom: '4px' }}>{m.label}</p>
            <p style={{ fontSize: '22px', fontWeight: 700, color: m.color }}>{m.val}</p>
            <p style={{ fontSize: '10px', color: '#22d3ee' }}>{m.delta}</p>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '11px', color: '#71717a', marginBottom: '10px' }}>Growth trajectory — 6mo forecast</p>
          <div className="flex items-end gap-1.5" style={{ height: '60px' }}>
            {[30, 38, 35, 50, 48, 62, 58, 75, 80, 88, 85, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{
                height: `${h}%`,
                background: i >= 6
                  ? 'linear-gradient(180deg, #6366f1, #818cf8)'
                  : 'rgba(99,102,241,0.25)',
                opacity: i >= 6 ? 1 : 0.6,
              }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: '9px', color: '#52525b' }}>Jan</span>
            <span style={{ fontSize: '9px', color: '#52525b' }}>Forecast →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto">
      {submitted ? (
        <div className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl" style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' }}>
          <CheckCircle size={16} style={{ color: '#6366f1' }} />
          <span className="text-sm font-medium" style={{ color: '#818cf8' }}>You're on the list — we'll be in touch!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your work email"
            required
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f4f4f5' }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff' }}>
            Get early access
          </button>
        </form>
      )}
    </div>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    let start = 0
    const step = target / 50
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 30)
    return () => clearInterval(timer)
  }, [target])

  return <>{val.toLocaleString()}{suffix}</>
}

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f11' }}>
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden">
        <HeroGradient />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
            <Star size={11} fill="currentColor" />
            <span>Now in beta — free for the first 500 teams</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: '#f4f4f5' }}>
            AI intelligence that{' '}
            <span className="shimmer-text">drives growth</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: '#71717a' }}>
            Paste in your business context. Get a full strategic analysis, revenue forecast, and competitive map — in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link to="/analyze"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', boxShadow: '0 0 30px rgba(99,102,241,0.3)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 40px rgba(99,102,241,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(99,102,241,0.3)' }}>
              Start free analysis <ArrowRight size={15} />
            </Link>
            <a href="#features" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
              style={{ color: '#a1a1aa', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = '#f4f4f5' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#a1a1aa' }}>
              See how it works <ChevronRight size={15} />
            </a>
          </div>

          {/* Dashboard preview */}
          <div className="max-w-2xl mx-auto">
            <MockDashboard />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-10 px-4 sm:px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs uppercase tracking-widest mb-6" style={{ color: '#52525b' }}>Trusted by fast-growing teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {logos.map(l => (
              <span key={l} className="text-sm font-semibold" style={{ color: '#3f3f46' }}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: 12000, suffix: '+', label: 'Analyses run' },
            { val: 98, suffix: '%', label: 'Accuracy score' },
            { val: 47, suffix: 's', label: 'Avg. time to insight' },
            { val: 4.9, suffix: '/5', label: 'User rating' },
          ].map(s => (
            <div key={s.label} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-3xl font-bold mb-1" style={{ color: '#f4f4f5' }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </p>
              <p className="text-xs" style={{ color: '#71717a' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#6366f1' }}>What you get</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f4f4f5' }}>Intelligence at every layer</h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: '#71717a' }}>
              Three core engines working together to give you a complete picture of your business.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <div key={f.title} className={`grid md:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <div className="p-8 rounded-2xl card-glow transition-all" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(99,102,241,0.12)' }}>
                    <f.icon size={20} style={{ color: '#818cf8' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#f4f4f5' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#71717a' }}>{f.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', minHeight: '220px' }}>
                  <div className="w-full">
                    {i === 0 && <BrainViz />}
                    {i === 1 && <ChartViz />}
                    {i === 2 && <MapViz />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture CTA */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center p-12 rounded-3xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#f4f4f5' }}>Get early access</h2>
          <p className="text-sm mb-8" style={{ color: '#71717a' }}>Join teams already using Analytica to make smarter decisions, faster.</p>
          <EmailCapture />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#6366f1' }}>Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f4f4f5' }}>Simple, honest pricing</h2>
            <p className="text-sm" style={{ color: '#71717a' }}>No surprises. No seat fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map(p => (
              <div key={p.name} className="relative p-7 rounded-2xl card-glow transition-all"
                style={{
                  background: p.accent ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(129,140,248,0.06))' : '#1a1a1f',
                  border: p.accent ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.07)',
                }}>
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff' }}>
                    {p.badge}
                  </span>
                )}
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#71717a' }}>{p.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold" style={{ color: '#f4f4f5' }}>${p.price}</span>
                  <span className="text-sm mb-1.5" style={{ color: '#71717a' }}>/mo</span>
                </div>
                <p className="text-sm mb-6" style={{ color: '#71717a' }}>{p.desc}</p>
                <ul className="flex flex-col gap-2.5 mb-7">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#a1a1aa' }}>
                      <CheckCircle size={14} style={{ color: p.accent ? '#818cf8' : '#6366f1', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/analyze"
                  className="block text-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: p.accent ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(255,255,255,0.05)',
                    color: p.accent ? '#fff' : '#a1a1aa',
                    border: p.accent ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    textDecoration: 'none',
                  }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function BrainViz() {
  return (
    <div className="flex flex-col gap-2.5">
      {['Identifying market patterns', 'Scoring competitive moat', 'Mapping revenue drivers', 'Generating recommendations'].map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <CheckCircle size={10} style={{ color: '#818cf8' }} />
          </div>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="h-full rounded-full" style={{ width: `${[95, 82, 76, 60][i]}%`, background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
          </div>
          <span style={{ fontSize: '10px', color: '#52525b', width: '28px', textAlign: 'right' }}>{[95, 82, 76, 60][i]}%</span>
        </div>
      ))}
      <p style={{ fontSize: '10px', color: '#6366f1', marginTop: '6px' }}>Analysis complete in 34s</p>
    </div>
  )
}

function ChartViz() {
  const data = [20, 35, 28, 45, 55, 50, 70, 80, 75, 90, 88, 100]
  return (
    <div>
      <div className="flex items-end gap-1" style={{ height: '80px' }}>
        {data.map((h, i) => (
          <div key={i} className="flex-1 rounded-t transition-all" style={{
            height: `${h}%`,
            background: i >= 6 ? 'linear-gradient(180deg, #6366f1 0%, #818cf8 100%)' : 'rgba(99,102,241,0.2)',
          }} />
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <span style={{ fontSize: '9px', color: '#52525b' }}>6 months ago</span>
        <span style={{ fontSize: '9px', color: '#6366f1' }}>Projected ↗</span>
      </div>
      <div className="mt-3 p-2.5 rounded-lg" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p style={{ fontSize: '10px', color: '#818cf8' }}>+127% projected revenue growth over 12 months</p>
      </div>
    </div>
  )
}

function MapViz() {
  const items = [
    { name: 'Your company', x: 65, y: 35, size: 14, color: '#6366f1', you: true },
    { name: 'Competitor A', x: 25, y: 60, size: 10, color: '#71717a', you: false },
    { name: 'Competitor B', x: 55, y: 70, size: 8, color: '#71717a', you: false },
    { name: 'Competitor C', x: 80, y: 65, size: 7, color: '#71717a', you: false },
  ]
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height: '140px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ position: 'absolute', top: 8, left: 8, fontSize: '9px', color: '#52525b' }}>Market positioning map</p>
      {items.map(it => (
        <div key={it.name} style={{ position: 'absolute', left: `${it.x}%`, top: `${it.y}%`, transform: 'translate(-50%, -50%)' }}>
          <div style={{
            width: it.size, height: it.size, borderRadius: '50%',
            background: it.color,
            opacity: it.you ? 1 : 0.4,
            boxShadow: it.you ? '0 0 16px rgba(99,102,241,0.5)' : 'none',
          }} />
          {it.you && <p style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: '#818cf8', whiteSpace: 'nowrap', marginTop: '3px' }}>You</p>}
        </div>
      ))}
      <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
        <span style={{ fontSize: '9px', color: '#52525b' }}>← Value</span>
      </div>
      <div style={{ position: 'absolute', top: 8, right: 8 }}>
        <span style={{ fontSize: '9px', color: '#52525b' }}>Price →</span>
      </div>
    </div>
  )
}
