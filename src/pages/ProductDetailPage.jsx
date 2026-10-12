import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Lock, Phone, Mail, ArrowRight, Package, Tag, Ruler } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === id)

  const [activeImg, setActiveImg] = useState(0)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="text-6xl">📦</div>
        <h1 className="text-2xl font-bold text-gray-800">Product Not Found</h1>
        <p className="text-gray-500">This SKU may have been discontinued or the URL is incorrect.</p>
        <Link to="/catalog" className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: '#0F2C59' }}>
          Return to Catalog
        </Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const logisticsData = [
    { label: 'Pack Size', value: product.packSize, icon: <Package size={14} /> },
    { label: 'Net Weight', value: product.netWeight, icon: <Package size={14} /> },
    { label: 'SKU / Item Code', value: product.sku, icon: <Tag size={14} /> },
    { label: 'UPC Barcode', value: product.upc, icon: <Tag size={14} /> },
    { label: 'Case Configuration', value: product.caseConfig, icon: <Package size={14} /> },
    { label: 'Pallet Dimensions', value: product.palletDimensions, icon: <Ruler size={14} /> },
    { label: 'Pallet Ti (Cases/Layer)', value: product.palletTi, icon: <Ruler size={14} /> },
    { label: 'Pallet Hi (Layers)', value: product.palletHi, icon: <Ruler size={14} /> },
    { label: 'Min. Order Quantity', value: product.minOrderQty, icon: <Package size={14} /> },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/catalog" className="hover:text-gray-700 transition-colors">Catalog</Link>
            <ChevronRight size={12} />
            <Link to={`/catalog?cat=${product.category}`} className="hover:text-gray-700 transition-colors">{product.categoryName}</Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 font-medium truncate max-w-48">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main PDP ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left: Image Gallery ── */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Tags overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#E67E22' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="p-3 flex gap-2 border-t border-gray-100">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === activeImg ? 'border-orange-400 scale-105' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Logistics quick-view card */}
            <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: '#0F2C59' }}>
                  {product.brand[0]}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.brand}</span>
                <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#0F2C59' }}>{product.categoryName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[['Pack', product.packSize], ['Case', product.caseConfig], ['MOQ', product.minOrderQty]].map(([l, v]) => (
                  <div key={l} className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">{l}</p>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Product Data ── */}
          <div>
            {/* Title block */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#E67E22' }}>
                  {product.brand}
                </span>
                <span className="text-xs text-gray-400">{product.categoryName}</span>
                <span className="text-xs text-gray-300">·</span>
                <span className="text-xs text-gray-400">SKU: {product.sku}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                {product.name}
              </h1>
              <p className="text-gray-500 text-sm mt-2">{product.packSize} · {product.caseConfig}</p>
            </div>

            {/* ── Pricing Notice (No retail price shown) ── */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 mb-6 flex gap-3 items-start">
              <Lock size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Pricing available for approved wholesale accounts</p>
                <p className="text-xs text-amber-600 mt-0.5">Submit a business inquiry to receive competitive wholesale pricing for this SKU.</p>
              </div>
            </div>

            {/* ── Logistics Data Table ── */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Product Specifications</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <tbody>
                    {logisticsData.map((row, i) => (
                      <tr key={row.label} className={`${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100 last:border-0`}>
                        <td className="px-4 py-2.5 text-gray-500 font-medium text-xs flex items-center gap-2 whitespace-nowrap">
                          <span className="text-gray-400">{row.icon}</span>
                          {row.label}
                        </td>
                        <td className="px-4 py-2.5 text-gray-900 font-semibold text-xs text-right">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Sticky Conversion Block ── */}
            <div className="rounded-2xl overflow-hidden border-2 mb-6" style={{ borderColor: '#E67E22' }}>
              <div className="px-5 py-3.5 text-white text-sm font-semibold" style={{ backgroundColor: '#E67E22' }}>
                🔒 Wholesale Pricing — Approved Accounts Only
              </div>
              <div className="bg-white px-5 py-5">
                {!inquirySubmitted ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      Request pricing and availability for <span className="font-semibold text-gray-900">{product.name}</span> ({product.sku}).
                      Our team responds within 24 business hours.
                    </p>
                    <button
                      onClick={() => setInquirySubmitted(true)}
                      className="w-full py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity shadow-lg"
                      style={{ backgroundColor: '#E67E22' }}
                    >
                      Request Pricing for this SKU
                    </button>
                    <div className="mt-3 flex gap-3">
                      <Link
                        to="/wholesale"
                        className="flex-1 text-center py-2.5 rounded-xl font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
                        style={{ borderColor: '#0F2C59', color: '#0F2C59' }}
                      >
                        Full Wholesale Inquiry
                      </Link>
                      <a
                        href="tel:+14045550199"
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <Phone size={14} /> Call
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-3">✅</div>
                    <h3 className="font-bold text-gray-900 mb-1">Inquiry Received!</h3>
                    <p className="text-sm text-gray-500 mb-4">Our sales team will contact you within 24 business hours with pricing for SKU <span className="font-semibold">{product.sku}</span>.</p>
                    <Link to="/catalog" className="text-sm font-semibold" style={{ color: '#E67E22' }}>← Continue Browsing Catalog</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Contact row */}
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="mailto:sales@atlantadistributors.com" className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                <Mail size={13} /> sales@atlantadistributors.com
              </a>
              <a href="tel:+14045550199" className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                <Phone size={13} /> +1 (404) 555-0199
              </a>
            </div>
          </div>
        </div>

        {/* ── Product Description ── */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Product Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="mt-6 pt-6 border-t border-gray-100 grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Category', value: product.categoryName, icon: '🏷️' },
              { title: 'Brand', value: product.brand, icon: '🏢' },
              { title: 'Tags', value: product.tags.join(', '), icon: '🔖' },
            ].map(item => (
              <div key={item.title} className="text-sm">
                <p className="text-gray-400 text-xs mb-1">{item.icon} {item.title}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                Related Products
              </h2>
              <Link to={`/catalog?cat=${product.category}`} className="text-sm font-medium flex items-center gap-1 hover:underline" style={{ color: '#E67E22' }}>
                View All {product.categoryName} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
