'use client';

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

          {/* Text + time */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-700 leading-snug">
              <span className="mr-1">{entry.dot}</span>
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
