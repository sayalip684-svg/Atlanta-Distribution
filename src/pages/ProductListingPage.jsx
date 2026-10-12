import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Filter, Grid, List, ChevronRight, X, SlidersHorizontal } from 'lucide-react'
import { products, categories, brands } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductListingPage() {
  const { brand: brandParam } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat')

  const [selectedBrands, setSelectedBrands] = useState(brandParam ? [brandParam] : [])
  const [selectedCats, setSelectedCats] = useState(catParam ? [catParam] : [])
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Update filters when URL params change
  useEffect(() => {
    if (brandParam) setSelectedBrands([brandParam])
    else setSelectedBrands([])
  }, [brandParam])

  useEffect(() => {
    if (catParam) setSelectedCats([catParam])
    else setSelectedCats([])
  }, [catParam])

  const toggleBrand = (id) => setSelectedBrands(prev =>
    prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
  )
  const toggleCat = (id) => setSelectedCats(prev =>
    prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
  )

  const filtered = products.filter(p => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brandId)
    const catMatch = selectedCats.length === 0 || selectedCats.includes(p.category)
    return brandMatch && catMatch
  })

  const activeFiltersCount = selectedBrands.length + selectedCats.length

  // Determine page title
  const pageTitle = brandParam
    ? brands.find(b => b.id === brandParam)?.name + ' Products'
    : catParam
      ? categories.find(c => c.id === catParam)?.name
      : 'Full Product Catalog'

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Filter by Brand</h3>
        <div className="space-y-2">
          {brands.map(b => (
            <label key={b.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.id)}
                onChange={() => toggleBrand(b.id)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <div className="flex items-center gap-2 flex-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: '#0F2C59' }}>
                  {b.name[0]}
                </div>
                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">{b.name}</span>
              </div>
              <span className="text-xs text-gray-400">{products.filter(p => p.brandId === b.id).length}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Category Filter */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Filter by Category</h3>
        <div className="space-y-2">
          {categories.map(c => (
            <label key={c.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(c.id)}
                onChange={() => toggleCat(c.id)}
                className="w-4 h-4 rounded accent-orange-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors flex items-center gap-1.5">
                <span>{c.icon}</span> {c.name}
              </span>
              <span className="text-xs text-gray-400 ml-auto">{products.filter(p => p.category === c.id).length}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <button
          onClick={() => { setSelectedBrands([]); setSelectedCats([]) }}
          className="w-full text-center text-sm font-medium py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
        >
          Clear All Filters ({activeFiltersCount})
        </button>
      )}

      {/* Inquiry CTA */}
      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: '#0F2C59' }}>
        <p className="text-white font-semibold text-sm mb-1">Need pricing?</p>
        <p className="text-white/60 text-xs mb-3">Submit a wholesale inquiry for bulk rates.</p>
        <Link
          to="/wholesale"
          className="block text-center py-2 px-4 rounded-lg text-xs font-semibold text-white"
          style={{ backgroundColor: '#E67E22' }}
        >
          Request Pricing
        </Link>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div style={{ backgroundColor: '#0F2C59' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Catalog</span>
            {(brandParam || catParam) && (
              <>
                <ChevronRight size={12} />
                <span className="text-orange-400">{pageTitle}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{pageTitle}</h1>
          <p className="text-white/60 text-sm mt-1">
            {filtered.length} SKUs available for wholesale inquiry · Prices shown to approved accounts only
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
              <SidebarContent />
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-2 text-sm font-medium py-1.5 px-3 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#0F2C59', color: '#0F2C59' }}
                  onClick={() => setSidebarOpen(true)}
                >
                  <SlidersHorizontal size={15} />
                  Filters {activeFiltersCount > 0 && <span className="bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeFiltersCount}</span>}
                </button>
                <span className="text-sm text-gray-500 hidden sm:block">{filtered.length} products</span>

                {/* Active filter chips */}
                {selectedBrands.map(id => (
                  <button
                    key={id}
                    onClick={() => toggleBrand(id)}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#E67E22' }}
                  >
                    {brands.find(b => b.id === id)?.name} <X size={11} />
                  </button>
                ))}
                {selectedCats.map(id => (
                  <button
                    key={id}
                    onClick={() => toggleCat(id)}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#0F2C59' }}
                  >
                    {categories.find(c => c.id === id)?.name} <X size={11} />
                  </button>
                ))}
              </div>

              {/* View mode */}
              <div className="flex gap-1 p-1 rounded-lg bg-gray-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-navy' : 'text-gray-400 hover:text-gray-600'}`}
                  style={viewMode === 'grid' ? { color: '#0F2C59' } : {}}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-400 hover:text-gray-600'}`}
                  style={viewMode === 'list' ? { color: '#0F2C59' } : {}}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Products */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No products match your filters</h3>
                <p className="text-gray-400 text-sm mb-5">Try removing some filters to see more results.</p>
                <button
                  onClick={() => { setSelectedBrands([]); setSelectedCats([]) }}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: '#0F2C59' }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map(p => <ProductCard key={p.id} product={p} variant="list" />)}
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-10 rounded-xl p-6 text-center border-2 border-dashed border-orange-200 bg-orange-50">
              <p className="font-semibold text-gray-800 mb-1">Don't see what you need?</p>
              <p className="text-sm text-gray-500 mb-4">Our full catalog has 500+ SKUs. Contact our sales team to source specific products.</p>
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: '#E67E22' }}
              >
                Submit Sourcing Request
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  )
}
