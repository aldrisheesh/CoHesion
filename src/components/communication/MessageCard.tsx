import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Lock, 
  Pin,
  Paperclip,
  MoreVertical,
  Reply,
  Copy,
  Shield
} from 'lucide-react';
import { Mode } from '../../App';
import { useState } from 'react';

interface Message {
  id: string;
  type: 'standard' | 'decision' | 'blocker' | 'ai-summary' | 'pm-broadcast' | 'attachment';
  author: string;
  authorRole: 'member' | 'pm' | 'ai';
  content: string;
  timestamp: Date;
  isPrivate?: boolean;
  isPinned?: boolean;
  reactions?: { emoji: string; count: number }[];
  attachment?: {
    type: string;
    name: string;
    url: string;
  };
}

interface MessageCardProps {
  message: Message;
  mode: Mode;
  currentUserRole: 'member' | 'pm';
  onReact: (emoji: string) => void;
}

export function MessageCard({ message, mode, currentUserRole, onReact }: MessageCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getMessageStyle = () => {
    const baseClasses = 'p-4 rounded-xl relative group';
    
    // Type-specific styling
    if (message.type === 'decision') {
      return `${baseClasses} border-2 ${
        mode === 'Focus'
          ? 'bg-amber-50 border-amber-300'
          : 'bg-amber-500/10 border-amber-500/30'
      }`;
    }
    
    if (message.type === 'blocker') {
      return `${baseClasses} border-2 ${
        mode === 'Focus'
          ? 'bg-red-50 border-red-300'
          : 'bg-red-500/10 border-red-500/30'
      }`;
    }
    
    if (message.type === 'pm-broadcast') {
      return `${baseClasses} border ${
        mode === 'Focus'
          ? 'bg-violet-50 border-violet-300'
          : 'bg-violet-500/10 border-violet-500/30'
      }`;
    }
    
    if (message.type === 'ai-summary') {
      return `${baseClasses} border ${
        mode === 'Focus'
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
          : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20'
      }`;
    }

    // Role-specific styling
    if (message.authorRole === 'pm') {
      return `${baseClasses} border ${
        mode === 'Focus'
          ? 'bg-white border-violet-200'
          : 'bg-neutral-800/60 border-violet-500/20'
      }`;
    }
    
    // Standard member message
    return `${baseClasses} ${
      mode === 'Focus'
        ? 'bg-neutral-50 border border-neutral-200'
        : 'bg-neutral-800/40 border border-neutral-700/50'
    }`;
  };

  const getTypeIcon = () => {
    switch (message.type) {
      case 'decision':
        return <CheckCircle className="w-4 h-4 text-amber-500" />;
      case 'blocker':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'ai-summary':
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case 'pm-broadcast':
        return <Shield className="w-4 h-4 text-violet-500" />;
      default:
        return null;
    }
  };

  const quickReactions = ['👍', '👀', '✅', '❤️', '🎉'];

  return (
    <motion.div
      className={getMessageStyle()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactions(false);
      }}
    >
      {/* Pinned Indicator */}
      {message.isPinned && (
        <div className="absolute -top-2 -right-2">
          <div className={`p-1.5 rounded-full ${
            mode === 'Focus' ? 'bg-violet-500' : 'bg-violet-500'
          }`}>
            <Pin className="w-3 h-3 text-white" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className={`w-8 h-8 rounded-full ${
            message.authorRole === 'pm'
              ? 'bg-gradient-to-br from-violet-500 to-purple-600'
              : message.authorRole === 'ai'
              ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
              : 'bg-gradient-to-br from-neutral-500 to-neutral-600'
          } flex items-center justify-center text-white text-xs`}>
            {message.author[0]}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${
                mode === 'Focus' ? 'text-neutral-900' : 'text-white'
              }`}>
                {message.author}
              </span>
              {message.authorRole === 'pm' && (
                <span className="px-2 py-0.5 rounded text-xs bg-violet-500/20 text-violet-400">
                  PM
                </span>
              )}
              {message.isPrivate && (
                <Lock className="w-3 h-3 text-neutral-500" />
              )}
              {getTypeIcon()}
            </div>
            <span className={`text-xs ${
              mode === 'Focus' ? 'text-neutral-500' : 'text-neutral-500'
            }`}>
              {getTimeAgo(message.timestamp)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                className={`p-1.5 rounded hover:bg-black/10 transition-colors ${
                  mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
                }`}
                onClick={() => setShowReactions(!showReactions)}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded hover:bg-black/10 transition-colors ${
                  mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
                }`}
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Type Badge */}
      {message.type !== 'standard' && (
        <div className="mb-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs uppercase tracking-wide ${
            message.type === 'decision'
              ? 'bg-amber-500/20 text-amber-600'
              : message.type === 'blocker'
              ? 'bg-red-500/20 text-red-600'
              : message.type === 'pm-broadcast'
              ? 'bg-violet-500/20 text-violet-600'
              : 'bg-blue-500/20 text-blue-600'
          }`}>
            {getTypeIcon()}
            {message.type.replace('-', ' ')}
          </span>
        </div>
      )}

      {/* Content */}
      <p className={`text-sm mb-3 ${
        mode === 'Focus' ? 'text-neutral-800' : 'text-neutral-200'
      }`}>
        {message.content}
      </p>

      {/* Attachment */}
      {message.attachment && (
        <div className={`p-3 rounded-lg border flex items-center gap-3 mb-3 ${
          mode === 'Focus'
            ? 'bg-white border-neutral-200'
            : 'bg-neutral-800/60 border-neutral-700'
        }`}>
          <Paperclip className={`w-4 h-4 ${
            mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
          }`} />
          <div className="flex-1">
            <p className={`text-sm ${
              mode === 'Focus' ? 'text-neutral-900' : 'text-white'
            }`}>
              {message.attachment.name}
            </p>
            <p className={`text-xs ${
              mode === 'Focus' ? 'text-neutral-500' : 'text-neutral-500'
            }`}>
              {message.attachment.type}
            </p>
          </div>
        </div>
      )}

      {/* Reactions */}
      {message.reactions && message.reactions.length > 0 && (
        <div className="flex items-center gap-2 mb-2">
          {message.reactions.map((reaction, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${
                mode === 'Focus'
                  ? 'bg-neutral-100 hover:bg-neutral-200'
                  : 'bg-neutral-700/50 hover:bg-neutral-700'
              }`}
              onClick={() => onReact(reaction.emoji)}
            >
              <span>{reaction.emoji}</span>
              <span className={mode === 'Focus' ? 'text-neutral-700' : 'text-neutral-300'}>
                {reaction.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Quick Reaction Picker */}
      <AnimatePresence>
        {showReactions && (
          <motion.div
            className={`absolute bottom-full right-0 mb-2 p-2 rounded-lg border shadow-lg flex gap-1 ${
              mode === 'Focus'
                ? 'bg-white border-neutral-200'
                : 'bg-neutral-800 border-neutral-700'
            }`}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
          >
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-lg"
                onClick={() => {
                  onReact(emoji);
                  setShowReactions(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blocker Quick Actions */}
      {message.type === 'blocker' && currentUserRole === 'pm' && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 px-3 py-2 rounded-lg text-xs bg-red-500 hover:bg-red-600 text-white transition-colors">
            Escalate
          </button>
          <button className="flex-1 px-3 py-2 rounded-lg text-xs bg-green-500 hover:bg-green-600 text-white transition-colors">
            Resolve
          </button>
        </div>
      )}
    </motion.div>
  );
}