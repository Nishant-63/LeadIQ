'use client';

import { BriefingCard as BriefingCardData } from '@/lib/demo-data';
import { Brain, AlertTriangle, Lightbulb, CheckCircle2, X } from 'lucide-react';

interface BriefingCardProps {
  name: string;
  briefing: BriefingCardData;
  onClose: () => void;
}

export default function BriefingCard({ name, briefing, onClose }: BriefingCardProps) {
  return (
    <div className="briefing-card mt-3 rounded-xl border border-indigo-200 bg-gradient-to-br from-slate-900 to-indigo-950 text-white overflow-hidden shadow-xl animate-briefing-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-800/60">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
            AI Briefing
          </span>
          <span className="text-sm font-semibold text-white ml-1">— {name}</span>
        </div>
        <button
          onClick={onClose}
          className="text-indigo-400 hover:text-white transition-colors p-0.5 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Lead Summary */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            Lead Summary
          </p>
          <SummaryRow label="Budget" value={briefing.budget} />
          <SummaryRow label="Property" value={briefing.property} />
          <SummaryRow label="Timeline" value={briefing.timeline} />
          <SummaryRow label="Loan Status" value={briefing.loanStatus} />
        </div>

        {/* Intent Signals */}
        <div>
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
            Intent Signals
          </p>
          <div className="space-y-1.5">
            {briefing.intentSignals.map((signal, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-snug">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Opener — full width */}
        <div className="lg:col-span-2 bg-indigo-900/40 border border-indigo-700/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Suggested Opening Line
            </span>
          </div>
          <p className="text-xs text-slate-100 leading-relaxed italic">
            &ldquo;{briefing.suggestedOpener}&rdquo;
          </p>
        </div>

        {/* Watch Out — full width */}
        <div className="lg:col-span-2 bg-red-950/50 border border-red-800/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
              Watch Out
            </span>
          </div>
          <p className="text-xs text-red-200 leading-snug">{briefing.watchOut}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes briefing-in {
          from {
            opacity: 0;
            transform: translateY(-8px) scaleY(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }
        .animate-briefing-in {
          animation: briefing-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top;
        }
      `}</style>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="text-indigo-400 font-medium w-24 flex-shrink-0">{label}:</span>
      <span className="text-slate-200">{value}</span>
    </div>
  );
}
