'use client';

import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  animate?: boolean;
}

const TIER_COLORS = {
  hot: '#ef4444',
  warm: '#f59e0b',
  cold: '#3b82f6',
};

const TIER_LABELS = {
  hot: '🔥 HOT LEAD',
  warm: '♨️ WARM LEAD',
  cold: '❄️ COLD LEAD',
};

const TIER_BG = {
  hot: 'bg-red-500',
  warm: 'bg-amber-500',
  cold: 'bg-blue-500',
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

  const color = TIER_COLORS[tier];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          {/* Progress ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>

        {/* Score number in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-bold tabular-nums"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="text-sm text-gray-400 font-medium">/ 100</span>
        </div>
      </div>

      {/* Tier badge */}
      <div
        className={`transition-all duration-500 ${showBadge ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <span
          className={`inline-block ${TIER_BG[tier]} text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg tracking-wide`}
        >
          {TIER_LABELS[tier]}
        </span>
      </div>
    </div>
  );
}
