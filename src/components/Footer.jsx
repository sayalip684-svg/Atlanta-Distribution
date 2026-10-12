import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { categories } from '../data/products'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#07192e' }} className="text-white">
      {/* CTA Banner */}
      <div style={{ backgroundColor: '#E67E22' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Ready to stock premium Indian brands?
            </h3>
            <p className="text-white/85 mt-1 text-sm">Join 200+ retailers across the Southeast. Apply for a wholesale account today.</p>
          </div>
          <Link
            to="/wholesale"
            className="flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-lg text-sm hover:bg-gray-50 transition-colors whitespace-nowrap flex-shrink-0"
            style={{ color: '#E67E22' }}
          >
            Submit Business Inquiry <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#E67E22' }}>AD</div>
            <div>
              <div className="font-bold text-base" style={{ fontFamily: 'Playfair Display, serif' }}>Atlanta Distributors</div>
              <div className="text-white/40 text-[10px] tracking-widest uppercase">Est. 2008</div>
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            Atlanta's premier wholesale distributor of authentic Indian food brands and FMCG products to grocery stores, restaurants, and retailers across the Southeast.
          </p>
          <div className="mt-5 flex gap-2">
            {['GA','FL','SC','NC','TN','AL'].map(s => (
              <span key={s} className="px-2 py-1 rounded text-xs font-semibold text-white/70 border border-white/20">{s}</span>
            ))}
          </div>
        </div>

        {/* Catalog */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product Catalog</h4>
          <ul className="space-y-2">
            {categories.map(c => (
              <li key={c.id}>
                <Link to={`/catalog?cat=${c.id}`} className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <span>{c.icon}</span>{c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/catalog" className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">View All SKUs →</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Services</h4>
          <ul className="space-y-2 text-white/55 text-sm">
            <li className="hover:text-white transition-colors cursor-pointer">Retail Distribution</li>
            <li className="hover:text-white transition-colors cursor-pointer">Restaurant Supply</li>
            <li className="hover:text-white transition-colors cursor-pointer">Bulk Wholesale</li>
            <li className="hover:text-white transition-colors cursor-pointer">New Store Setup</li>
            <li className="hover:text-white transition-colors cursor-pointer">Planogram Support</li>
            <li className="hover:text-white transition-colors cursor-pointer">Private Label Sourcing</li>
          </ul>
          <div className="mt-5">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-white/55 text-sm">
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Become a Partner</Link></li>
              <li><Link to="/wholesale" className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><Link to="/catalog" className="hover:text-white transition-colors">Full Catalog</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Phone size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white/40 text-xs mb-0.5">Sales Hotline</div>
                <a href="tel:+14045550199" className="text-white text-sm font-medium hover:text-orange-300 transition-colors">+1 (404) 555-0199</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white/40 text-xs mb-0.5">Email</div>
                <a href="mailto:sales@atlantadistributors.com" className="text-white text-sm font-medium hover:text-orange-300 transition-colors break-all">sales@atlantadistributors.com</a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin size={16} className="text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-white/40 text-xs mb-0.5">Warehouse</div>
                <p className="text-white text-sm">2400 Distribution Blvd<br />Atlanta, GA 30318</p>
              </div>
            </li>
          </ul>
          <div className="mt-6 p-3 rounded-lg border border-white/10" style={{ backgroundColor: '#0F2C59' }}>
            <p className="text-xs text-white/50 mb-1">Business Hours</p>
            <p className="text-sm text-white">Mon–Fri: 8:00 AM – 6:00 PM ET</p>
            <p className="text-sm text-white">Sat: 9:00 AM – 2:00 PM ET</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2024 Atlanta Distributors LLC. All rights reserved. B2B Wholesale Platform.</p>
          <div className="flex gap-5">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Credit Application</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
