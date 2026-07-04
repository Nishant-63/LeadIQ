'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { storage } from '@/lib/storage';
import { getVerticalConfig } from '@/lib/verticals';
import { Loader2, Lock } from 'lucide-react';

// ─── Inner Demo Page (uses useSearchParams) ────────────────────────────────────

function DemoInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const config = getVerticalConfig(searchParams);

  // Read ?v= at click-time from window.location (reliable on client, never stale)
  const getV = () =>
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('v')
      : null;
  const withV = (path: string) => {
    const v = getV();
    return v ? `${path}?v=${v}` : path;
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!phone.trim()) newErrors.phone = 'Please enter your WhatsApp number';
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, '')))
      newErrors.phone = 'Enter a valid 10-digit mobile number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    storage.setLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      source: config.leadSource,
    });

    await new Promise((r) => setTimeout(r, 1500));
    router.push(withV('/demo/qualifying'));
  };

  // Vertical-specific banner copy — read directly from URL at render time
  // Default (no param or any param other than ?v=re) = Audi automotive
  const isAuto =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('v') !== 're'
      : searchParams.get('v') !== 're';

  return (
    <div className="min-h-[calc(100vh-48px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Powered by badge */}
        <div className="flex justify-end mb-2">
          <span className="text-gray-400 text-[11px]">Powered by LeadIQ</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Gradient banner */}
          <div
            className="relative h-36 flex flex-col items-center justify-center text-center px-6"
            style={{
              background: isAuto
                ? 'linear-gradient(135deg, #0a0a0a 0%, #222 60%, #b8860b 100%)'
                : 'linear-gradient(135deg, #1e1b4b 0%, #1d4ed8 100%)',
            }}
          >
            {/* Subtle overlay circles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-12 -left-8 w-52 h-52 rounded-full bg-white/5" />
            </div>
            <p className="relative text-blue-200 text-xs font-medium tracking-widest uppercase mb-1">
              {isAuto ? 'Chandigarh\'s Premium' : 'Tricity\'s Most Trusted'}
            </p>
            <h2 className="relative text-white text-xl font-bold leading-tight">
              {isAuto ? 'Audi Dealership' : 'Property Advisor'}
            </h2>
            <p className="relative text-blue-100 text-xs mt-1.5">
              {isAuto ? 'Chandigarh · Mohali · Punjab' : 'Chandigarh · Mohali · Panchkula'}
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <h1 className="text-gray-900 text-lg font-bold mb-1">
              {isAuto
                ? 'Interested in a Premium Audi?'
                : 'Interested in Premium Properties in Tricity?'}
            </h1>
            <p className="text-gray-500 text-sm mb-5">
              Fill in your details and our advisor will reach out shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Raj Sharma"
                  className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 bg-gray-50 text-sm text-gray-600 font-medium">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98XXXXXXXX"
                    maxLength={10}
                    className={`flex-1 border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email{' '}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="raj@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-2 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    {isAuto ? 'Book a Test Drive →' : 'Get Free Consultation →'}
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Lock size={11} className="text-gray-400" />
              Your details are 100% safe and confidential
            </p>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-5">
          {isAuto ? (
            <>
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">300+</p>
                <p className="text-gray-400 text-xs">Cars Delivered</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">₹500Cr+</p>
                <p className="text-gray-400 text-xs">Cars Sold</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">10 Yrs</p>
                <p className="text-gray-400 text-xs">Audi Partner</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">500+</p>
                <p className="text-gray-400 text-xs">Happy Clients</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">₹250 Cr+</p>
                <p className="text-gray-400 text-xs">Properties Sold</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <p className="text-gray-900 text-base font-bold">15 Yrs</p>
                <p className="text-gray-400 text-xs">Experience</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Demo Landing Page ─────────────────────────────────────────────────────────

export default function DemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-48px)] flex items-center justify-center">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    }>
      <DemoInner />
    </Suspense>
  );
}
