import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, AlertCircle, Coffee, Target, Shield, Brain, Heart } from 'lucide-react';
import { Mode, AppContextType } from '../App';
import { useState, useEffect } from 'react';

interface AIInsightsPanelProps {
  mode: Mode;
  currentTheme: any;
  onClose: () => void;
  context: AppContextType;
}

export function AIInsightsPanel({ mode, currentTheme, onClose, context }: AIInsightsPanelProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [energyLevel, setEnergyLevel] = useState(78);

  useEffect(() => {
    // Mode-specific AI insights
    const generateInsights = () => {
      const hour = new Date().getHours();
      const insights = [];

      if (mode === 'Sprint') {
        insights.push({
          type: 'blocker',
          icon: AlertCircle,
          title: 'Critical Blocker Detected',
          message: 'Budget approval is blocking 2 downstream tasks. Escalate now?',
          action: 'Escalate',
          tone: 'urgent',
        });
        insights.push({
          type: 'deadline',
          icon: Target,
          title: 'Deadline Risk Alert',
          message: 'Q4 Report completion at 65%. You need 2.5h more to hit today\'s deadline.',
          action: 'Prioritize',
          tone: 'critical',
        });
        insights.push({
          type: 'decision',
          icon: Brain,
          title: 'Rapid Decision Needed',
          message: '2 pending approvals are delaying team progress. Quick review?',
          action: 'Review Now',
          tone: 'urgent',
        });
      } else if (mode === 'Focus') {
        insights.push({
          type: 'focus_streak',
          icon: Shield,
          title: 'Deep Work Active',
          message: 'You\'ve maintained focus for 47 minutes. Keep going—peak productivity window.',
          action: null,
          tone: 'calm',
        });
        insights.push({
          type: 'distraction',
          icon: Sparkles,
          title: 'Distractions Blocked',
          message: '12 notifications batched. Your attention is protected.',
          action: null,
          tone: 'neutral',
        });
        insights.push({
          type: 'mental_load',
          icon: Brain,
          title: 'Mental Load: Moderate',
          message: 'Current task complexity is well-matched to your energy level.',
          action: null,
          tone: 'positive',
        });
      } else if (mode === 'Chill') {
        insights.push({
          type: 'wellbeing',
          icon: Heart,
          title: 'Well-being Check-in',
          message: 'You\'ve completed 12 tasks today. Great work—time to recharge.',
          action: 'Start Break',
          tone: 'gentle',
        });
        insights.push({
          type: 'stress',
          icon: Coffee,
          title: 'Stress Level: Low',
          message: 'Your activity patterns show balanced pacing. Continue with light tasks.',
          action: null,
          tone: 'calm',
        });
        insights.push({
          type: 'reflection',
          icon: Sparkles,
          title: 'Reflection Prompt',
          message: 'What was your biggest win today? Take a moment to celebrate.',
          action: 'Write Reflection',
          tone: 'gentle',
        });
      }

      setSuggestions(insights);
    };

    generateInsights();
    const interval = setInterval(generateInsights, 45000);
    return () => clearInterval(interval);
  }, [mode]);

  const handleAction = (action: string) => {
    if (action === 'Switch to Sprint') {
      context.setMode('Sprint');
    }
  };

  return (
    <motion.aside
      className={`${
        mode === 'Chill' 
          ? 'border-l-[var(--color-border-soft)]' 
          : mode === 'Focus' 
          ? 'bg-white/70 border-l' 
          : 'bg-neutral-900/70 border-l'
      } backdrop-blur-xl ${mode === 'Chill' ? '' : currentTheme.border} h-full overflow-y-auto`}
      style={mode === 'Chill' ? { background: 'var(--component-bg-section)' } : {}}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 320, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className={`p-6 ${mode === 'Sprint' ? 'space-y-4' : 'space-y-6'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : currentTheme.text}`} />
            <h2 className={`${mode === 'Focus' ? 'text-neutral-900' : mode === 'Chill' ? 'text-[var(--text-primary)]' : 'text-white'}`}>
              {mode === 'Sprint' ? 'AI Command' : mode === 'Focus' ? 'AI Monitor' : 'AI Guide'}
            </h2>
          </div>
          <motion.button
            onClick={onClose}
            className={`p-1.5 rounded-lg ${
              mode === 'Chill' 
                ? 'hover:bg-[var(--neutral-200)] text-[var(--text-secondary)]' 
                : mode === 'Focus' 
                ? 'hover:bg-neutral-700/20 text-neutral-600' 
                : 'hover:bg-neutral-700/20 text-neutral-400'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.div
                  key={index}
                  className={`${
                    mode === 'Sprint' 
                      ? 'p-4 rounded-xl bg-neutral-800/70 border border-red-500/30'
                      : mode === 'Focus'
                      ? 'p-5 rounded-xl bg-white/80 border border-neutral-300/30'
                      : 'p-5 rounded-2xl bg-[var(--component-bg-card)] border border-[var(--color-border-soft)] shadow-[var(--shadow-soft)]'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  whileHover={mode !== 'Focus' ? { scale: 1.02, y: -2 } : {}}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      mode === 'Sprint' 
                        ? 'bg-red-500/20' 
                        : mode === 'Chill' 
                        ? 'bg-[var(--color-accent-primary)]/20' 
                        : 'bg-neutral-300/30'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        mode === 'Sprint' 
                          ? 'text-red-500' 
                          : mode === 'Chill' 
                          ? 'text-[var(--color-accent-primary)]' 
                          : 'text-neutral-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`${mode === 'Sprint' ? 'mb-1' : 'mb-2'} ${mode === 'Chill' ? 'text-[var(--text-primary)]' : mode === 'Focus' ? 'text-neutral-900' : 'text-white'}`}>
                        {suggestion.title}
                      </h3>
                      <p className={`${mode === 'Sprint' ? 'text-sm' : ''} ${mode === 'Chill' ? 'text-[var(--text-secondary)]' : mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                        {suggestion.message}
                      </p>
                      {suggestion.action && (
                        <motion.button
                          onClick={() => handleAction(suggestion.action)}
                          className={`${mode === 'Sprint' ? 'mt-2 px-3 py-1.5 text-sm' : 'mt-3 px-4 py-2'} rounded-lg ${
                            mode === 'Sprint' 
                              ? 'bg-red-500 text-white' 
                              : mode === 'Chill' 
                              ? 'bg-[var(--color-accent-primary)] text-white' 
                              : 'bg-neutral-700 text-white'
                          } hover:opacity-90 transition-opacity`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {suggestion.action}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Energy Monitor */}
          <motion.div
            className={`${
              mode === 'Sprint'
                ? 'p-4 rounded-xl bg-neutral-800/70 border border-red-500/20'
                : mode === 'Focus'
                ? 'p-5 rounded-xl bg-white/80 border border-neutral-300/30'
                : 'p-5 rounded-2xl bg-[var(--component-bg-card)] border border-[var(--color-border-soft)] shadow-[var(--shadow-soft)]'
            } ${mode === 'Sprint' ? 'mt-4' : 'mt-6'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={`mb-3 ${mode === 'Chill' ? 'text-[var(--text-primary)]' : mode === 'Focus' ? 'text-neutral-900' : 'text-white'}`}>
              {mode === 'Sprint' ? 'Energy Reserve' : mode === 'Focus' ? 'Focus Capacity' : 'Well-being Score'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`${mode === 'Sprint' ? 'text-sm' : ''} ${mode === 'Chill' ? 'text-[var(--text-secondary)]' : mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {mode === 'Sprint' ? 'Current' : mode === 'Focus' ? 'Depth' : 'Balance'}
                </span>
                <span className={`${mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : currentTheme.text}`}>{energyLevel}%</span>
              </div>
              <div className={`h-2 rounded-full ${mode === 'Chill' ? 'bg-[var(--neutral-200)]' : mode === 'Focus' ? 'bg-neutral-200' : 'bg-neutral-700'} overflow-hidden`}>
                <motion.div
                  className={`h-full ${mode === 'Sprint' ? 'bg-red-500' : mode === 'Chill' ? 'bg-[var(--color-accent-primary)]' : 'bg-neutral-400'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${energyLevel}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              {mode === 'Sprint' && (
                <p className="text-xs text-red-400 mt-2">Peak output—monitor for burnout signals</p>
              )}
              {mode === 'Chill' && (
                <p className="text-xs text-[var(--color-accent-primary)] mt-2">Take your time—recovery is productive</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}