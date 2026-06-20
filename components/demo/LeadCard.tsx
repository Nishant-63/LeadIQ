'use client';

import { Phone, Calendar, MessageCircle, DollarSign, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface LeadCardData {
  id: string;
  name: string;
  phone: string;
  source: string;
  budget: string;
  timeline: string;
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  isDemo?: boolean;
}

const SCORE_COLOR = (score: number) => {
  if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
  if (score >= 40) return 'text-amber-600 bg-amber-50 border-amber-200';
  return 'text-blue-600 bg-blue-50 border-blue-200';
};

interface LeadCardProps {
  lead: LeadCardData;
  onToast?: (msg: string) => void;
}

export default function LeadCard({ lead, onToast }: LeadCardProps) {
  const router = useRouter();

  return (
    <div
      className={`bg-white rounded-xl border p-4 flex items-center gap-3 transition-all duration-200 hover:shadow-md ${
        lead.isDemo
          ? 'border-2 border-red-400 shadow-md ring-1 ring-red-100'
          : 'border-gray-200'
      }`}
    >
      {/* Left: name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-semibold text-gray-900 text-sm truncate">{lead.name}</span>
          {lead.isDemo && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide whitespace-nowrap animate-pulse">
              JUST QUALIFIED — LIVE DEMO
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mb-2">{lead.phone}</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
            {lead.source}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
            <DollarSign size={9} className="text-gray-400" />
            {lead.budget}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
            <CalendarDays size={9} className="text-gray-400" />
            {lead.timeline}
          </span>
        </div>
      </div>

      {/* Middle: score badge */}
      <div className={`text-2xl font-bold px-3 py-2 rounded-xl border ${SCORE_COLOR(lead.score)} min-w-[56px] text-center`}>
        {lead.score}
      </div>

      {/* Right: action buttons */}
      <div className="flex flex-col gap-1.5">
        <button
          onClick={() => onToast?.('Calling lead...')}
          className="flex items-center gap-1 text-[10px] font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg px-2.5 py-1.5 transition-colors duration-150"
        >
          <Phone className="w-3 h-3" />
          Call
        </button>
        <button
          onClick={() => lead.isDemo ? router.push('/demo/book') : onToast?.('Opening calendar...')}
          className="flex items-center gap-1 text-[10px] font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-2.5 py-1.5 transition-colors duration-150"
        >
          <Calendar className="w-3 h-3" />
          Book
        </button>
        <button
          onClick={() => onToast?.('Opening WhatsApp...')}
          className="flex items-center gap-1 text-[10px] font-medium bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-2.5 py-1.5 transition-colors duration-150"
        >
          <MessageCircle className="w-3 h-3" />
          Chat
        </button>
      </div>
    </div>
  );
}
