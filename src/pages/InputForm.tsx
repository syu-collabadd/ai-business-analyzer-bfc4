import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Globe, ChevronDown } from 'lucide-react'
import Nav from '../components/Nav'

const industries = ['SaaS / Software', 'E-commerce', 'Marketplace', 'Agency / Services', 'FinTech', 'HealthTech', 'Media / Content', 'Hardware / Physical', 'Other']
const stages = ['Idea / Pre-revenue', 'Early stage ($0–$10K MRR)', 'Growth ($10K–$100K MRR)', 'Scale ($100K+ MRR)', 'Enterprise']
const goals = ['Grow revenue', 'Raise funding', 'Expand to new market', 'Improve retention', 'Cut costs', 'Launch new product', 'Beat competition']

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: '#d4d4d8' }}>{label}</label>
      {hint && <p className="text-xs" style={{ color: '#71717a' }}>{hint}</p>}
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-10 rounded-xl text-sm appearance-none outline-none transition-all cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: value ? '#f4f4f5' : '#71717a',
        }}
        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)' }}
        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
        <option value="" disabled style={{ background: '#1a1a1f' }}>{placeholder}</option>
        {options.map(o => <option key={o} value={o} style={{ background: '#1a1a1f', color: '#f4f4f5' }}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#71717a' }} />
    </div>
  )
}

function ToggleGroup({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (o: string) => {
    if (value.includes(o)) onChange(value.filter(x => x !== o))
    else if (value.length < 3) onChange([...value, o])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const active = value.includes(o)
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: active ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
              border: active ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
              color: active ? '#818cf8' : '#71717a',
            }}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f4f4f5' }}
      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)' }}
      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
    />
  )
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f4f4f5' }}
      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)' }}
      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
    />
  )
}

export default function InputForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    industry: '',
    stage: '',
    mrr: '',
    employees: '',
    description: '',
    goals: [] as string[],
    website: '',
  })

  const set = (k: keyof typeof form) => (v: string | string[]) => setForm(f => ({ ...f, [k]: v }))

  const isValid = form.name && form.industry && form.stage && form.description && form.goals.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    sessionStorage.setItem('analytica-form', JSON.stringify(form))
    navigate('/analyzing')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f11' }}>
      <Nav />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6366f1' }}>Step 1 of 1</p>
          <h1 className="text-3xl font-bold mb-3" style={{ color: '#f4f4f5' }}>Tell us about your business</h1>
          <p className="text-sm" style={{ color: '#71717a' }}>The more context you share, the sharper the analysis. Takes about 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="p-6 rounded-2xl flex flex-col gap-6" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
                <Building2 size={16} style={{ color: '#818cf8' }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Company basics</p>
            </div>
            <Field label="Company / Project name">
              <TextInput value={form.name} onChange={set('name')} placeholder="e.g. Acme Corp" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Industry">
                <Select value={form.industry} onChange={set('industry') as (v: string) => void} options={industries} placeholder="Select industry" />
              </Field>
              <Field label="Company stage">
                <Select value={form.stage} onChange={set('stage') as (v: string) => void} options={stages} placeholder="Select stage" />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Monthly revenue (USD)" hint="Leave blank if pre-revenue">
                <TextInput value={form.mrr} onChange={set('mrr') as (v: string) => void} placeholder="e.g. 25000" type="number" />
              </Field>
              <Field label="Team size">
                <TextInput value={form.employees} onChange={set('employees') as (v: string) => void} placeholder="e.g. 12" type="number" />
              </Field>
            </div>
          </div>

          <div className="p-6 rounded-2xl flex flex-col gap-6" style={{ background: '#1a1a1f', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.12)' }}>
                <Globe size={16} style={{ color: '#818cf8' }} />
              </div>
              <p className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Context & goals</p>
            </div>
            <Field label="Describe your business" hint="What do you do, who is your customer, and what makes you different?">
              <Textarea value={form.description} onChange={set('description') as (v: string) => void}
                placeholder="e.g. We build project management software for design agencies. Our core differentiator is real-time client collaboration built in from day one..." />
            </Field>
            <Field label="Top priorities right now" hint="Pick up to 3 goals">
              <ToggleGroup options={goals} value={form.goals} onChange={set('goals') as (v: string[]) => void} />
            </Field>
            <Field label="Website (optional)">
              <TextInput value={form.website} onChange={set('website') as (v: string) => void} placeholder="https://yourcompany.com" />
            </Field>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: isValid ? 'linear-gradient(135deg, #6366f1, #818cf8)' : 'rgba(255,255,255,0.06)',
              color: isValid ? '#fff' : '#52525b',
              cursor: isValid ? 'pointer' : 'not-allowed',
              boxShadow: isValid ? '0 0 30px rgba(99,102,241,0.25)' : 'none',
            }}>
            Run AI analysis <ArrowRight size={16} />
          </button>
          {!isValid && (
            <p className="text-center text-xs" style={{ color: '#52525b' }}>Fill in the required fields to continue</p>
          )}
        </form>
      </div>
    </div>
  )
}
