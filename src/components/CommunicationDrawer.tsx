import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Paperclip, Check, AlertCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Mode } from '../App';

interface CommunicationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
  mode: Mode;
}

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  type: 'message' | 'decision' | 'approval';
  urgent?: boolean;
}

export function CommunicationDrawer({ isOpen, onClose, taskTitle, mode }: CommunicationDrawerProps) {
  const isDark = mode !== 'Focus';
  const [messages] = useState<Message[]>([
    {
      id: 1,
      author: 'Roi Santos',
      content: 'I think we should prioritize the financial projections section first.',
      timestamp: '2m ago',
      type: 'message',
    },
    {
      id: 2,
      author: 'Marcus Rodriguez',
      content: 'Agreed. I can have the data analysis ready by EOD.',
      timestamp: '1m ago',
      type: 'message',
      urgent: true,
    },
    {
      id: 3,
      author: 'Elena Kowalski',
      content: 'Do we need approval from Finance before proceeding?',
      timestamp: '30s ago',
      type: 'approval',
    },
  ]);

  const [messageInput, setMessageInput] = useState('');

  // Filter messages based on mode
  const filteredMessages = messages.filter(msg => {
    if (mode === 'Sprint') return msg.urgent || msg.type === 'approval';
    if (mode === 'Focus') return msg.type === 'approval' || msg.type === 'decision';
    return true; // Chill mode shows all in read-only
  });

  const handleSend = () => {
    if (messageInput.trim()) {
      // In real app, send message
      setMessageInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className={`fixed right-0 top-0 h-full w-[400px] z-50 shadow-2xl ${
              mode === 'Chill'
                ? 'bg-white'
                : isDark
                ? 'bg-neutral-900 border-l border-red-500/20'
                : 'bg-white border-l border-neutral-300/30'
            }`}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`p-6 border-b ${
                mode === 'Chill' ? 'border-[rgba(108,168,255,0.15)]' : isDark ? 'border-neutral-800' : 'border-neutral-200'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className={`w-5 h-5 ${
                      mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-blue-500' : 'text-neutral-600'
                    }`} />
                    <h2 className={`text-lg ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                      Task Discussion
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg ${
                      mode === 'Chill' ? 'hover:bg-neutral-100' : isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                    }`}
                  >
                    <X className={`w-5 h-5 ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`} />
                  </button>
                </div>
                <p className={`text-sm ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {taskTitle}
                </p>

                {/* Mode-specific banner */}
                {mode === 'Sprint' && (
                  <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-400">Only urgent messages shown</span>
                  </div>
                )}
                {mode === 'Chill' && (
                  <div className="mt-3 p-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-blue-700">Read-only mode · Reply when ready</span>
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`p-4 rounded-2xl ${
                      message.type === 'approval'
                        ? mode === 'Chill'
                          ? 'bg-orange-50 border border-orange-200'
                          : 'bg-orange-500/10 border border-orange-500/30'
                        : mode === 'Chill'
                        ? 'bg-[rgba(108,168,255,0.08)]'
                        : isDark
                        ? 'bg-neutral-800/50'
                        : 'bg-neutral-50'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-sm ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {message.author}
                      </span>
                      <span className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                        {message.timestamp}
                      </span>
                    </div>
                    <p className={`text-sm ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {message.content}
                    </p>

                    {/* Approval Actions */}
                    {message.type === 'approval' && mode !== 'Chill' && (
                      <div className="flex gap-2 mt-3">
                        <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 ${
                          mode === 'Sprint' ? 'bg-red-500 text-white' : 'bg-green-600 text-white'
                        }`}>
                          <Check className="w-3 h-3" />
                          Approve
                        </button>
                        <button className={`flex-1 px-3 py-1.5 rounded-lg text-xs ${
                          isDark ? 'bg-neutral-700 text-white' : 'bg-neutral-200 text-neutral-900'
                        }`}>
                          Review
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}

                {filteredMessages.length === 0 && (
                  <div className="text-center py-8">
                    <MessageCircle className={`w-12 h-12 mx-auto mb-3 ${
                      mode === 'Chill' ? 'text-[#7888A0]' : isDark ? 'text-neutral-600' : 'text-neutral-400'
                    }`} />
                    <p className={`text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                      {mode === 'Sprint' ? 'No urgent messages' : 'No messages yet'}
                    </p>
                  </div>
                )}
              </div>

              {/* Input */}
              {mode !== 'Chill' && (
                <div className={`p-4 border-t ${
                  mode === 'Chill' ? 'border-[rgba(108,168,255,0.15)]' : isDark ? 'border-neutral-800' : 'border-neutral-200'
                }`}>
                  <div className={`flex items-center gap-2 p-3 rounded-xl ${
                    mode === 'Chill'
                      ? 'bg-white border border-[rgba(108,168,255,0.15)]'
                      : isDark
                      ? 'bg-neutral-800/50 border border-red-500/20'
                      : 'bg-neutral-50 border border-neutral-200'
                  }`}>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Type a message..."
                      className={`flex-1 bg-transparent outline-none text-sm ${
                        mode === 'Chill'
                          ? 'text-[#1E2A40] placeholder-[#7888A0]'
                          : isDark
                          ? 'text-white placeholder-neutral-500'
                          : 'text-neutral-900 placeholder-neutral-400'
                      }`}
                    />
                    <button className={`p-2 rounded-lg ${
                      isDark ? 'hover:bg-neutral-700' : 'hover:bg-neutral-200'
                    }`}>
                      <Paperclip className={`w-4 h-4 ${mode === 'Chill' ? 'text-[#7888A0]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={!messageInput.trim()}
                      className={`p-2 rounded-lg ${
                        mode === 'Sprint'
                          ? 'bg-red-500 text-white'
                          : mode === 'Chill'
                          ? 'bg-[#6CA8FF] text-white'
                          : 'bg-neutral-700 text-white'
                      } disabled:opacity-40`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-2">
                    <button className={`px-3 py-1.5 rounded-lg text-xs ${
                      mode === 'Chill'
                        ? 'bg-[rgba(108,168,255,0.12)] text-[#3A4A62]'
                        : isDark
                        ? 'bg-neutral-800 text-neutral-400'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      Decision Summary
                    </button>
                    <button className={`px-3 py-1.5 rounded-lg text-xs ${
                      mode === 'Chill'
                        ? 'bg-[rgba(108,168,255,0.12)] text-[#3A4A62]'
                        : isDark
                        ? 'bg-neutral-800 text-neutral-400'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}>
                      Request Approval
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}