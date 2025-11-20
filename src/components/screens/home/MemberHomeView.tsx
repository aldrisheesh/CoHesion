import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, Clock, Zap, Brain, Users, AlertCircle, Coffee, Target, Activity } from 'lucide-react';
import { Mode } from '../../../App';

interface MemberHomeViewProps {
  mode: Mode;
}

export function MemberHomeView({ mode }: MemberHomeViewProps) {
  const isDark = mode !== 'Focus';

  const personalStats = [
    { label: 'My Tasks', value: '12/18', icon: CheckCircle2, trend: '+3 today' },
    { label: 'Focus Time', value: '3.5h', icon: Clock, trend: '47 min current' },
    { label: 'My Energy', value: '78%', icon: Zap, trend: 'Peak window' },
    { label: 'Productivity', value: '92%', icon: TrendingUp, trend: '+8% week' },
  ];

  const criticalTasks = [
    { title: 'Q4 Financial Report', priority: 'critical', progress: 65, dueTime: '2h' },
    { title: 'Client Presentation Deck', priority: 'urgent', progress: 40, dueTime: '4h' },
  ];

  const focusTask = {
    title: 'Q4 Financial Report - Analysis Section',
    description: 'Complete the financial analysis with updated Q4 data',
    progress: 65,
    timeSpent: '2h 15m',
  };

  const lightTasks = [
    { title: 'Review tomorrow\'s calendar', completed: false },
    { title: 'Organize desktop files', completed: true },
    { title: 'Reply to non-urgent emails', completed: false },
  ];

  // Sprint Mode - Member Command Center
  if (mode === 'Sprint') {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-red-500" />
            <h1 className="text-white">Member Command Center</h1>
          </div>
          <p className="text-neutral-400">Your personal productivity dashboard · 2 critical tasks · 4h until EOD</p>
        </motion.div>

        {/* Personal Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {personalStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="p-4 rounded-2xl bg-neutral-900/60 border border-red-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Icon className="w-5 h-5 text-red-500 mb-2" />
                <div className="text-2xl text-white mb-1">{stat.value}</div>
                <p className="text-neutral-400 text-sm mb-1">{stat.label}</p>
                <p className="text-red-400 text-xs">{stat.trend}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* My Critical Tasks */}
          <div className="col-span-2 space-y-3">
            <h2 className="text-white mb-3">My Critical Tasks</h2>
            {criticalTasks.map((task, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-xl bg-red-500/10 border-2 border-red-500/50 shadow-lg shadow-red-500/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ x: 4, borderColor: 'rgba(255, 69, 58, 0.7)' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="px-2 py-1 rounded text-xs bg-red-600 text-white uppercase tracking-wide">
                        {task.priority}
                      </span>
                    </div>
                    <h3 className="text-white text-lg">{task.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400">{task.dueTime}</div>
                    <p className="text-xs text-neutral-500">remaining</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <span className="text-red-400">{task.progress}%</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Personal Active Alerts */}
          <div className="space-y-3">
            <h3 className="text-white mb-3">My Active Alerts</h3>
            {[
              { icon: Target, label: 'Deadline in 2h', type: 'critical' },
              { icon: Brain, label: '2 decision pending', type: 'urgent' },
            ].map((alert, index) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-neutral-900/70 border border-red-500/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className="w-5 h-5 text-red-500 mb-2" />
                  <p className="text-white text-sm">{alert.label}</p>
                </motion.div>
              );
            })}
            
            {/* Member Energy Bar */}
            <motion.div
              className="p-4 rounded-xl bg-neutral-900/70 border border-red-500/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-5 h-5 text-red-500" />
                <span className="text-white text-sm">My Energy Level</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-800 overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
              <p className="text-neutral-400 text-xs">78% - Peak performance</p>
            </motion.div>
          </div>
        </div>

        {/* Member AI Insights */}
        <motion.div
          className="mt-6 p-5 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Brain className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-white mb-2">AI Insight for You</h3>
              <p className="text-neutral-300 text-sm">You're 23% more productive in the morning. Consider scheduling complex tasks before noon for optimal results.</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Focus Mode - Ultra Minimal Personal Focus
  if (mode === 'Focus') {
    return (
      <div className="flex items-center justify-center min-h-full p-12">
        <motion.div
          className="max-w-3xl w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-300/30 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-neutral-700">Deep Focus Active</span>
            </div>
            <p className="text-neutral-600">47 minutes · Distractions blocked</p>
          </motion.div>

          {/* Single Task Card */}
          <motion.div
            className="p-12 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-300/50 shadow-2xl shadow-neutral-400/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-neutral-900 mb-4">{focusTask.title}</h1>
            <p className="text-neutral-600 mb-8">{focusTask.description}</p>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-600">Progress</span>
                <span className="text-neutral-900">{focusTask.progress}%</span>
              </div>
              <div className="h-4 rounded-full bg-neutral-200 overflow-hidden">
                <motion.div
                  className="h-full bg-neutral-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${focusTask.progress}%` }}
                  transition={{ delay: 0.4, duration: 1.5 }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                className="flex-1 px-6 py-4 bg-neutral-700 text-white rounded-xl hover:bg-neutral-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Working
              </motion.button>
              <motion.button
                className="px-6 py-4 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Take Break
              </motion.button>
            </div>
          </motion.div>

          {/* Minimal Personal Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { label: 'Time', value: focusTask.timeSpent },
              { label: 'Blocked', value: '12 notifs' },
              { label: 'My Streak', value: '47 min' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="text-neutral-900 mb-1">{stat.value}</div>
                <p className="text-neutral-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Chill Mode - Personal Well-being
  return (
    <div className="p-12 max-w-6xl mx-auto">
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--component-chip-default)] mb-4">
          <Coffee className="w-5 h-5 text-[var(--color-accent-primary)]" />
          <span className="text-[var(--text-primary)]">Personal Relaxation</span>
        </div>
        <h1 className="text-[var(--text-primary)] mb-3">Take it easy, Alex</h1>
        <p className="text-[var(--text-secondary)]">You've completed 12 tasks today · Time to recharge</p>
      </motion.div>

      {/* Spacious Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Daily Reflection */}
        <motion.div
          className="p-8 rounded-3xl bg-[var(--component-bg-card)] backdrop-blur-sm border border-[var(--color-border-soft)] shadow-[var(--shadow-medium)]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[var(--color-accent-primary)]/10">
              <Zap className="w-6 h-6 text-[var(--color-accent-primary)]" />
            </div>
            <h2 className="text-[var(--text-primary)]">My Wins Today</h2>
          </div>
          <div className="space-y-4">
            <p className="text-[var(--text-secondary)]">What went well today?</p>
            <motion.textarea
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--color-border-soft)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--color-accent-primary)]/50 resize-none"
              rows={4}
              placeholder="Completed the client presentation..."
              whileFocus={{ scale: 1.01 }}
            />
          </div>
        </motion.div>

        {/* Personal Well-being Card */}
        <motion.div
          className="p-8 rounded-3xl bg-[var(--component-bg-card)] backdrop-blur-sm border border-[var(--color-border-soft)] shadow-[var(--shadow-medium)]"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-[var(--color-accent-secondary)]/10">
              <Activity className="w-6 h-6 text-[var(--color-accent-secondary)]" />
            </div>
            <h2 className="text-[var(--text-primary)]">My Well-being</h2>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Energy', value: 78, color: 'bg-[var(--color-accent-tertiary)]' },
              { label: 'Stress', value: 25, color: 'bg-[var(--color-accent-primary)]' },
              { label: 'Balance', value: 85, color: 'bg-[var(--color-accent-secondary)]' },
            ].map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[var(--text-secondary)]">{metric.label}</span>
                  <span className="text-[var(--text-primary)]">{metric.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--neutral-200)] overflow-hidden">
                  <motion.div
                    className={`h-full ${metric.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Light Tasks */}
        <motion.div
          className="col-span-2 p-8 rounded-3xl bg-[var(--component-bg-card)] backdrop-blur-sm border border-[var(--color-border-soft)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3 className="text-[var(--text-primary)] mb-6">Light Tasks for Me</h3>
          <div className="grid grid-cols-3 gap-4">
            {lightTasks.map((task, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] transition-colors cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 ${task.completed ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)]' : 'border-[var(--neutral-400)]'}`} />
                  <span className={task.completed ? 'text-[var(--text-tertiary)] line-through' : 'text-[var(--text-secondary)]'}>
                    {task.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
