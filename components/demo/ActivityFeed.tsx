'use client';

import {
  CheckCircle2,
  CalendarDays,
  MessageSquare,
  Flame,
  BarChart2,
  Bot,
  User,
  Circle,
} from 'lucide-react';
import { ActivityEntry } from '@/lib/demo-data';

interface ActivityFeedProps {
  entries: ActivityEntry[];
}

function formatTimeAgo(minutesAgo: number): string {
  if (minutesAgo === 0) return 'just now';
  if (minutesAgo === 1) return '1 min ago';
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const h = Math.floor(minutesAgo / 60);
  return `${h}h ago`;
}

// Map dot key strings to Lucide icon components (16px inline)
function DotIcon({ dot }: { dot: string }) {
  const cls = 'w-3 h-3 flex-shrink-0';
  switch (dot) {
    case 'check':    return <CheckCircle2 className={cls} />;
    case 'calendar': return <CalendarDays className={cls} />;
    case 'message':  return <MessageSquare className={cls} />;
    case 'flame':    return <Flame className={cls} />;
    case 'chart':    return <BarChart2 className={cls} />;
    case 'bot':      return <Bot className={cls} />;
    case 'user':     return <User className={cls} />;
    default:         return <Circle className={cls} />;
  }
}

export default function ActivityFeed({ entries }: ActivityFeedProps) {
  return (
    <div className="flex flex-col gap-0 overflow-y-auto max-h-[480px] pr-1">
      {entries.map((entry, idx) => (
        <div
          key={entry.id}
          className={`flex items-start gap-3 py-2.5 ${
            idx < entries.length - 1 ? 'border-b border-gray-50' : ''
          }`}
        >
          {/* Dot indicator */}
          <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
            <span className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 ${entry.dotColor}`} />
            {idx < entries.length - 1 && (
              <span className="w-px h-full min-h-[16px] bg-gray-100 mt-1" />
            )}
          </div>

          {/* Icon + text + time */}
          <div className="flex-1 min-w-0">
            <p className="flex items-start gap-1.5 text-xs text-gray-700 leading-snug">
              <span className="text-gray-400 mt-0.5">
                <DotIcon dot={entry.dot} />
              </span>
              {entry.text}
            </p>
          </div>
          <span className="text-[10px] text-gray-400 flex-shrink-0 whitespace-nowrap">
            {formatTimeAgo(entry.minutesAgo)}
          </span>
        </div>
      ))}
    </div>
  );
}
