'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import {
  CheckCircle,
  Loader2,
  CalendarDays,
  Clock,
  User,
  Phone,
  DollarSign,
  Zap,
} from 'lucide-react';

const MORNING_SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
const AFTERNOON_SLOTS = ['2:00 PM', '2:30 PM', '3:00 PM', '4:00 PM', '4:30 PM'];
const EVENING_SLOTS = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'];

const BOOKED_SLOTS = new Set(['10:30 AM', '2:30 PM', '5:30 PM']);

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function shortDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
}

function AnimatedCheck() {
  return (
    <div className="flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-500">
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="226"
          strokeDashoffset="0"
          style={{ animation: 'drawCircle 0.6s ease-out forwards' }}
        />
        <polyline
          points="24,42 35,53 56,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="50"
          strokeDashoffset="0"
          style={{ animation: 'drawCheck 0.4s 0.5s ease-out forwards' }}
        />
      </svg>
      <style>{`
        @keyframes drawCircle {
          from { stroke-dashoffset: 226; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 50; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function BookPage() {
  const router = useRouter();
  const [lead, setLead] = useState<ReturnType<typeof storage.getLead>>(null);
  const [qualified, setQualified] = useState<ReturnType<typeof storage.getQualified>>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Generate next 7 days
  const dates = useMemo(() => {
    const result: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d);
    }
    return result;
  }, []);

  useEffect(() => {
    setLead(storage.getLead());
    setQualified(storage.getQualified());
    // Default: select tomorrow
    setSelectedDate(dates[0]);
    setLoaded(true);
  }, [dates]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot || !lead) return;
    setBooking(true);

    const maskedPhone = `98XXXXX${lead.phone.slice(-3)}`;
    storage.setBooking({
      date: formatDate(selectedDate),
      time: selectedSlot,
      leadName: lead.name,
      leadPhone: maskedPhone,
      budget: qualified?.answers?.[0] ?? 'N/A',
    });

    await new Promise((r) => setTimeout(r, 1500));
    setBooking(false);
    setConfirmed(true);
  };

  const maskedPhone = lead ? `98XXXXX${lead.phone.slice(-3)}` : '98XXXXXXX';
  const budget = qualified?.answers?.[0] ?? 'N/A';

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-48px)]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // SUCCESS screen
  if (confirmed && selectedDate && selectedSlot && lead) {
    return (
      <div className="min-h-[calc(100vh-48px)] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          {/* Animated checkmark */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <AnimatedCheck />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Appointment Confirmed!</h1>
            <p className="text-gray-500 text-sm mt-1">The client has been notified.</p>

            {/* Booking details */}
            <div className="bg-gray-50 rounded-xl p-4 mt-5 text-left space-y-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <CalendarDays size={14} className="text-gray-400" />
                  Date
                </span>
                <span className="font-semibold text-gray-900">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} className="text-gray-400" />
                  Time
                </span>
                <span className="font-semibold text-gray-900">{selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <User size={14} className="text-gray-400" />
                  Client
                </span>
                <span className="font-semibold text-gray-900">{lead.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Phone size={14} className="text-gray-400" />
                  Phone
                </span>
                <span className="font-semibold text-gray-900">{maskedPhone}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <DollarSign size={14} className="text-gray-400" />
                  Budget
                </span>
                <span className="font-semibold text-gray-900">{budget}</span>
              </div>
            </div>

            {/* Confirmation notices */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 justify-center text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp confirmation sent to {maskedPhone}</span>
              </div>
              <div className="flex items-center gap-2 justify-center text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Added to Google Calendar</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push('/demo/dashboard')}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200"
            >
              View Dashboard
            </button>
            <button
              onClick={() => {
                storage.clearAll();
                router.push('/demo');
              }}
              className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 rounded-xl transition-all duration-200"
            >
              ↺ Start New Demo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-48px)] py-8 px-4">
      <div className="max-w-lg mx-auto space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Book Appointment
            {lead?.name ? ` — ${lead.name}` : ''}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Select a date and time for your test drive or showroom appointment.
          </p>
        </div>

        {/* Date picker */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Choose a Date</h2>
          <div className="flex flex-wrap gap-2">
            {dates.map((date) => {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : isWeekend
                      ? 'border-gray-100 text-gray-400 bg-gray-50 hover:bg-gray-100'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {shortDate(date)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots (shown when date selected) */}
        {selectedDate && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Choose a Time</h2>
              <span className="flex items-center gap-1 text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full">
                <Zap size={11} />
                Slots fill up fast
              </span>
            </div>

            {[
              { label: 'Morning', slots: MORNING_SLOTS },
              { label: 'Afternoon', slots: AFTERNOON_SLOTS },
              { label: 'Evening', slots: EVENING_SLOTS },
            ].map(({ label, slots }) => (
              <div key={label} className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {slots.map((slot) => {
                    const isBooked = BOOKED_SLOTS.has(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          isBooked
                            ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {isBooked ? `${slot} ✗` : slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appointment preview */}
        {selectedDate && selectedSlot && (
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Appointment Preview</h2>
            <div className="space-y-2.5">
              {[
                { Icon: CalendarDays, label: formatDate(selectedDate) },
                { Icon: Clock,        label: selectedSlot },
                { Icon: User,         label: lead?.name ?? 'Lead' },
                { Icon: Phone,        label: maskedPhone },
                { Icon: DollarSign,   label: `Budget: ${budget}` },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Icon size={14} className="text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm button */}
        {selectedDate && selectedSlot && (
          <button
            onClick={handleConfirm}
            disabled={booking}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {booking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Booking...
              </>
            ) : (
              'Confirm Appointment'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
