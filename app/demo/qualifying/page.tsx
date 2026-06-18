'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import ChatBubble, { TypingIndicator } from '@/components/demo/ChatBubble';
import { storage } from '@/lib/storage';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

function getTime(): string {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

// The scripted demo conversation — no API needed
const buildScript = (leadName: string) => [
  {
    role: 'assistant' as const,
    content: `Hello ${leadName}! 👋\n\nI'm the AI assistant for Premium Tricity Properties.\n\nI have a few quick questions to help our team find the perfect property for you. It'll only take 2 minutes.`,
  },
  {
    role: 'assistant' as const,
    content: 'What is your approximate budget?',
  },
  {
    role: 'user' as const,
    content: 'Around 1 crore',
  },
  {
    role: 'assistant' as const,
    content: 'Thank you. That gives us a good starting point.\n\nWhen are you looking to buy?',
  },
  {
    role: 'user' as const,
    content: 'Within 3 months',
  },
  {
    role: 'assistant' as const,
    content: 'Perfect.\n\nWhich area are you primarily interested in?',
  },
  {
    role: 'user' as const,
    content: 'Mohali',
  },
  {
    role: 'assistant' as const,
    content: 'Great choice.\n\nAre you looking for residential or commercial property? Ready-to-move or under construction?',
  },
  {
    role: 'user' as const,
    content: 'Residential, ready-to-move',
  },
  {
    role: 'assistant' as const,
    content: 'Understood.\n\nHave you already visited any sites or spoken to other builders?',
  },
  {
    role: 'user' as const,
    content: 'Yes, visited a few projects already',
  },
  {
    role: 'assistant' as const,
    content:
      'Excellent.\n\nThank you for sharing these details.\n\nOur property advisor will review your requirements and contact you shortly with suitable options.',
    isLast: true,
  },
];

// Qualification data to store at completion
const DEMO_QUALIFIED_DATA = {
  budget: 'Around 1 crore',
  timeline: 'Within 3 months',
  location: 'Mohali',
  propertyType: 'Residential, ready-to-move',
  intent: 'Yes, visited a few projects already',
};

const DEMO_ANSWERS = [
  'Around 1 crore',
  'Within 3 months',
  'Mohali',
  'Residential, ready-to-move',
  'Yes, visited a few projects already',
];

export default function QualifyingPage() {
  const router = useRouter();
  const [lead, setLead] = useState<ReturnType<typeof storage.getLead>>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [toast, setToast] = useState('');
  const [initialized, setInitialized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }, []);

  const addMessage = useCallback(
    (role: Message['role'], content: string): Message => {
      const msg: Message = {
        id: Date.now().toString() + Math.random(),
        role,
        content,
        timestamp: getTime(),
      };
      setMessages((prev) => [...prev, msg]);
      return msg;
    },
    []
  );

  const handleCompletion = useCallback(
    (history: Array<{ role: 'user' | 'assistant'; content: string }>) => {
      setIsComplete(true);

      // Store qualification data to localStorage as specified
      if (typeof window !== 'undefined') {
        localStorage.setItem('leadiq_demo_qualified_detail', JSON.stringify(DEMO_QUALIFIED_DATA));
      }

      setTimeout(() => {
        addMessage('system', '✅ Qualification complete! Calculating intent score...');
        scrollToBottom();

        // Animate progress bar
        let p = 0;
        const interval = setInterval(() => {
          p += 2;
          setProgressBar(p);
          if (p >= 100) {
            clearInterval(interval);
            // Store using storage helpers
            storage.setConversation(history);
            storage.setQualified({ answers: DEMO_ANSWERS, conversationHistory: history });
            setTimeout(() => router.push('/demo/result'), 500);
          }
        }, 40);
      }, 1500);
    },
    [addMessage, router, scrollToBottom]
  );

  // Auto-playback the scripted conversation
  useEffect(() => {
    if (initialized) return;
    setInitialized(true);

    const leadData = storage.getLead();
    setLead(leadData);
    if (!leadData) return;

    if (playbackRef.current) return;
    playbackRef.current = true;

    const script = buildScript(leadData.name);
    const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    let delay = 1000; // First message appears after 1s

    const scheduleEntry = (entry: (typeof script)[number], index: number) => {
      if (entry.role === 'assistant') {
        // Show typing indicator 1.2s before AI message
        setTimeout(() => {
          setIsTyping(true);
          scrollToBottom();
        }, delay);
        delay += 1200;

        setTimeout(() => {
          setIsTyping(false);
          addMessage('assistant', entry.content);
          conversationHistory.push({ role: 'assistant', content: entry.content });
          scrollToBottom();

          // If this is the last message, trigger completion
          if ((entry as { isLast?: boolean }).isLast) {
            handleCompletion([...conversationHistory]);
          }
        }, delay);
        delay += 1000; // Pause after AI message before next event
      } else if (entry.role === 'user') {
        // User reply appears automatically after 800ms pause
        delay += 800;
        setTimeout(() => {
          addMessage('user', entry.content);
          conversationHistory.push({ role: 'user', content: entry.content });
          scrollToBottom();
        }, delay);
        delay += 600; // Small pause after user message
      }
    };

    script.forEach((entry, i) => scheduleEntry(entry, i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  if (!lead && initialized) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-48px)]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No lead data found. Please start from the form.</p>
          <button
            onClick={() => router.push('/demo')}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm"
          >
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  const initials =
    lead?.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? 'AI';

  return (
    <div className="flex flex-col h-[calc(100vh-48px)] max-w-2xl mx-auto">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-xl shadow-xl transition-all duration-300">
          {toast}
        </div>
      )}

      {/* WhatsApp-style header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0 shadow-md"
        style={{ backgroundColor: '#25D366' }}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initials}
        </div>

        {/* Name & status */}
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-sm truncate">{lead?.name ?? 'Lead'}</p>
          <p className="text-green-100 text-xs">LeadIQ AI • Online</p>
        </div>

        {/* Take Over Chat button — visual only */}
        <button
          onClick={() =>
            showToast('Conversation assigned to human advisor.')
          }
          className="flex items-center gap-1.5 text-xs font-medium border border-white text-white hover:bg-white/10 rounded-lg px-3 py-1.5 transition-all duration-200 flex-shrink-0"
        >
          <UserCircle className="w-3.5 h-3.5" />
          👤 Take Over Chat
        </button>
      </div>

      {/* Chat area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{
          backgroundColor: '#e5ddd5',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5b9b0' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}

        <TypingIndicator show={isTyping} />

        {/* Progress bar on completion */}
        {isComplete && progressBar > 0 && (
          <div className="mx-auto max-w-xs mt-4 mb-2">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-100"
                style={{ width: `${progressBar}%` }}
              />
            </div>
            <p className="text-center text-xs text-gray-500 mt-1">
              {progressBar < 100 ? 'Analysing responses...' : 'Complete!'}
            </p>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Read-only status bar — no input, purely observational */}
      <div className="bg-white px-4 py-3 border-t border-gray-100 flex items-center gap-2 flex-shrink-0">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-400 select-none">
          {isComplete ? '✅ Qualification complete' : '🤖 AI is qualifying this lead automatically...'}
        </div>
      </div>
    </div>
  );
}
