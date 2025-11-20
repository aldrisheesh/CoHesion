import { motion } from 'motion/react';
import { Sparkles, X, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Mode } from '../../App';

interface Message {
  id: string;
  type: 'standard' | 'decision' | 'blocker' | 'ai-summary' | 'pm-broadcast' | 'attachment';
  author: string;
  authorRole: 'member' | 'pm' | 'ai';
  content: string;
  timestamp: Date;
}

interface SmartSummaryProps {
  messages: Message[];
  onClose: () => void;
  mode: Mode;
}

export function SmartSummary({ messages, onClose, mode }: SmartSummaryProps) {
  // Extract key information from messages
  const decisions = messages.filter(m => m.type === 'decision');
  const blockers = messages.filter(m => m.type === 'blocker');
  const activeBlockers = blockers.filter(m => {
    // Simulate blocker resolution logic
    return !m.content.toLowerCase().includes('resolved');
  });

  const mainUpdates = [
    'API integration work in progress by Sarah',
    'Design assets pending - blocking frontend work',
    'REST API approach approved over GraphQL',
  ];

  const nextSteps = [
    'Provide design assets to unblock Mike',
    'Continue API integration implementation',
    'Review REST API progress by EOD',
  ];

  return (
    <motion.div
      className={`mx-6 mt-4 mb-2 p-4 rounded-xl border ${
        mode === 'Sprint'
          ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20'
          : mode === 'Focus'
          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
          : 'bg-gradient-to-br from-blue-100/80 to-purple-100/80 border-blue-300'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${
            mode === 'Focus' ? 'bg-blue-500' : 'bg-blue-500/20'
          }`}>
            <Sparkles className={`w-4 h-4 ${
              mode === 'Focus' ? 'text-white' : 'text-blue-400'
            }`} />
          </div>
          <div>
            <h3 className={`text-sm ${
              mode === 'Focus' ? 'text-neutral-900' : 'text-white'
            }`}>
              AI-Generated Summary
            </h3>
            <p className={`text-xs ${
              mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
            }`}>
              {messages.length} messages analyzed
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:bg-black/10 transition-colors ${
            mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Updates */}
      <div className="mb-3">
        <h4 className={`text-xs uppercase tracking-wide mb-2 ${
          mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
        }`}>
          Main Updates
        </h4>
        <ul className="space-y-1">
          {mainUpdates.map((update, i) => (
            <li
              key={i}
              className={`text-sm flex items-start gap-2 ${
                mode === 'Focus' ? 'text-neutral-800' : 'text-neutral-200'
              }`}
            >
              <span className="text-blue-500 mt-0.5">•</span>
              {update}
            </li>
          ))}
        </ul>
      </div>

      {/* Decisions */}
      {decisions.length > 0 && (
        <div className="mb-3">
          <h4 className={`text-xs uppercase tracking-wide mb-2 flex items-center gap-2 ${
            mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <CheckCircle className="w-3 h-3" />
            Decisions ({decisions.length})
          </h4>
          <ul className="space-y-1">
            {decisions.map((decision) => (
              <li
                key={decision.id}
                className={`text-sm flex items-start gap-2 ${
                  mode === 'Focus' ? 'text-amber-700' : 'text-amber-400'
                }`}
              >
                <span className="mt-0.5">✓</span>
                {decision.content.slice(0, 60)}...
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Active Blockers */}
      {activeBlockers.length > 0 && (
        <div className="mb-3">
          <h4 className={`text-xs uppercase tracking-wide mb-2 flex items-center gap-2 ${
            mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
          }`}>
            <AlertTriangle className="w-3 h-3 text-red-500" />
            Remaining Blockers ({activeBlockers.length})
          </h4>
          <ul className="space-y-1">
            {activeBlockers.map((blocker) => (
              <li
                key={blocker.id}
                className={`text-sm flex items-start gap-2 ${
                  mode === 'Focus' ? 'text-red-700' : 'text-red-400'
                }`}
              >
                <span className="mt-0.5">!</span>
                {blocker.content.slice(0, 60)}...
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Steps */}
      <div>
        <h4 className={`text-xs uppercase tracking-wide mb-2 ${
          mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'
        }`}>
          Suggested Next Steps
        </h4>
        <ul className="space-y-1">
          {nextSteps.map((step, i) => (
            <li
              key={i}
              className={`text-sm flex items-start gap-2 ${
                mode === 'Focus' ? 'text-neutral-800' : 'text-neutral-200'
              }`}
            >
              <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
