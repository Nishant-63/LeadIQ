'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LeadCard, { LeadCardData } from '@/components/demo/LeadCard';
import ActivityFeed from '@/components/demo/ActivityFeed';
import { storage } from '@/lib/storage';
import { MOCK_HOT_LEADS, MOCK_ACTIVITY, ActivityEntry } from '@/lib/demo-data';
import { Flame, Inbox, BarChart2, CalendarCheck } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [lead, setLead] = useState<ReturnType<typeof storage.getLead>>(null);
  const [score, setScore] = useState<ReturnType<typeof storage.getScore>>(null);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    setLead(storage.getLead());
    setScore(storage.getScore());
    setLoaded(true);
  }, []);

  // Build leads list: inject demo lead at top if hot
  const leads: LeadCardData[] = [];

  if (lead && score) {
    const maskedPhone = `98XXXXX${lead.phone.slice(-3)}`;
    leads.push({
      id: 'demo-lead',
      name: lead.name,
      phone: maskedPhone,
      source: 'FB Ad',
      budget: storage.getQualified()?.answers?.[0] ?? 'N/A',
      timeline: storage.getQualified()?.answers?.[1] ?? 'N/A',
      score: score.total,
      tier: score.tier,
      isDemo: true,
    });
  }

  MOCK_HOT_LEADS.forEach((l) => {
    leads.push({
      id: l.id,
      name: l.name,
      phone: l.phone,
      source: l.source,
      budget: l.budget,
      timeline: l.timeline,
      score: l.score,
      tier: l.tier,
    });
  });

  // Build activity feed: inject demo entries at top
  const activities: ActivityEntry[] = [];
  if (lead && score) {
    activities.push(
      {
        id: 'demo-act-1',
        dot: '🔵',
        dotColor: 'bg-blue-500',
        text: `Qualification started for ${lead.name}`,
        minutesAgo: 0,
      },
      {
        id: 'demo-act-2',
        dot: '🟢',
        dotColor: 'bg-green-500',
        text: `Score calculated: ${score.total}/100 — ${score.tier.toUpperCase()}`,
        minutesAgo: 0,
      }
    );
  }
  MOCK_ACTIVITY.forEach((a) => activities.push(a));

  const hotCount = leads.filter((l) => l.tier === 'hot').length;

  const stats = [
    { icon: <Flame className="w-5 h-5 text-red-500" />, label: '🔥 Hot Leads', value: hotCount, color: 'text-red-600' },
    { icon: <Inbox className="w-5 h-5 text-blue-500" />, label: '📥 New Today', value: 23, color: 'text-blue-600' },
    { icon: <BarChart2 className="w-5 h-5 text-purple-500" />, label: '📊 Avg Score', value: 67, color: 'text-purple-600' },
    { icon: <CalendarCheck className="w-5 h-5 text-green-500" />, label: '📅 Booked Today', value: 4, color: 'text-green-600' },
  ];

  return (
    <div className="min-h-[calc(100vh-48px)] py-6 px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-xl">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Real-time AI qualification activity</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI Active
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm transition-all duration-300 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">{stat.icon}</div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main content: leads + activity */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Hot leads queue — 3/5 width */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900">🔥 Hot Leads Queue</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {hotCount}
              </span>
            </div>

            <div className="space-y-3">
              {leads.map((l) => (
                <LeadCard
                  key={l.id}
                  lead={l}
                  onToast={showToast}
                />
              ))}
            </div>
          </div>

          {/* Activity feed — 2/5 width */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-bold text-gray-900">🤖 AI Activity Log</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <ActivityFeed entries={activities} />
            </div>
          </div>
        </div>

        {/* Today's pipeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Today&apos;s Pipeline
          </h2>
          <div className="flex gap-4 mb-3">
            {[
              { label: 'Cold Leads', count: 12, color: 'bg-blue-400', text: 'text-blue-600' },
              { label: 'Warm Leads', count: 8, color: 'bg-amber-400', text: 'text-amber-600' },
              { label: 'Hot Leads', count: hotCount, color: 'bg-red-400', text: 'text-red-600' },
            ].map(({ label, count, text }) => (
              <div key={label} className="flex-1 text-center">
                <p className={`text-2xl font-bold ${text}`}>{count}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
          {/* Proportional bar */}
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div className="bg-blue-400 transition-all duration-700" style={{ width: `${(12 / (12 + 8 + hotCount)) * 100}%` }} />
            <div className="bg-amber-400 transition-all duration-700" style={{ width: `${(8 / (12 + 8 + hotCount)) * 100}%` }} />
            <div className="bg-red-400 flex-1 transition-all duration-700" />
          </div>

          <button
            onClick={() => router.push('/demo/book')}
            className="mt-4 w-full text-sm font-medium text-gray-600 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50 transition-all duration-200"
          >
            📅 Schedule Appointments →
          </button>
        </div>
      </div>
    </div>
  );
}
