import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Truck, Award, Package, Phone } from 'lucide-react'
import { categories, brands, products, serviceStates } from '../data/products'
import ProductCard from '../components/ProductCard'

// ── Featured SKU Carousel ─────────────────────────────────────────────────
function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const featured = products.filter(p => p.featured)
  const visible = 3
  const canPrev = index > 0
  const canNext = index < featured.length - visible

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E67E22' }}>Featured SKUs</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              High-Velocity Products
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Top-performing SKUs driving basket size across the Southeast</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all disabled:opacity-30 hover:bg-navy hover:border-navy hover:text-white"
              style={{ borderColor: '#0F2C59', color: '#0F2C59' }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIndex(i => Math.min(featured.length - visible, i + 1))}
              disabled={!canNext}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all disabled:opacity-30 hover:text-white"
              style={{ borderColor: '#0F2C59', color: '#0F2C59', backgroundColor: canNext ? undefined : undefined }}
              onMouseEnter={e => { if (canNext) { e.currentTarget.style.backgroundColor = '#0F2C59' } }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '' }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(index, index + visible).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border-2 transition-all hover:text-white hover:bg-navy"
            style={{ borderColor: '#0F2C59', color: '#0F2C59' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#0F2C59'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#0F2C59' }}
          >
            Browse Full Catalog <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Territory / Who We Serve Block ─────────────────────────────────────────
function TerritoryBlock() {
  const states = serviceStates
  const clientTypes = [
    {  label: 'Indian Grocery Stores', desc: 'Full-shelf solutions with planogram support' },
    { label: 'Indian Restaurants', desc: 'Bulk ingredients & ready-to-cook solutions' },
    { label: 'Ethnic Supermarkets', desc: 'Multi-brand category management' },
    { label: 'Resellers & Wholesalers', desc: 'Competitive case pricing for re-distribution' },
  ]

  return (
    <section className="py-16" style={{ backgroundColor: '#FDF8F0' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E67E22' }}>Distribution Territory</p>
          <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Who We Serve
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm">
            We serve qualified B2B buyers across six Southeastern states with temperature-controlled delivery and dedicated account management.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Service Area Visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=450&fit=crop&auto=format"
                alt="Distribution warehouse and logistics"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(15,44,89,0.85) 0%, transparent 50%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/70 text-xs uppercase tracking-widest mb-3">Service Coverage</p>
                <div className="flex flex-wrap gap-2">
                  {states.map(s => (
                    <span
                      key={s.code}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold ${s.primary ? 'text-white' : 'text-white/80 border border-white/30'}`}
                      style={{ backgroundColor: s.primary ? '#E67E22' : 'rgba(255,255,255,0.15)' }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Client Types */}
          <div>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2C59', fontFamily: 'Playfair Display, serif' }}>
              Serving Every Channel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clientTypes.map(c => (
                <div key={c.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{c.label}</h4>
                  <p className="text-gray-500 text-xs">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Link
                to="/wholesale"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow hover:shadow-lg transition-all"
                style={{ backgroundColor: '#E67E22' }}
              >
                Wholesale Inquiry <ArrowRight size={15} />
              </Link>
              <a href="tel:+14045550199" className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors hover:bg-navy hover:text-white"
                style={{ borderColor: '#0F2C59', color: '#0F2C59' }}
              >
                <Phone size={14} /> Call Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Value Proposition Strip ────────────────────────────────────────────────
function ValueProps() {
  const props = [
    { icon: <Truck size={22} />, title: 'Weekly Delivery Routes', desc: 'Scheduled routes across 6 states' },
    { icon: <Award size={22} />, title: 'Authorized Distributor', desc: '15+ premium brand authorizations' },
    { icon: <Package size={22} />, title: '500+ Active SKUs', desc: 'Full-category depth across all brands' },
    { icon: <CheckCircle size={22} />, title: 'Net-30 Terms Available', desc: 'Flexible credit for qualified accounts' },
  ]
  return (
    <section className="py-10 border-b border-gray-100" style={{ backgroundColor: '#0F2C59' }}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {props.map(p => (
          <div key={p.title} className="flex gap-3 items-start">
            <div className="text-orange-400 mt-0.5 flex-shrink-0">{p.icon}</div>
            <div>
              <h4 className="text-white font-semibold text-sm">{p.title}</h4>
              <p className="text-white/50 text-xs mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative py-20 lg:py-32 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1800&h=1000&fit=crop&auto=format&q=85"
            alt="Premium Indian spices"
            className="w-full h-full object-cover"
          />
          {/* Changed from Navy Blue to a Dark Charcoal gradient so the natural image colors contrast beautifully with the top header */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.75) 50%, rgba(17,24,39,0.4) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          {/* Increased max-width so the text layout breathes better */}
          <div className="max-w-3xl">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-xs font-bold text-white border border-orange-500/40 mb-8 drop-shadow-md backdrop-blur-sm" style={{ backgroundColor: 'rgba(230,126,34,0.15)' }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Authorized B2B Wholesale Platform — Southeast USA
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Premium Indian Food
              <br />
              <span style={{ color: '#E67E22' }}>&amp; FMCG Distribution.</span>
            </h1>

            <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-medium drop-shadow-lg">
              Supplying top brands to grocery stores and restaurants across the Southeast.
            </p>

            {/* Buttons - Made slightly larger with better spacing */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                to="/catalog"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                style={{ backgroundColor: '#E67E22' }}
              >
                Browse Catalog <ArrowRight size={18} />
              </Link>
              <Link
                to="/wholesale"
                className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-base border-2 border-gray-300 hover:border-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Wholesale Inquiry
              </Link>
            </div>

            {/* Stats - Added a subtle top border to separate it cleanly from the buttons above */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              {[['500+', 'Active SKUs'], ['15+', 'Premium Brands'], ['6', 'States Served'], ['200+', 'Retail Partners']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-bold text-white drop-shadow-md mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{n}</div>
                  <div className="text-gray-300 text-xs uppercase tracking-widest font-bold">{l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <ValueProps />

      {/* ── Categories ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E67E22' }}>Product Discovery</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Shop by Category</h2>
            <p className="text-gray-500 text-sm mt-2">Explore our full-depth catalog organized by product type</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/catalog?cat=${cat.id}`}
                className="group rounded-xl overflow-hidden relative aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,44,89,0.9) 0%, rgba(15,44,89,0.2) 60%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-xl mb-1">{cat.icon}</div>
                  <h3 className="text-white font-semibold text-xs leading-tight">{cat.name}</h3>
                  <p className="text-white/60 text-[10px] mt-0.5">{cat.count} SKUs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section className="py-16" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#E67E22' }}>Authorized Distributor</p>
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Brands</h2>
            <p className="text-gray-500 text-sm mt-2">Official wholesale distribution partner for India's most trusted FMCG brands</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map(brand => (
              <Link
  key={brand.id}
  to={`/catalog/${brand.id}`}
  className="group bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
>
  {/* Logo Container */}
  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden shadow-sm border border-gray-100 p-2 shrink-0">
    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
  </div>
  
  {/* Name Container: Forces exactly 40px of height so all titles align identically */}
  <div className="min-h-[40px] flex items-center justify-center w-full mb-1">
    <h3 className="font-bold text-sm text-gray-800 group-hover:text-orange-600 transition-colors">
      {brand.name}
    </h3>
  </div>
  
  {/* Tagline Container: Forces exactly 36px of height so all taglines align identically */}
  <div className="min-h-[36px] flex items-start justify-center w-full">
    <p className="text-xs text-gray-400 leading-snug">
      {brand.tagline}
    </p>
  </div>
</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Carousel ── */}
      

<ProductCarousel />

      {/* ── Territory Block ── */}
      <TerritoryBlock />

      {/* ── Trust Badges ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl p-8 sm:p-12 text-center" style={{ backgroundColor: '#0F2C59' }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Ready to Partner?</p>
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Start Your Wholesale Account Today
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto text-sm">
              Submit your business inquiry and our regional sales team will contact you within 24 business hours with a personalized quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/wholesale"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                style={{ backgroundColor: '#E67E22' }}
              >
                Submit Business Inquiry <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+14045550199"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-sm border-2 border-white/30 hover:border-white transition-colors"
              >
                <Phone size={15} /> +1 (404) 555-0199
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}