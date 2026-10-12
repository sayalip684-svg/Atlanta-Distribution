import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function ProductCard({ product, variant = 'grid' }) {
  if (variant === 'list') {
    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex gap-4 p-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#E67E22' }}>{product.brand}</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">{product.name}</h3>
              <div className="flex gap-3 mt-1">
                <span className="text-xs text-gray-500">{product.packSize}</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-500">{product.caseConfig}</span>
              </div>
            </div>
            <Link
              to={`/product/${product.id}`}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#0F2C59' }}
            >
              View Specs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.tags.slice(0, 1).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: '#E67E22' }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#E67E22' }}>{product.brand}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 flex-1" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h3>

        {/* Logistics mini-table */}
        <div className="border border-gray-100 rounded-lg overflow-hidden mb-3">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            <div className="px-2.5 py-2 bg-gray-50">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Pack Size</p>
              <p className="text-xs font-semibold text-gray-700">{product.packSize}</p>
            </div>
            <div className="px-2.5 py-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Case Config</p>
              <p className="text-xs font-semibold text-gray-700">{product.caseConfig}</p>
            </div>
          </div>
        </div>

        {/* SKU */}
        <p className="text-[10px] text-gray-400 mb-3">SKU: {product.sku}</p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center px-3 py-2 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#0F2C59' }}
          >
            View Specs
          </Link>
          <Link
            to="/wholesale"
            className="px-3 py-2 text-xs font-semibold rounded-lg border transition-colors hover:bg-orange-50"
            style={{ borderColor: '#E67E22', color: '#E67E22' }}
            title="Inquire about pricing"
          >
            Inquire
          </Link>
        </div>
      </div>
    </div>
  )
}
