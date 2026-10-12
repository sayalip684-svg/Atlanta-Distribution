import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Phone, Mail, MapPin, Truck, Clock, ArrowRight, Users, Package, Award } from 'lucide-react'

const businessTypes = [
  'Indian Grocery Store',
  'South Asian Supermarket',
  'General Grocery Store',
  'Restaurant / Food Service',
  'Convenience Store',
  'Reseller / Wholesaler',
  'Online Retailer',
  'Food Distributor',
  'Other',
]

const states = [
  'Georgia', 'Florida', 'South Carolina', 'North Carolina', 'Tennessee', 'Alabama',
  'Virginia', 'Mississippi', 'Louisiana', 'Texas', 'Other',
]

export default function WholesaleInquiryPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', businessName: '', email: '',
    phone: '', state: '', businessType: '', annualRevenue: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.businessName.trim()) e.businessName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.state) e.state = 'Required'
    if (!form.businessType) e.businessType = 'Required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: undefined }))
  }

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white focus:border-orange-400'}`

  const benefits = [
    { icon: <Package size={20} />, title: '500+ Premium SKUs', desc: 'Access to India\'s top FMCG brands, all under one account' },
    { icon: <Truck size={20} />, title: 'Weekly Delivery Routes', desc: 'Scheduled routes across GA, FL, SC, NC, TN & AL' },
    { icon: <Award size={20} />, title: 'Authorized Distributor', desc: 'Official brand authorization — source with confidence' },
    { icon: <Clock size={20} />, title: 'Net-30 Terms', desc: 'Flexible payment terms for qualified wholesale accounts' },
    { icon: <Users size={20} />, title: 'Dedicated Sales Rep', desc: 'A named account manager for your business' },
    { icon: <CheckCircle size={20} />, title: 'Planogram Support', desc: 'We help you build high-performing ethnic food aisles' },
  ]

  const process = [
    { step: '01', title: 'Submit Inquiry', desc: 'Fill out the form with your business details.' },
    { step: '02', title: 'Account Review', desc: 'Our team verifies your business within 24–48 hours.' },
    { step: '03', title: 'Pricing Meeting', desc: 'Schedule a call to discuss pricing and terms.' },
    { step: '04', title: 'First Order', desc: 'Place your first wholesale order and start growing.' },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20" style={{ backgroundColor: '#FDF8F0' }}>
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#E67E22' }}>
            <CheckCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Inquiry Received!
          </h1>
          <p className="text-gray-600 mb-2">
            Thank you, <strong>{form.firstName}</strong>. We've received your wholesale inquiry for <strong>{form.businessName}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A member of our Atlanta sales team will reach out to <strong>{form.email}</strong> within 1–2 business days.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 text-left text-sm mb-8">
            <p className="font-semibold text-gray-700 mb-2">In the meantime:</p>
            <ul className="space-y-1 text-gray-500">
              <li>📞 Call us directly: <a href="tel:+14045550199" className="text-orange-600 font-medium">+1 (404) 555-0199</a></li>
              <li>📧 Email: <a href="mailto:sales@atlantadistributors.com" className="text-orange-600 font-medium">sales@atlanta...</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/catalog"
              className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white text-sm"
              style={{ backgroundColor: '#0F2C59' }}
            >
              Browse Our Catalog <ArrowRight size={15} />
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">← Return to Homepage</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ backgroundColor: '#0F2C59' }} className="py-14 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">B2B Partnership</p>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Become a Wholesale Partner
          </h1>
          <p className="text-white/65 text-base max-w-xl mx-auto">
            Join 200+ grocery stores and restaurants across the Southeast sourcing premium Indian brands through Atlanta Distributors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── LEFT: Information ── */}
          <div>
            {/* Proposition */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Why Partner With Us?
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Atlanta Distributors is the Southeast's most trusted B2B wholesale source for authentic Indian food products and FMCG brands. We connect Indian grocery stores, South Asian supermarkets, restaurants, and ethnic food retailers with the brands their customers demand.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map(b => (
                  <div key={b.title} className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-orange-500 flex-shrink-0 mt-0.5">{b.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{b.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                How It Works
              </h2>
              <div className="space-y-4">
                {process.map((s, i) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ backgroundColor: i === 0 ? '#E67E22' : '#0F2C59' }}>
                      {s.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{s.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Direct */}
            <div className="rounded-2xl p-6" style={{ backgroundColor: '#0F2C59' }}>
              <h3 className="text-white font-semibold text-base mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Prefer to Talk Directly?
              </h3>
              <p className="text-white/60 text-sm mb-5">Our Southeast sales team is available Monday–Friday, 8AM–6PM ET.</p>
              <div className="space-y-3">
                <a href="tel:+14045550199" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E67E22' }}>
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Sales Hotline</p>
                    <p className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">+1 (404) 555-0199</p>
                  </div>
                </a>
                <a href="mailto:sales@atlantadistributors.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E67E22' }}>
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Email</p>
                    <p className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">sales@atlantadistributors.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E67E22' }}>
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Warehouse</p>
                    <p className="text-white text-sm">2400 Distribution Blvd, Atlanta, GA 30318</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-5">
              <h4 className="font-semibold text-gray-800 text-sm mb-3">📍 Distribution Coverage</h4>
              <div className="flex flex-wrap gap-2">
                {['Georgia (HQ)', 'Florida', 'South Carolina', 'North Carolina', 'Tennessee', 'Alabama'].map(s => (
                  <span key={s} className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: s.includes('HQ') ? '#E67E22' : '#0F2C59' }}>{s}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Expanding to additional Southeast states in 2025. Contact us for out-of-area inquiries.</p>
            </div>
          </div>

          {/* ── RIGHT: The Form ── */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden sticky top-24">
              <div className="px-6 py-5 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #0F2C59 0%, #1a4080 100%)' }}>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Submit Business Inquiry
                </h2>
                <p className="text-white/60 text-sm mt-1">All fields marked * are required</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">First Name *</label>
                    <input type="text" placeholder="Raj" value={form.firstName} onChange={update('firstName')} className={inputClass('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Last Name *</label>
                    <input type="text" placeholder="Patel" value={form.lastName} onChange={update('lastName')} className={inputClass('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Business name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Business Name *</label>
                  <input type="text" placeholder="Patel Grocery & Spices LLC" value={form.businessName} onChange={update('businessName')} className={inputClass('businessName')} />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Contact Email *</label>
                    <input type="email" placeholder="raj@business.com" value={form.email} onChange={update('email')} className={inputClass('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                    <input type="tel" placeholder="+1 (404) 000-0000" value={form.phone} onChange={update('phone')} className={inputClass('phone')} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* State & Business Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">State *</label>
                    <select value={form.state} onChange={update('state')} className={inputClass('state')}>
                      <option value="">Select State</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Business Type *</label>
                    <select value={form.businessType} onChange={update('businessType')} className={inputClass('businessType')}>
                      <option value="">Select Type</option>
                      {businessTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
                  </div>
                </div>

                {/* Annual Purchasing Volume */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Est. Monthly Purchasing Volume</label>
                  <select value={form.annualRevenue} onChange={update('annualRevenue')} className={inputClass('annualRevenue')}>
                    <option value="">Select Range (Optional)</option>
                    <option value="under5k">Under \$5,000/mo</option>
                    <option value="5k-15k">\$5,000 – \$15,000/mo</option>
                    <option value="15k-50k">\$15,000 – \$50,000/mo</option>
                    <option value="50k+">\$50,000+/mo</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Additional Notes / Specific Brands Needed</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your store, which brands you're interested in, or any specific requirements..."
                    value={form.message}
                    onChange={update('message')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all resize-none"
                  />
                </div>

                {/* Privacy note */}
                <p className="text-xs text-gray-400 leading-relaxed">
                  🔒 Your information is kept strictly confidential and used solely for wholesale account qualification purposes. We do not share your data with third parties.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-white text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                  style={{ backgroundColor: '#E67E22' }}
                >
                  Submit Business Inquiry →
                </button>

                <div className="text-center">
                  <p className="text-xs text-gray-400">Or call us directly: <a href="tel:+14045550199" className="font-semibold text-orange-600 hover:underline">+1 (404) 555-0199</a></p>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
