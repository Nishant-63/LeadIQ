'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScoreCircle from '@/components/demo/ScoreCircle';
import { storage } from '@/lib/storage';
import { TIER_CONFIG } from '@/lib/scoring';
import { ArrowRight, LayoutDashboard } from 'lucide-react';

interface BreakdownBar {
  label: string;
  value: number;
  max: number;
  color: string;
}

function AnimatedBar({ label, value, max, color, delay }: BreakdownBar & { delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [value, max, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">
          {value} <span className="text-gray-400 font-normal">/ {max}</span>
        </span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, backgroundColor: color, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

// Hardcoded HOT LEAD score for the sales demo — always 94/100
const DEMO_SCORE = {
  total: 94,
  tier: 'hot' as const,
  breakdown: {
    budget: 24,
    timeline: 25,
    area: 20,
    intent: 25,
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [lead, setLead] = useState<ReturnType<typeof storage.getLead>>(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    const leadData = storage.getLead();
    setLead(leadData);

    // Always store the demo score so dashboard picks it up
    storage.setScore(DEMO_SCORE);

    // Ensure qualified answers are stored for the profile card
    const existing = storage.getQualified();
    if (!existing?.answers?.length) {
      storage.setQualified({
        answers: [
          'Around 1 crore',
          'Within 3 months',
          'Mohali',
          'Residential, ready-to-move',
          'Yes, visited a few projects already',
        ],
        conversationHistory: [],
      });
    }

    setTimeout(() => setLoaded(true), 100);
  }, []);

  const scoreData = DEMO_SCORE;
  const cfg = TIER_CONFIG[scoreData.tier];
  const maskedPhone = lead?.phone
    ? `98XXXXX${lead.phone.slice(-3)}`
    : '98XXXXXXX';

  const answers = storage.getQualified()?.answers ?? [
    'Around 1 crore',
    'Within 3 months',
    'Mohali',
    'Residential, ready-to-move',
    'Yes, visited a few projects already',
  ];

  const bars: BreakdownBar[] = [
    { label: '💰 Budget', value: scoreData.breakdown.budget, max: 30, color: cfg.color },
    { label: '📅 Timeline', value: scoreData.breakdown.timeline, max: 25, color: cfg.color },
    { label: '📍 Area Match', value: scoreData.breakdown.area, max: 20, color: cfg.color },
    { label: '🎯 Intent Signal', value: scoreData.breakdown.intent, max: 25, color: cfg.color },
  ];

  return (
    <div className="min-h-[calc(100vh-48px)] py-8 px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="max-w-lg mx-auto space-y-5">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Lead Score Analysis</h1>
          <p className="text-gray-500 text-sm mt-1">AI-powered intent scoring complete</p>
        </div>

        {/* Score circle + tier */}
        <div
          className={`bg-white rounded-2xl border ${cfg.borderClass} p-8 flex flex-col items-center shadow-sm transition-all duration-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <ScoreCircle score={scoreData.total} tier={scoreData.tier} animate={loaded} />
        </div>

        {/* Score breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Score Breakdown
          </h2>
          {bars.map((bar, i) => (
            <AnimatedBar key={bar.label} {...bar} delay={300 + i * 200} />
          ))}
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Lead Profile
          </h2>
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {lead?.name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) ?? 'LD'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{lead?.name ?? 'Lead'}</p>
              <p className="text-sm text-gray-500">{maskedPhone}</p>
              <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                📢 Facebook Ad — Mohali 3BHK Campaign
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: '💰', label: 'Budget', value: answers[0] || '—' },
              { icon: '📅', label: 'Timeline', value: answers[1] || '—' },
              { icon: '📍', label: 'Location', value: answers[2] || '—' },
              { icon: '🏠', label: 'Property Type', value: answers[3] || '—' },
              { icon: '🎯', label: 'Intent Signal', value: answers[4] || '—' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex justify-between items-start gap-4">
                <span className="text-sm text-gray-500 flex-shrink-0">
                  {icon} {label}
                </span>
                <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          {/* Always show Book Appointment for HOT (score is always 94) */}
          <button
            onClick={() => router.push('/demo/book')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            📅 Book Appointment
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push('/demo/dashboard')}
            className="w-full border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-50"
          >
            <LayoutDashboard className="w-4 h-4" />
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
