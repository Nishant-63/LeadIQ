'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BriefingCard from '@/components/demo/BriefingCard';
import { storage } from '@/lib/storage';
import {
  HOT_LEADS,
  WARM_LEADS,
  COLD_LEADS,
  MOCK_ACTIVITY,
  DemoLead,
  ActivityEntry,
  HandoffStatus,
} from '@/lib/demo-data';
import {
  Flame,
  Users,
  Clock,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Bot,
  Calendar,
  CheckCircle2,
  Snowflake,
  Thermometer,
  DollarSign,
  CalendarDays,
  Home,
  Brain,
  User,
  MessageSquare,
  BarChart2,
} from 'lucide-react';

// ─── Toast ─────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 animate-toast-in max-w-sm">
      <Bot className="w-4 h-4 text-indigo-400 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ─── Score Badge ───────────────────────────────────────────────────────────────

function ScoreBadge({ score, tier }: { score: number; tier: 'hot' | 'warm' | 'cold' }) {
  const cls =
    tier === 'hot'
      ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
      : tier === 'warm'
      ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-md shadow-amber-400/20'
      : 'bg-gray-200 text-gray-500';
  return (
    <div className={`text-xl font-extrabold px-3 py-2 rounded-xl min-w-[54px] text-center ${cls}`}>
      {score}
    </div>
  );
}

// ─── Tier Badge ────────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: 'hot' | 'warm' | 'cold' }) {
  if (tier === 'hot')
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: '#FAEEDA', color: '#854F0B' }}
      >
        <Flame size={12} />
        Hot
      </span>
    );
  if (tier === 'warm')
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
        style={{ backgroundColor: '#E6F1FB', color: '#185FA5' }}
      >
        <Thermometer size={12} />
        Warm
      </span>
    );
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: '#EAF3DE', color: '#3B6D11' }}
    >
      <Snowflake size={12} />
      Cold
    </span>
  );
}

// ─── Hot Lead Card ─────────────────────────────────────────────────────────────

interface HotLeadCardProps {
  lead: DemoLead;
  handoffStatus: HandoffStatus;
  isBooked: boolean;
  isExpanded: boolean;
  onToggleBriefing: () => void;
  onTakeOver: () => void;
  onReturnToAI: () => void;
  onBook: () => void;
}

function HotLeadCard({
  lead,
  handoffStatus,
  isBooked,
  isExpanded,
  onToggleBriefing,
  onTakeOver,
  onReturnToAI,
  onBook,
}: HotLeadCardProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-red-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Left: Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <span className="font-bold text-gray-900 text-base">{lead.name}</span>
              {handoffStatus === 'human' ? (
                <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <UserCheck className="w-2.5 h-2.5" />
                  Human Active
                </span>
              ) : (
                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <Bot className="w-2.5 h-2.5" />
                  AI Active
                </span>
              )}
              {isBooked && (
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  Appointment Scheduled
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400 mb-2 font-mono">{lead.phone}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                <DollarSign size={10} className="text-gray-400" />
                {lead.budget}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                <CalendarDays size={10} className="text-gray-400" />
                {lead.timeline}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                <Home size={10} className="text-gray-400" />
                {lead.requirement}
              </span>
            </div>

            {/* AI Summary */}
            <p className="flex items-start gap-2 text-xs text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 font-medium">
              <Brain size={13} className="text-indigo-400 flex-shrink-0 mt-0.5" />
              {lead.aiSummary}
            </p>
          </div>

          {/* Right: Score badge */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <ScoreBadge score={lead.score} tier={lead.tier} />
            <TierBadge tier={lead.tier} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {/* Take Over / Return */}
          {handoffStatus === 'ai' ? (
            <button
              onClick={onTakeOver}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm shadow-blue-500/20"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Take Over Chat
            </button>
          ) : (
            <button
              onClick={onReturnToAI}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150"
            >
              <Bot className="w-3.5 h-3.5" />
              Return to AI
            </button>
          )}

          {/* Book Appointment */}
          {!isBooked ? (
            <button
              onClick={onBook}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-150 shadow-sm shadow-emerald-500/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Appointment
            </button>
          ) : (
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Booked
            </span>
          )}

          {/* View Briefing */}
          {lead.briefing && (
            <button
              onClick={onToggleBriefing}
              className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-xl border border-indigo-200 transition-all duration-150 ml-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Hide Briefing
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  View AI Briefing
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Inline Briefing Card (accordion) */}
      {isExpanded && lead.briefing && (
        <div className="px-4 pb-4 border-t border-gray-50">
          <BriefingCard
            name={lead.name}
            briefing={lead.briefing}
            onClose={onToggleBriefing}
          />
        </div>
      )}
    </div>
  );
}

// ─── Warm / Cold Lead Row ──────────────────────────────────────────────────────

function WarmColdRow({ lead }: { lead: DemoLead }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{lead.name}</p>
        <p className="text-[11px] text-gray-400 truncate mt-0.5">{lead.requirement}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <ScoreBadge score={lead.score} tier={lead.tier} />
        {lead.nurtureStatus && (
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
              lead.nurtureStatus === 'No response' || lead.nurtureStatus === 'Paused'
                ? 'bg-gray-100 text-gray-400'
                : 'bg-teal-50 text-teal-600 border border-teal-100'
            }`}
          >
            {lead.nurtureStatus}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Activity Feed ─────────────────────────────────────────────────────────────

function formatTime(mins: number) {
  if (mins === 0) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

// Map dot key → Lucide icon (same mapping as ActivityFeed component)
function ActivityDotIcon({ dot }: { dot: string }) {
  const cls = 'w-3 h-3 flex-shrink-0';
  switch (dot) {
    case 'check':    return <CheckCircle2 className={cls} />;
    case 'calendar': return <CalendarDays className={cls} />;
    case 'message':  return <MessageSquare className={cls} />;
    case 'flame':    return <Flame className={cls} />;
    case 'chart':    return <BarChart2 className={cls} />;
    case 'bot':      return <Bot className={cls} />;
    case 'user':     return <User className={cls} />;
    default:         return null;
  }
}

function ActivityFeedLocal({ entries }: { entries: ActivityEntry[] }) {
  return (
    <div className="flex flex-col gap-0 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin scrollbar-thumb-gray-200">
      {entries.map((e, idx) => (
        <div
          key={e.id}
          className={`flex items-start gap-3 py-2.5 ${idx < entries.length - 1 ? 'border-b border-gray-50' : ''}`}
        >
          <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
            <span className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 ${e.dotColor}`} />
            {idx < entries.length - 1 && (
              <span className="w-px flex-1 min-h-[16px] bg-gray-100 mt-1" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="flex items-start gap-1.5 text-xs text-gray-700 leading-snug">
              <span className="text-gray-400 mt-0.5">
                <ActivityDotIcon dot={e.dot} />
              </span>
              {e.text}
            </p>
          </div>
          <span className="text-[10px] text-gray-400 flex-shrink-0 whitespace-nowrap">
            {formatTime(e.minutesAgo)}
          </span>
        </div>
      ))}
    </div>
  );
}


// ─── Dashboard Page ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  // State from localStorage (qualifying flow)
  const [demoLead, setDemoLead] = useState<ReturnType<typeof storage.getLead>>(null);
  const [demoScore, setDemoScore] = useState<ReturnType<typeof storage.getScore>>(null);
  const [loaded, setLoaded] = useState(false);

  // Per-lead UI state
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [handoffs, setHandoffs] = useState<Record<string, HandoffStatus>>({});
  const [booked, setBooked] = useState<Record<string, boolean>>({});

  // Toast
  const [toast, setToast] = useState('');

  // Live-looking activity feed (prepend dynamic entries)
  const [feedEntries, setFeedEntries] = useState<ActivityEntry[]>(MOCK_ACTIVITY);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const prependActivity = (entry: ActivityEntry) => {
    setFeedEntries((prev) => [entry, ...prev]);
  };

  useEffect(() => {
    setDemoLead(storage.getLead());
    setDemoScore(storage.getScore());
    setLoaded(true);
  }, []);

  // Build hot leads list: inject demo lead from qualifying flow first (if hot)
  const hotLeads: DemoLead[] = [];
  if (demoLead && demoScore && demoScore.tier === 'hot') {
    hotLeads.push({
      id: 'demo-lead',
      name: demoLead.name,
      phone: `+91 98XXXXX${demoLead.phone.slice(-3)}`,
      score: demoScore.total,
      tier: 'hot',
      budget: storage.getQualified()?.answers?.[0] ?? 'N/A',
      timeline: storage.getQualified()?.answers?.[1] ?? 'N/A',
      requirement: storage.getQualified()?.answers?.[2] ?? 'N/A',
      aiSummary: 'Just qualified via AI bot — high engagement, ready to speak',
      handoffStatus: 'ai',
    });
  }
  HOT_LEADS.forEach((l) => hotLeads.push(l));

  // Stats
  const totalLeads = 38;
  const hotCount = 9;
  const avgResponse = '47s';
  const appointmentsBooked = Object.values(booked).filter(Boolean).length + 6;

  const stats = [
    {
      icon: <Users className="w-5 h-5 text-slate-500" />,
      label: 'Total Leads This Month',
      value: totalLeads,
      color: 'text-gray-900',
      bg: 'from-gray-50 to-white',
    },
    {
      icon: <Flame className="w-5 h-5 text-red-500" />,
      label: 'Hot Leads',
      value: hotCount,
      color: 'text-red-600',
      bg: 'from-red-50 to-white',
    },
    {
      icon: <Clock className="w-5 h-5 text-indigo-500" />,
      label: 'Avg Response Time',
      value: avgResponse,
      color: 'text-indigo-700',
      bg: 'from-indigo-50 to-white',
    },
    {
      icon: <CalendarCheck className="w-5 h-5 text-emerald-500" />,
      label: 'Appointments Booked',
      value: appointmentsBooked,
      color: 'text-emerald-700',
      bg: 'from-emerald-50 to-white',
    },
  ];

  // Handlers
  const handleTakeOver = (lead: DemoLead) => {
    setHandoffs((prev) => ({ ...prev, [lead.id]: 'human' }));
    showToast("You've taken over this conversation. AI has stepped back.");
    prependActivity({
      id: `takeover-${lead.id}-${Date.now()}`,
      dot: 'user',
      dotColor: 'bg-blue-500',
      text: `Sales rep took over — ${lead.name} — just now`,
      minutesAgo: 0,
    });
  };

  const handleReturnToAI = (lead: DemoLead) => {
    setHandoffs((prev) => ({ ...prev, [lead.id]: 'ai' }));
    showToast('AI has resumed the conversation.');
    prependActivity({
      id: `resume-${lead.id}-${Date.now()}`,
      dot: 'bot',
      dotColor: 'bg-indigo-500',
      text: `AI resumed — ${lead.name} — just now`,
      minutesAgo: 0,
    });
  };

  const handleBook = (lead: DemoLead) => {
    setBooked((prev) => ({ ...prev, [lead.id]: true }));
    showToast(`Appointment scheduled for ${lead.name}`);
    prependActivity({
      id: `book-${lead.id}-${Date.now()}`,
      dot: 'calendar',
      dotColor: 'bg-purple-500',
      text: `Appointment booked — ${lead.name} — just now`,
      minutesAgo: 0,
    });
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-gray-50 py-6 px-5">
      {/* Toast */}
      {toast && <Toast message={toast} onDone={() => setToast('')} />}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Lead Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Real-time AI qualification · Tricity Region
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              AI Engine Live
            </span>
            <button
              onClick={() => router.push('/demo/book')}
              className="flex items-center gap-1.5 text-xs font-semibold bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Schedule Appointment
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl border border-gray-200 p-4 shadow-sm transition-all duration-300 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-2 mb-3">{stat.icon}</div>
              <p className={`text-3xl font-extrabold tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main two-column grid */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Hot Leads Queue (60%) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-bold text-gray-900">Hot Leads Queue</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {hotLeads.length}
              </span>
              <span className="ml-auto text-xs text-gray-400">Sorted by AI score</span>
            </div>

            <div className="space-y-3">
              {hotLeads.map((lead) => (
                <HotLeadCard
                  key={lead.id}
                  lead={lead}
                  handoffStatus={handoffs[lead.id] ?? lead.handoffStatus}
                  isBooked={booked[lead.id] ?? false}
                  isExpanded={expandedId === lead.id}
                  onToggleBriefing={() =>
                    setExpandedId(expandedId === lead.id ? null : lead.id)
                  }
                  onTakeOver={() => handleTakeOver(lead)}
                  onReturnToAI={() => handleReturnToAI(lead)}
                  onBook={() => handleBook(lead)}
                />
              ))}
            </div>
          </div>

          {/* Right column: Warm/Cold + Activity (40%) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Warm Leads */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-50">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-gray-900">Warm Leads</h2>
                <span className="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {WARM_LEADS.length}
                </span>
              </div>
              <div className="px-4 py-2">
                {WARM_LEADS.map((lead) => (
                  <WarmColdRow key={lead.id} lead={lead} />
                ))}
              </div>
            </div>

            {/* Cold Leads */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
                <Snowflake className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-bold text-gray-900">Cold Leads</h2>
                <span className="bg-gray-200 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">
                  {COLD_LEADS.length}
                </span>
              </div>
              <div className="px-4 py-2">
                {COLD_LEADS.map((lead) => (
                  <WarmColdRow key={lead.id} lead={lead} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed — full width */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-gray-900">AI Activity Feed</h2>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <div className="px-5 py-3">
            <ActivityFeedLocal entries={feedEntries} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-toast-in {
          animation: toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thumb-gray-200::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
