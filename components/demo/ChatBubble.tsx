'use client';

interface TypingIndicatorProps {
  show: boolean;
}

function TypingIndicator({ show }: TypingIndicatorProps) {
  if (!show) return null;
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 bg-gray-400 rounded-full inline-block"
            style={{
              animation: 'bounce 1.2s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface ChatBubbleProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isAgent?: boolean;
}

export default function ChatBubble({ role, content, timestamp, isAgent }: ChatBubbleProps) {
  if (role === 'system') {
    return (
      <div className="flex justify-center my-3">
        <span className="text-xs text-gray-500 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
          {content}
        </span>
      </div>
    );
  }

  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {isAgent && !isUser && (
          <span className="text-[10px] text-gray-400 mb-1 px-1">👤 Agent</span>
        )}
        <div
          className={`px-4 py-2.5 shadow-sm ${
            isUser
              ? 'rounded-2xl rounded-tr-sm text-gray-900 text-sm'
              : 'rounded-2xl rounded-tl-sm bg-white text-gray-800 text-sm'
          }`}
          style={isUser ? { backgroundColor: '#dcf8c6' } : {}}
        >
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
        <span className="text-[10px] text-gray-400 mt-0.5 px-1">{timestamp}</span>
      </div>
    </div>
  );
}

export { TypingIndicator };
