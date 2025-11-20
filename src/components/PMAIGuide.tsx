import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, AlertTriangle, TrendingDown, Users, Radio, Brain, Target, Shield, Activity } from 'lucide-react';
import { Mode, AppContextType } from '../App';
import { useState, useEffect } from 'react';

interface PMAIGuideProps {
  mode: Mode;
  currentTheme: any;
  onClose: () => void;
  context: AppContextType;
}

export function PMAIGuide({ mode, currentTheme, onClose, context }: PMAIGuideProps) {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [teamEnergyAvg, setTeamEnergyAvg] = useState(63);

  useEffect(() => {
    const generateInsights = () => {
      const insights = [];

      if (mode === 'Sprint') {
        insights.push({
          type: 'burnout',
          icon: AlertTriangle,
          title: 'Team Burnout Warning',
          message: '2 members show energy below 30%—suggest moderated workload or Chill mode.',
          action: 'Review Team Load',
          tone: 'critical',
          severity: 'critical',
        });
        insights.push({
          type: 'deadline',
          icon: Target,
          title: 'Upcoming Deadline Risk',
          message: 'Q4 Report behind schedule by 1.5h. Reassign or boost Sprint Mode for members.',
          action: 'Assess Options',
          tone: 'urgent',
          severity: 'critical',
        });
        insights.push({
          type: 'blocker',
          icon: Shield,
          title: 'Dependency Blocker',
          message: 'Design task blocked by pending approvals. Resolve to unblock downstream tasks.',
          action: 'Resolve Blocker',
          tone: 'urgent',
          severity: 'high',
        });
        insights.push({
          type: 'sync',
          icon: Radio,
          title: 'Team Sync Recommendation',
          message: 'Energy levels are uneven. Sync Mode may stabilize team momentum.',
          action: 'Enable Sync',
          tone: 'strategic',
          severity: 'medium',
        });
      } else if (mode === 'Focus') {
        insights.push({
          type: 'workload',
          icon: TrendingDown,
          title: 'Workload Distribution',
          message: 'Marcus and Priya have 40% higher task loads than team average.',
          action: 'Rebalance',
          tone: 'strategic',
          severity: 'high',
        });
        insights.push({
          type: 'analytics',
          icon: Brain,
          title: 'Team Productivity Analysis',
          message: 'Current team focus score: 85%. Optimal for complex tasks.',
          action: null,
          tone: 'analytical',
          severity: 'low',
        });
        insights.push({
          type: 'performance',
          icon: Activity,
          title: 'Performance Metrics',
          message: 'Team velocity up 12% this week. Sprint planning is effective.',
          action: null,
          tone: 'positive',
          severity: 'low',
        });
      } else if (mode === 'Chill') {
        insights.push({
          type: 'predictive',
          icon: Brain,
          title: 'Predictive Alert',
          message: 'AI predicts 3 members may overload in the next 2h based on task queue.',
          action: 'Rebalance Workload',
          tone: 'strategic',
          severity: 'medium',
        });
        insights.push({
          type: 'recovery',
          icon: Users,
          title: 'Team Recovery Status',
          message: '4 members in Chill mode. Recovery rates are healthy across the board.',
          action: null,
          tone: 'calm',
          severity: 'low',
        });
        insights.push({
          type: 'morale',
          icon: Sparkles,
          title: 'Team Morale Insight',
          message: 'Team sentiment is positive. Consider celebrating recent wins together.',
          action: 'Send Recognition',
          tone: 'positive',
          severity: 'low',
        });
      }

      setSuggestions(insights);
    };

    generateInsights();
    const interval = setInterval(generateInsights, 45000);
    return () => clearInterval(interval);
  }, [mode]);

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/40';
      case 'high': return 'border-red-500/40';
      case 'medium': return 'border-orange-500/40';
      case 'low': return 'border-green-500/40';
      default: return 'border-neutral-500/40';
    }
  };

  return (
    <motion.aside
      className={`bg-gradient-to-b ${
        mode === 'Chill'
          ? 'from-[#2C3E50] via-[#34495E] to-[#2C3E50]'
          : mode === 'Focus' 
          ? 'from-neutral-800 to-neutral-900' 
          : 'from-[#1A1A1A] via-[#1E1A24] to-[#1A1A1A]'
      } border-l ${
        mode === 'Chill' ? 'border-violet-500/20' : 'border-violet-500/20'
      } backdrop-blur-xl h-full overflow-y-auto`}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 360, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className={`p-6 ${mode === 'Sprint' ? 'space-y-4' : 'space-y-5'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-white">
              {mode === 'Sprint' ? 'PM Command Center' : mode === 'Focus' ? 'PM Analytics' : 'PM Insights'}
            </h2>
          </div>
          <motion.button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-700/30 text-neutral-400 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* PM Mode Badge */}
        <motion.div
          className="mb-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">Executive AI Assistant</span>
          </div>
          <p className="text-xs text-neutral-400">
            Analytical, data-driven team insights
          </p>
        </motion.div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl border ${getSeverityBorder(suggestion.severity)} ${
                    mode === 'Chill' ? 'bg-[#1E2A38]/80' : 'bg-neutral-900/70'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.08 }}
                  layout
                  whileHover={{ scale: 1.01, x: 2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      mode === 'Chill' ? 'bg-violet-500/15' : 'bg-violet-500/20'
                    }`}>
                      <Icon className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm text-white">
                          {suggestion.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          suggestion.severity === 'critical' || suggestion.severity === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : suggestion.severity === 'medium'
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {suggestion.severity}
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${
                        mode === 'Chill' ? 'text-slate-300' : 'text-neutral-300'
                      }`}>
                        {suggestion.message}
                      </p>
                      {suggestion.action && (
                        <motion.button
                          className={`mt-2 px-3 py-1.5 text-xs rounded-lg ${
                            suggestion.severity === 'high' || suggestion.severity === 'critical'
                              ? 'bg-red-500 text-white'
                              : suggestion.severity === 'medium'
                              ? 'bg-orange-500 text-white'
                              : 'bg-violet-500 text-white'
                          } transition-colors`}
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

          {/* Team Energy Analytics */}
          <motion.div
            className={`p-5 rounded-xl border mt-6 ${
              mode === 'Chill' 
                ? 'bg-[#1E2A38]/80 border-violet-500/30' 
                : 'bg-neutral-900/70 border-violet-500/30'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="mb-3 text-white">
              Team Energy Analytics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${
                  mode === 'Chill' ? 'text-slate-400' : 'text-neutral-400'
                }`}>Average Energy</span>
                <span className="text-violet-400">{teamEnergyAvg}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                mode === 'Chill' ? 'bg-slate-700/50' : 'bg-neutral-700'
              }`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${teamEnergyAvg}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="text-center">
                  <div className="text-green-500 text-lg">4</div>
                  <p className={`text-xs ${
                    mode === 'Chill' ? 'text-slate-500' : 'text-neutral-500'
                  }`}>Healthy</p>
                </div>
                <div className="text-center">
                  <div className="text-orange-500 text-lg">1</div>
                  <p className={`text-xs ${
                    mode === 'Chill' ? 'text-slate-500' : 'text-neutral-500'
                  }`}>Warning</p>
                </div>
                <div className="text-center">
                  <div className="text-red-500 text-lg">1</div>
                  <p className={`text-xs ${
                    mode === 'Chill' ? 'text-slate-500' : 'text-neutral-500'
                  }`}>Critical</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="p-4 rounded-xl border bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm mb-3 text-white">Quick PM Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 rounded-lg text-xs transition-colors text-left bg-violet-500/20 text-violet-300 hover:bg-violet-500/30">
                Enable Team Sync Mode
              </button>
              <button className="w-full px-3 py-2 rounded-lg text-xs transition-colors text-left bg-violet-500/20 text-violet-300 hover:bg-violet-500/30">
                Review Critical Blockers
              </button>
              <button className="w-full px-3 py-2 rounded-lg text-xs transition-colors text-left bg-violet-500/20 text-violet-300 hover:bg-violet-500/30">
                Rebalance Workload
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}