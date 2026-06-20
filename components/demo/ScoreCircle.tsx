'use client';

import { useEffect, useState } from 'react';
import { Flame, Thermometer, Snowflake } from 'lucide-react';

interface ScoreCircleProps {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  animate?: boolean;
}

// Semantic tier colors per spec
const TIER_COLORS = {
  hot: '#639922',   // was red — spec mandates green for 70-100
  warm: '#BA7517',  // amber for 40-69
  cold: '#A32D2D',  // red for 0-39
};

// Resolve correct arc color based on score threshold (not just tier label)
function getArcColor(score: number): string {
  if (score >= 70) return '#639922';
  if (score >= 40) return '#BA7517';
  return '#A32D2D';
}

const TIER_BADGE = {
  hot: {
    Icon: Flame,
    label: 'Hot',
    bg: '#FAEEDA',
    color: '#854F0B',
  },
  warm: {
    Icon: Thermometer,
    label: 'Warm',
    bg: '#E6F1FB',
    color: '#185FA5',
  },
  cold: {
    Icon: Snowflake,
    label: 'Cold',
    bg: '#EAF3DE',
    color: '#3B6D11',
  },
};

export default function ScoreCircle({ score, tier, animate = true }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [progress, setProgress] = useState(animate ? 0 : score);
  const [showBadge, setShowBadge] = useState(!animate);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (!animate) return;

    const duration = 1800; // ms
    const steps = 60;
    const stepMs = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
      setDisplayScore(Math.round(score * eased));
      setProgress(score * eased);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayScore(score);
        setProgress(score);
        setTimeout(() => setShowBadge(true), 200);
      }
    }, stepMs);

    return () => clearInterval(timer);
  }, [score, animate]);

  const arcColor = getArcColor(score);
  const badge = TIER_BADGE[tier];
  const BadgeIcon = badge.Icon;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Score ring */}
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={arcColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>

        {/* Score number + label in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            style={{ fontSize: '32px', fontWeight: 500, color: arcColor, lineHeight: 1 }}
          >
            {displayScore}
          </span>
          <span style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            Lead score
          </span>
        </div>
      </div>

      {/* Tier badge — no emojis, Lucide icons only */}
      <div
        className={`transition-all duration-500 ${showBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
          style={{ backgroundColor: badge.bg, color: badge.color }}
        >
          <BadgeIcon size={13} />
          {badge.label}
        </span>
      </div>
    </div>
  );
}
