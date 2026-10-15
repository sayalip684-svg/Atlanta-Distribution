import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, Phone } from 'lucide-react'
import { categories, brands } from '../data/products'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [brandsOpen, setBrandsOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setBrandsOpen(false)
    setCatsOpen(false)
  }, [location])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`} style={{ backgroundColor: '#0F2C59' }}>
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><Phone size={11} /><a href="tel:+14045550199" className="hover:text-white transition-colors">+1 (404) 555-0199</a></span>
            <span className="hidden sm:inline">Serving GA · FL · SC · NC · TN · AL</span>
          </div>
          <div className="bg-[#0F2C59] text-white text-xs py-2 px-4 border-b border-white/10">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <div>+1 (404) 555-0199 | Serving GA · FL · SC · NC · TN · AL</div>
    {/* The B2B link has been removed */}
  </div>
</div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#E67E22' }}>AD</div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-base leading-tight tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Atlanta Distributors</div>
            <div className="text-white/50 text-[10px] tracking-widest uppercase">Premium Indian Food & FMCG</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-6">
          {/* Brands dropdown */}
          <div className="relative" onMouseEnter={() => setBrandsOpen(true)} onMouseLeave={() => setBrandsOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
              Brands <ChevronDown size={14} className={`transition-transform ${brandsOpen ? 'rotate-180' : ''}`} />
            </button>
            {brandsOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl p-4 w-64 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Authorized Brands</p>
                {brands.map(b => (
                  <Link key={b.id} to={`/catalog/${b.id}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#0F2C59' }}>{b.name[0]}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">{b.name}</div>
                      <div className="text-xs text-gray-400">{b.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Categories dropdown */}
          <div className="relative" onMouseEnter={() => setCatsOpen(true)} onMouseLeave={() => setCatsOpen(false)}>
            <button className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
              Categories <ChevronDown size={14} className={`transition-transform ${catsOpen ? 'rotate-180' : ''}`} />
            </button>
            {catsOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl p-4 w-64 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Product Categories</p>
                {categories.map(c => (
                  <Link key={c.id} to={`/catalog?cat=${c.id}`} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors group">
                    <span className="text-xl">{c.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.count} SKUs</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/catalog" className="px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
            Catalog
          </Link>
          <Link to="/wholesale" className="px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
            Wholesale
          </Link>
          <Link to="/wholesale" className="px-3 py-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all">
            Contact
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-xs lg:max-w-sm ml-auto lg:ml-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search SKUs, brands, categories…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/wholesale"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
          style={{ backgroundColor: '#E67E22' }}
        >
          Become a Partner
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-dark" style={{ backgroundColor: '#0a1f40' }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Brands</p>
            {brands.map(b => (
              <Link key={b.id} to={`/catalog/${b.id}`} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm">
                <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold">{b.name[0]}</span>
                {b.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">Navigation</p>
            <Link to="/catalog" className="px-3 py-2.5 text-white/80 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors">Full Catalog</Link>
            <Link to="/wholesale" className="px-3 py-2.5 text-white/80 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors">Wholesale Inquiry</Link>
            <Link to="/wholesale" className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: '#E67E22' }}>Become a Partner</Link>
          </div>
        </div>
      )}
    </header>
  )
}
