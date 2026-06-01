import { Link, useLocation } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Nav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLanding = location.pathname === '/'

  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ background: 'rgba(15,15,17,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 group" style={{ textDecoration: 'none' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="font-semibold text-sm tracking-tight" style={{ color: '#f4f4f5' }}>Analytica</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isLanding && (
            <>
              <a href="#features" className="text-sm transition-colors" style={{ color: '#71717a', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f4f4f5')}
                onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>Features</a>
              <a href="#pricing" className="text-sm transition-colors" style={{ color: '#71717a', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f4f4f5')}
                onMouseLeave={e => (e.currentTarget.style.color = '#71717a')}>Pricing</a>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/analyze"
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
            Get started
          </Link>
          <button className="md:hidden p-1.5" style={{ color: '#71717a' }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {isLanding && (
            <>
              <a href="#features" className="text-sm py-2" style={{ color: '#a1a1aa', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Features</a>
              <a href="#pricing" className="text-sm py-2" style={{ color: '#a1a1aa', textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>Pricing</a>
            </>
          )}
          <Link to="/analyze" className="text-sm py-2 px-4 rounded-lg text-center font-medium"
            style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)', color: '#fff', textDecoration: 'none' }}
            onClick={() => setMobileOpen(false)}>
            Get started
          </Link>
        </div>
      )}
    </header>
  )
}
