import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Users, FileText, AlertCircle, Sparkles, Lock, Pin, ChevronDown } from 'lucide-react';
import { Mode } from '../../App';
import { useState, useEffect, useRef } from 'react';
import { MessageCard } from './MessageCard';
import { MessageComposer } from './MessageComposer';
import { SmartSummary } from './SmartSummary';
import { conversationManager, Message } from '../../utils/conversationManager';

interface ThreadPanelProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  projectName: string;
  assignees: string[];
  status: string;
  mode: Mode;
  currentUserRole: 'member' | 'pm';
  syncModeActive: boolean;
}

export function ThreadPanel({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  projectName,
  assignees,
  status,
  mode,
  currentUserRole,
  syncModeActive,
}: ThreadPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages from conversation manager when taskId changes
  useEffect(() => {
    if (isOpen && taskId) {
      const conversation = conversationManager.getConversation(taskId);
      setMessages(conversation.messages);
      // Mark as read when opened
      conversationManager.markAsRead(taskId);
    }
  }, [isOpen, taskId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-show summary if thread is long
  useEffect(() => {
    if (messages.length > 10 && currentUserRole === 'pm') {
      setShowSummary(true);
    }
  }, [messages.length, currentUserRole]);

  const handleSendMessage = (content: string, type: Message['type'], attachment?: any) => {
    const authorName = currentUserRole === 'pm' ? 'Shane Binuya (PM)' : 'Current User';
    
    const newMessage = conversationManager.addMessage(taskId, {
      type,
      author: authorName,
      authorRole: currentUserRole,
      content,
      timestamp: new Date(),
      attachment,
    });

    setMessages(conversationManager.getMessages(taskId));
  };

  const getThreadState = () => {
    if (!syncModeActive) return 'normal';
    
    if (mode === 'Sprint') return 'condensed';
    if (mode === 'Focus') return 'muted';
    if (mode === 'Chill') return 'open';
    return 'normal';
  };

  const threadState = getThreadState();
  
  // Sprint mode shows critical messages, but thread is still interactive
  // Chill mode shows all messages with relaxed styling
  // Focus mode is the only one that's truly muted
  const filteredMessages = threadState === 'condensed' 
    ? messages.filter(m => m.type === 'blocker' || m.type === 'decision' || m.isPinned)
    : messages;

  // Filter private PM notes for members
  const visibleMessages = currentUserRole === 'member'
    ? filteredMessages.filter(m => !m.isPrivate)
    : filteredMessages;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={`fixed right-0 top-0 h-full w-[480px] z-50 flex flex-col shadow-2xl ${
              mode === 'Sprint'
                ? 'bg-neutral-900/95 border-l border-red-500/20'
                : mode === 'Focus'
                ? 'bg-white/95 border-l border-neutral-200'
                : 'bg-gradient-to-br from-blue-50/95 to-purple-50/95 border-l border-blue-200/50'
            } backdrop-blur-xl`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              mode === 'Sprint'
                ? 'border-neutral-800 bg-neutral-900/60'
                : mode === 'Focus'
                ? 'border-neutral-200 bg-neutral-50/50'
                : 'border-blue-200/50 bg-white/50'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className={`w-5 h-5 ${
                      mode === 'Sprint' ? 'text-red-400' :
                      mode === 'Focus' ? 'text-neutral-600' :
                      'text-blue-500'
                    }`} />
                    <h2 className={mode === 'Focus' ? 'text-neutral-900' : 'text-white'}>
                      Discussion
                    </h2>
                  </div>
                  <h3 className={`mb-2 ${
                    mode === 'Focus' ? 'text-neutral-800' : 'text-neutral-300'
                  }`}>
                    {taskTitle}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`flex items-center gap-1 ${
                      mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      <FileText className="w-4 h-4" />
                      {projectName}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      status === 'In Progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : status === 'Blocked'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    mode === 'Sprint'
                      ? 'hover:bg-neutral-800 text-neutral-400'
                      : mode === 'Focus'
                      ? 'hover:bg-neutral-200 text-neutral-600'
                      : 'hover:bg-white/50 text-blue-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Assignees */}
              <div className="flex items-center gap-2">
                <Users className={`w-4 h-4 ${
                  mode === 'Focus' ? 'text-neutral-500' : 'text-neutral-400'
                }`} />
                <div className="flex -space-x-2">
                  {assignees.map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-white"
                    />
                  ))}
                </div>
                <span className={`text-sm ${
                  mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  {assignees.length} members
                </span>
              </div>

              {/* Sync Mode Indicator */}
              {syncModeActive && (
                <motion.div
                  className={`mt-3 px-3 py-2 rounded-lg flex items-center gap-2 ${
                    threadState === 'condensed'
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : threadState === 'muted'
                      ? 'bg-neutral-500/20 border border-neutral-500/30'
                      : 'bg-blue-500/20 border border-blue-500/30'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {threadState === 'condensed' && 'Critical messages only (Sprint Mode)'}
                    {threadState === 'muted' && 'Thread muted (Focus Mode)'}
                    {threadState === 'open' && 'Relaxed discussion mode'}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Smart Summary */}
            <AnimatePresence>
              {showSummary && (
                <SmartSummary
                  messages={messages}
                  onClose={() => setShowSummary(false)}
                  mode={mode}
                />
              )}
            </AnimatePresence>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={`flex-1 overflow-y-auto p-6 space-y-4 ${
                threadState === 'muted' ? 'opacity-60' : 'opacity-100'
              }`}
            >
              {visibleMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className={`w-12 h-12 mx-auto mb-4 ${
                    mode === 'Focus' ? 'text-neutral-400' : 'text-neutral-600'
                  }`} />
                  <p className={mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'}>
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                visibleMessages.map((message) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    mode={mode}
                    currentUserRole={currentUserRole}
                    onReact={(emoji) => {
                      setMessages(messages.map(m => {
                        if (m.id === message.id) {
                          const reactions = m.reactions || [];
                          const existing = reactions.find(r => r.emoji === emoji);
                          if (existing) {
                            existing.count++;
                          } else {
                            reactions.push({ emoji, count: 1 });
                          }
                          return { ...m, reactions };
                        }
                        return m;
                      }));
                    }}
                  />
                ))
              )}
            </div>

            {/* Composer */}
            <MessageComposer
              mode={mode}
              currentUserRole={currentUserRole}
              onSend={handleSendMessage}
              disabled={threadState === 'muted'}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}