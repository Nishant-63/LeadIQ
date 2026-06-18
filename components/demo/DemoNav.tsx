'use client';

import { usePathname, useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

const STEPS = [
  { label: 'Form', path: '/demo' },
  { label: 'Qualifying', path: '/demo/qualifying' },
  { label: 'Score', path: '/demo/result' },
  { label: 'Dashboard', path: '/demo/dashboard' },
  { label: 'Book', path: '/demo/book' },
];

function getStepIndex(pathname: string): number {
  if (pathname === '/demo') return 0;
  if (pathname.startsWith('/demo/qualifying')) return 1;
  if (pathname.startsWith('/demo/result')) return 2;
  if (pathname.startsWith('/demo/dashboard')) return 3;
  if (pathname.startsWith('/demo/book')) return 4;
  return 0;
}

export default function DemoNav() {
  const pathname = usePathname();
  const router = useRouter();
  const currentStep = getStepIndex(pathname);

  const handleRestart = () => {
    storage.clearAll();
    router.push('/demo');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[140px]">
        <span className="font-bold text-gray-900 text-base tracking-tight">LeadIQ</span>
        <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
          DEMO
        </span>
      </div>

      {/* Step Indicator */}
      <div className="flex-1 flex items-center justify-center gap-1.5">
        {STEPS.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.path} className="flex items-center gap-1.5">
              <div
                className={`flex items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-300 ${
                  isCurrent
                    ? 'w-7 h-7 bg-gray-900 text-white shadow-md'
                    : isCompleted
                    ? 'w-6 h-6 bg-green-500 text-white'
                    : 'w-6 h-6 bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? '✓' : i + 1}
              </div>
              <span
                className={`hidden sm:block text-[11px] font-medium transition-colors duration-200 ${
                  isCurrent ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`hidden sm:block w-5 h-px transition-colors duration-300 ${
                    i < currentStep ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Restart */}
      <div className="min-w-[140px] flex justify-end">
        <button
          onClick={handleRestart}
          className="text-[11px] text-gray-500 border border-gray-300 rounded-md px-2.5 py-1 hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 font-medium"
        >
          ↺ Restart Demo
        </button>
      </div>
    </div>
  );
}
