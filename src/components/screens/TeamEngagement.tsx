import { motion } from 'motion/react';
import { Users, Activity, TrendingUp, Clock, Zap, Coffee } from 'lucide-react';
import { AppContextType } from '../../App';

interface TeamEngagementProps {
  context: AppContextType;
}

export function TeamEngagement({ context }: TeamEngagementProps) {
  const { mode } = context;
  const isDark = mode === 'Sprint';
  const isChill = mode === 'Chill';

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Designer', energy: 85, status: 'Focus', avatar: 'SC', available: true, currentTask: 'UI Mockups' },
    { name: 'Mike Johnson', role: 'Developer', energy: 72, status: 'Sprint', avatar: 'MJ', available: true, currentTask: 'API Integration' },
    { name: 'Emma Davis', role: 'Product Manager', energy: 90, status: 'Chill', avatar: 'ED', available: false, currentTask: 'On Break' },
    { name: 'Alex Rodriguez', role: 'Developer', energy: 68, status: 'Focus', avatar: 'AR', available: true, currentTask: 'Code Review' },
    { name: 'Lisa Wang', role: 'Marketing', energy: 78, status: 'Sprint', avatar: 'LW', available: true, currentTask: 'Campaign Plan' },
    { name: 'Tom Brown', role: 'Designer', energy: 82, status: 'Focus', avatar: 'TB', available: true, currentTask: 'Brand Guidelines' },
  ];

  const teamStats = [
    { label: 'Team Energy', value: '79%', icon: Zap, trend: '+5% from yesterday' },
    { label: 'Active Members', value: '5/6', icon: Users, trend: '1 on break' },
    { label: 'Focus Time', value: '4.2h', icon: Clock, trend: 'avg per person' },
    { label: 'Productivity', value: 'High', icon: TrendingUp, trend: 'Peak hours' },
  ];

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return mode === 'Sprint' ? 'bg-red-500' : mode === 'Chill' ? 'bg-blue-500' : 'bg-green-500';
    if (energy >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Sprint') return 'bg-red-500/20 text-red-500 border-red-500/30';
    if (status === 'Focus') return isDark ? 'bg-neutral-600/20 text-neutral-400 border-neutral-600/30' : 'bg-neutral-200 text-neutral-700 border-neutral-300';
    return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className={`w-6 h-6 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-[#6CA8FF]' : 'text-neutral-600'}`} />
          <h1 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>Team Engagement</h1>
        </div>
        <p className={mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Real-time energy monitoring · Team synchronization · Collaboration readiness
        </p>
      </motion.div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl ${
                mode === 'Chill' 
                  ? 'bg-[var(--component-bg-card)] border-[var(--color-border-soft)]' 
                  : isDark ? 'bg-neutral-800/50 border-red-500/20' : 'bg-white/80 border-neutral-300/30'
              } border backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className={`p-3 rounded-xl mb-4 inline-flex ${
                mode === 'Sprint' ? 'bg-red-500/20' : mode === 'Chill' ? 'bg-[var(--color-accent-primary)]/20' : 'bg-neutral-300/30'
              }`}>
                <Icon className={`w-6 h-6 ${
                  mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : 'text-neutral-600'
                }`} />
              </div>
              <div className={`text-2xl mb-1 ${mode === 'Chill' ? 'text-[var(--text-primary)]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</div>
              <p className={`mb-1 ${mode === 'Chill' ? 'text-[var(--text-secondary)]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{stat.label}</p>
              <p className={`text-sm ${
                mode === 'Sprint' ? 'text-red-400' : mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : 'text-neutral-500'
              }`}>{stat.trend}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Team Heatmap with Ambient Gradients */}
      <motion.div
        className={`mb-10 p-8 rounded-3xl ${
          mode === 'Sprint' 
            ? 'bg-gradient-to-br from-neutral-900/60 via-neutral-900/50 to-neutral-900/60 border-red-500/20' 
            : mode === 'Chill' 
            ? 'border-[var(--color-border-soft)] shadow-[var(--shadow-glow)]' 
            : 'bg-white/70 border-neutral-300/30'
        } border backdrop-blur-xl ${mode === 'Sprint' ? 'shadow-[0_0_60px_-12px_rgba(255,74,74,0.2)]' : ''}`}
        style={mode === 'Chill' ? { background: 'var(--component-bg-section)' } : {}}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className={`mb-8 text-xl ${mode === 'Chill' ? 'text-[var(--text-primary)]' : isDark ? 'text-white' : 'text-neutral-900'}`}>Team Energy Heatmap</h2>
        <div className="grid grid-cols-3 gap-6 auto-rows-fr">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            >
              {/* Avatar with uniform size */}
              <motion.div
                className={`w-[68px] h-[68px] rounded-full ${getEnergyColor(member.energy)} flex items-center justify-center text-white shadow-lg relative group cursor-pointer`}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{member.avatar}</span>
                
                {/* Active indicator */}
                {member.available && (
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                
                {/* Mood emoji overlay */}
                <div className="absolute -top-1 -right-1 text-2xl">
                  {member.energy >= 80 ? '😊' : member.energy >= 60 ? '🙂' : '😐'}
                </div>

                {/* Tooltip on hover */}
                <div className={`absolute top-full mt-3 px-4 py-3 rounded-xl ${
                  mode === 'Chill' 
                    ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)] shadow-[var(--shadow-medium)]' 
                    : isDark ? 'bg-neutral-900 border-red-500/30' : 'bg-white border-neutral-300'
                } border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-2xl`}>
                  <p className={`${mode === 'Chill' ? 'text-[var(--text-primary)]' : isDark ? 'text-white' : 'text-neutral-900'} mb-1`}>{member.name}</p>
                  <p className={`${mode === 'Chill' ? 'text-[var(--text-secondary)]' : isDark ? 'text-neutral-400' : 'text-neutral-600'} text-sm mb-1`}>{member.energy}% energy</p>
                  <p className={`${mode === 'Chill' ? 'text-[var(--text-tertiary)]' : isDark ? 'text-neutral-500' : 'text-neutral-500'} text-xs`}>{member.currentTask}</p>
                </div>
              </motion.div>
              
              {/* Label centered */}
              <div className="text-center">
                <p className={`text-sm ${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{member.name.split(' ')[0]}</p>
                <p className={`text-xs ${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{member.role}</p>
              </div>
              
              {/* Energy bar */}
              <div className="w-full">
                <div className={`h-2 rounded-full ${isDark ? 'bg-neutral-700/50' : 'bg-neutral-200'} overflow-hidden`}>
                  <motion.div
                    className={`h-full ${getEnergyColor(member.energy)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${member.energy}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${isChill ? 'text-[#7888A0]' : isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Energy</span>
                  <span className={`text-xs ${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{member.energy}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-2xl border backdrop-blur-sm ${
              mode === 'Sprint' 
                ? 'bg-neutral-800/50 border-red-500/20' 
                : mode === 'Chill' 
                ? 'bg-white border-[rgba(108,168,255,0.15)]' 
                : 'bg-white/80 border-neutral-300/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${getEnergyColor(member.energy)} flex items-center justify-center text-white relative`}>
                  <span>{member.avatar}</span>
                  {member.available && (
                    <motion.div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 ${isChill ? 'border-white' : 'border-neutral-800'}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </div>
                <div>
                  <h3 className={`${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{member.name}</h3>
                  <p className={`${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{member.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Energy Level</span>
                  <span className={`${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{member.energy}%</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'} overflow-hidden`}>
                  <motion.div
                    className={`h-full ${getEnergyColor(member.energy)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${member.energy}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Status</span>
                <span className={`px-3 py-1 rounded-full border ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>Current Task</span>
                <span className={`${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{member.currentTask}</span>
              </div>

              {member.available && (
                <motion.button
                  className={`w-full px-4 py-2 rounded-lg ${mode === 'Sprint' ? 'bg-red-500 text-white' : mode === 'Chill' ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-white'} hover:opacity-90 transition-opacity`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Connect
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}