import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const col = (label: string, links: string[]) => (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#52525b' }}>{label}</p>
      <ul className="flex flex-col gap-2">
        {links.map(l => (
          <li key={l}><a href="#" className="text-sm transition-colors" style={{ color: '#71717a', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#a1a1aa')}
            onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>{l}</a></li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer style={{ background: '#0f0f11', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-3" style={{ textDecoration: 'none' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="font-semibold text-sm" style={{ color: '#f4f4f5' }}>Analytica</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#71717a' }}>
            AI-powered business intelligence for modern teams. Turn data into strategy in seconds.
          </p>
        </div>
        {col('Product', ['Features', 'Pricing', 'Changelog', 'Roadmap'])}
        {col('Company', ['About', 'Blog', 'Careers', 'Press'])}
        {col('Legal', ['Privacy', 'Terms', 'Security', 'Cookies'])}
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: '#52525b' }}>© 2026 Analytica. All rights reserved.</p>
        <p className="text-xs" style={{ color: '#52525b' }}>Built with Burrow</p>
      </div>
    </footer>
  )
}
