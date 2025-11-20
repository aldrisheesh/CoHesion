import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Smile, Zap, Tag, AlertTriangle, Sparkles } from 'lucide-react';
import { Mode } from '../../App';
import { useState, useRef } from 'react';

interface MessageComposerProps {
  mode: Mode;
  currentUserRole: 'member' | 'pm';
  onSend: (content: string, type: any, attachment?: any) => void;
  disabled?: boolean;
}

export function MessageComposer({ mode, currentUserRole, onSend, disabled }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [messageType, setMessageType] = useState<'standard' | 'decision' | 'blocker' | 'pm-broadcast'>('standard');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const slashCommands = [
    { 
      command: '/decision', 
      label: 'Mark as Decision', 
      icon: Zap, 
      color: 'amber',
      available: currentUserRole === 'pm'
    },
    { 
      command: '/blocker', 
      label: 'Flag as Blocker', 
      icon: AlertTriangle, 
      color: 'red',
      available: true
    },
    { 
      command: '/broadcast', 
      label: 'PM Broadcast', 
      icon: Sparkles, 
      color: 'violet',
      available: currentUserRole === 'pm'
    },
  ];

  const handleInput = (value: string) => {
    setMessage(value);
    
    // Detect slash commands
    if (value.startsWith('/')) {
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }
  };

  const handleCommand = (command: string) => {
    if (command === '/decision') {
      setMessageType('decision');
    } else if (command === '/blocker') {
      setMessageType('blocker');
    } else if (command === '/broadcast') {
      setMessageType('pm-broadcast');
    }
    
    setMessage('');
    setShowCommands(false);
    textareaRef.current?.focus();
  };

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    
    onSend(message, messageType);
    setMessage('');
    setMessageType('standard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const availableCommands = slashCommands.filter(cmd => cmd.available);

  return (
    <div className={`p-4 border-t ${
      mode === 'Sprint'
        ? 'border-neutral-800 bg-neutral-900/60'
        : mode === 'Focus'
        ? 'border-neutral-200 bg-neutral-50/50'
        : 'border-blue-200/50 bg-white/50'
    }`}>
      {/* Type Indicator */}
      <AnimatePresence>
        {messageType !== 'standard' && (
          <motion.div
            className={`mb-2 px-3 py-2 rounded-lg flex items-center justify-between ${
              messageType === 'decision'
                ? 'bg-amber-500/20 border border-amber-500/30'
                : messageType === 'blocker'
                ? 'bg-red-500/20 border border-red-500/30'
                : 'bg-violet-500/20 border border-violet-500/30'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className={`text-sm ${
              messageType === 'decision' ? 'text-amber-600' :
              messageType === 'blocker' ? 'text-red-600' :
              'text-violet-600'
            }`}>
              {messageType === 'decision' && '⚡ Marking as Decision'}
              {messageType === 'blocker' && '⚠️ Flagging as Blocker'}
              {messageType === 'pm-broadcast' && '📢 PM Broadcast'}
            </span>
            <button
              onClick={() => setMessageType('standard')}
              className={`text-xs ${
                messageType === 'decision' ? 'text-amber-600' :
                messageType === 'blocker' ? 'text-red-600' :
                'text-violet-600'
              } hover:underline`}
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slash Commands Menu */}
      <AnimatePresence>
        {showCommands && availableCommands.length > 0 && (
          <motion.div
            className={`mb-2 p-2 rounded-lg border space-y-1 ${
              mode === 'Focus'
                ? 'bg-white border-neutral-200'
                : 'bg-neutral-800 border-neutral-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {availableCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.command}
                  onClick={() => handleCommand(cmd.command)}
                  className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 transition-colors ${
                    mode === 'Focus'
                      ? 'hover:bg-neutral-100'
                      : 'hover:bg-neutral-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 text-${cmd.color}-500`} />
                  <div className="flex-1">
                    <div className={`text-sm ${
                      mode === 'Focus' ? 'text-neutral-900' : 'text-white'
                    }`}>
                      {cmd.label}
                    </div>
                    <div className={`text-xs ${
                      mode === 'Focus' ? 'text-neutral-500' : 'text-neutral-500'
                    }`}>
                      {cmd.command}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className={`flex items-end gap-2 p-3 rounded-xl border ${
        mode === 'Sprint'
          ? 'bg-neutral-800/60 border-neutral-700'
          : mode === 'Focus'
          ? 'bg-white border-neutral-300'
          : 'bg-white/80 border-blue-200'
      } ${disabled ? 'opacity-50' : ''}`}>
        {/* Toolbar */}
        <div className="flex items-center gap-1 pb-1">
          <button
            className={`p-2 rounded hover:bg-black/5 transition-colors ${
              mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
            }`}
            disabled={disabled}
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            className={`p-2 rounded hover:bg-black/5 transition-colors ${
              mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
            }`}
            disabled={disabled}
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => handleInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={
            disabled
              ? 'Muted during Focus Mode...'
              : mode === 'Sprint'
              ? 'Quick message... (/ for commands)'
              : mode === 'Chill'
              ? 'Share your thoughts... (/ for commands)'
              : 'Type a message... (/ for commands)'
          }
          disabled={disabled}
          className={`flex-1 bg-transparent outline-none resize-none text-sm ${
            mode === 'Focus' ? 'text-neutral-900 placeholder-neutral-400' : 'text-white placeholder-neutral-500'
          }`}
          rows={2}
        />

        {/* Send Button */}
        <motion.button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`p-3 rounded-lg transition-all ${
            message.trim() && !disabled
              ? mode === 'Sprint'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : mode === 'Focus'
                ? 'bg-neutral-800 hover:bg-neutral-900 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              : mode === 'Focus'
              ? 'bg-neutral-200 text-neutral-400'
              : 'bg-neutral-700 text-neutral-500'
          } disabled:cursor-not-allowed`}
          whileHover={message.trim() && !disabled ? { scale: 1.05 } : {}}
          whileTap={message.trim() && !disabled ? { scale: 0.95 } : {}}
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Helper Text */}
      <p className={`text-xs mt-2 ${
        mode === 'Focus' ? 'text-neutral-500' : 'text-neutral-500'
      }`}>
        Type <span className="font-mono">/</span> for commands · 
        <span className="font-mono"> Enter</span> to send · 
        <span className="font-mono"> Shift+Enter</span> for new line
      </p>
    </div>
  );
}