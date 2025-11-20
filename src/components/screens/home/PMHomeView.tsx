import { motion, AnimatePresence } from 'motion/react';
import { Users, AlertTriangle, TrendingDown, Shield, Radio, Flame, Clock, BarChart3, Zap, Target, ChevronRight, ChevronDown, ChevronUp, Waves, Eye, Activity, Battery, MessageCircle } from 'lucide-react';
import { Mode, AppContextType } from '../../../App';
import { useState } from 'react';

interface PMHomeViewProps {
  mode: Mode;
  context: AppContextType;
}

export function PMHomeView({ mode, context }: PMHomeViewProps) {
  const isDark = mode !== 'Focus';
  const [blockersExpanded, setBlockersExpanded] = useState(mode === 'Sprint');

  // Dynamic team data
  const teamEnergyData = [
    { name: 'Roi Santos', energy: 85, status: 'healthy', mode: 'Focus', taskLoad: 8, avatar: 'from-blue-400 to-blue-600', initials: 'RS', gender: 'male' },
    { name: 'Stephen Robiso', energy: 45, status: 'warning', mode: 'Sprint', taskLoad: 14, avatar: 'from-teal-400 to-teal-600', initials: 'SR', gender: 'male' },
    { name: 'Angelie Barrientos', energy: 92, status: 'healthy', mode: 'Chill', taskLoad: 3, avatar: 'from-pink-400 to-pink-600', initials: 'AB', gender: 'female' },
    { name: 'Shane Binuya', energy: 78, status: 'healthy', mode: 'Focus', taskLoad: 6, avatar: 'from-indigo-400 to-indigo-600', initials: 'SB', gender: 'male' },
    { name: 'Sebastian Bien', energy: 38, status: 'critical', mode: 'Sprint', taskLoad: 12, avatar: 'from-cyan-400 to-cyan-600', initials: 'SB', gender: 'male' },
    { name: 'Daniel Vibar', energy: 88, status: 'healthy', mode: 'Chill', taskLoad: 4, avatar: 'from-blue-500 to-blue-700', initials: 'DV', gender: 'male' },
  ];

  const activeBlockers = [
    { 
      title: 'Design approval pending', 
      severity: 'critical' as const,
      assignee: 'Roi Santos',
      daysOpen: 2,
      description: 'Wireframe mockups need stakeholder sign-off before proceeding'
    },
    { 
      title: 'AWS credentials missing', 
      severity: 'urgent' as const,
      assignee: 'Shane Binuya',
      daysOpen: 1,
      description: 'CI/CD pipeline blocked - deployment cannot proceed'
    },
    { 
      title: 'API rate limit exceeded', 
      severity: 'medium' as const,
      assignee: 'Stephen Robiso',
      daysOpen: 0,
      description: 'Third-party service limits causing intermittent failures'
    },
  ];

  // Calculate team metrics
  const avgEnergy = Math.round(teamEnergyData.reduce((sum, m) => sum + m.energy, 0) / teamEnergyData.length);
  const peakEnergy = Math.max(...teamEnergyData.map(m => m.energy));
  const burnoutRiskCount = teamEnergyData.filter(m => m.energy < 40).length;
  const activeMembers = teamEnergyData.length;
  
  const burnoutRiskLevel = burnoutRiskCount === 0 ? 'Low' : burnoutRiskCount === 1 ? 'Medium' : 'High';

  // Mode-aware spacing
  const containerPadding = mode === 'Sprint' ? 'p-6' : mode === 'Focus' ? 'p-8' : 'p-12';
  const cardSpacing = mode === 'Sprint' ? 'gap-4' : mode === 'Focus' ? 'gap-6' : 'gap-8';
  const cardRadius = mode === 'Sprint' ? 'rounded-xl' : mode === 'Focus' ? 'rounded-2xl' : 'rounded-3xl';

  const getEnergyColor = (energy: number) => {
    if (mode === 'Chill') {
      if (energy < 40) return 'text-orange-400';
      if (energy < 70) return 'text-[#6CA8FF]';
      return 'text-[#88D4A7]';
    }
    if (energy < 40) return isDark ? 'text-red-400' : 'text-red-600';
    if (energy < 70) return isDark ? 'text-orange-400' : 'text-orange-600';
    return isDark ? 'text-green-400' : 'text-green-600';
  };

  const getModeColor = (memberMode: string) => {
    if (memberMode === 'Sprint') return mode === 'Chill' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-500/20 text-red-400 border-red-500/40';
    if (memberMode === 'Focus') return mode === 'Chill' ? 'bg-neutral-100 text-neutral-700 border-neutral-200' : 'bg-neutral-500/20 text-neutral-400 border-neutral-500/40';
    return mode === 'Chill' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-blue-500/20 text-blue-400 border-blue-500/40';
  };

  const getSeverityStyles = (severity: 'critical' | 'urgent' | 'medium') => {
    const baseStyles = {
      critical: mode === 'Chill' 
        ? 'bg-red-50 border-red-200 text-red-700' 
        : 'bg-red-500/10 border-red-500/40 text-red-400',
      urgent: mode === 'Chill'
        ? 'bg-orange-50 border-orange-200 text-orange-700'
        : 'bg-orange-500/10 border-orange-500/40 text-orange-400',
      medium: mode === 'Chill'
        ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
        : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400',
    };
    return baseStyles[severity];
  };

  return (
    <div className={`${containerPadding} max-w-[1680px] mx-auto`}>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Shield className={`w-7 h-7 ${mode === 'Chill' ? 'text-[#6CA8FF]' : mode === 'Focus' ? 'text-neutral-600' : 'text-violet-400'}`} />
          <h1 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
            PM Home Overview
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className={mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
            At-a-glance team supervision
          </p>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 ${cardRadius} text-sm ${
              mode === 'Chill' 
                ? 'bg-[#6CA8FF]/10 text-[#6CA8FF] border border-[#6CA8FF]/20' 
                : isDark 
                ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30' 
                : 'bg-neutral-200 text-neutral-700 border border-neutral-300'
            }`}>
              {activeMembers} members
            </span>
            {activeBlockers.length > 0 && (
              <span className={`px-3 py-1 ${cardRadius} text-sm ${
                mode === 'Chill'
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}>
                {activeBlockers.length} blockers
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Top Metrics Row */}
      <div className={`grid grid-cols-3 ${cardSpacing} mb-8`}>
        {/* Burnout Risk */}
        <motion.div
          className={`p-6 ${cardRadius} border backdrop-blur-sm cursor-pointer ${
            mode === 'Chill'
              ? 'bg-white border-orange-200 hover:border-orange-300 shadow-sm hover:shadow-md'
              : isDark
              ? 'bg-neutral-900/60 border-orange-500/30 hover:border-orange-500/50'
              : 'bg-white/80 border-orange-300/40 hover:border-orange-400/60 shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileHover={{ y: mode === 'Focus' ? 0 : -2, scale: mode === 'Sprint' ? 1.01 : 1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className={`w-5 h-5 ${mode === 'Chill' ? 'text-orange-500' : 'text-orange-400'}`} />
              <span className={`text-sm ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Burnout Risk
              </span>
            </div>
            <motion.div
              className={`w-2 h-2 rounded-full ${
                burnoutRiskLevel === 'High' ? 'bg-red-500' : burnoutRiskLevel === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
              }`}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className={`text-3xl mb-1 ${
            burnoutRiskLevel === 'High' 
              ? 'text-red-500' 
              : burnoutRiskLevel === 'Medium' 
              ? 'text-orange-500' 
              : mode === 'Chill' ? 'text-green-600' : 'text-green-400'
          }`}>
            {burnoutRiskLevel}
          </div>
          <p className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
            {burnoutRiskCount} member{burnoutRiskCount !== 1 ? 's' : ''} under 40%
          </p>
        </motion.div>

        {/* Team Energy */}
        <motion.div
          className={`p-6 ${cardRadius} border backdrop-blur-sm cursor-pointer ${
            mode === 'Chill'
              ? 'bg-white border-[#6CA8FF]/20 hover:border-[#6CA8FF]/40 shadow-sm hover:shadow-md'
              : isDark
              ? 'bg-neutral-900/60 border-violet-500/30 hover:border-violet-500/50'
              : 'bg-white/80 border-neutral-300/40 hover:border-neutral-400/60 shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          whileHover={{ y: mode === 'Focus' ? 0 : -2, scale: mode === 'Sprint' ? 1.01 : 1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className={`w-5 h-5 ${mode === 'Chill' ? 'text-[#6CA8FF]' : 'text-violet-400'}`} />
            <span className={`text-sm ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Team Energy
            </span>
          </div>
          <div className={`text-3xl mb-1 ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-violet-400' : 'text-neutral-900'}`}>
            {avgEnergy}%
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
              Peak: {peakEnergy}% · Avg: {avgEnergy}%
            </p>
          </div>
          <div className={`mt-3 h-1.5 ${mode === 'Chill' ? 'bg-[#F0F4F8]' : 'bg-neutral-800'} rounded-full overflow-hidden`}>
            <motion.div
              className={`h-full ${mode === 'Chill' ? 'bg-[#6CA8FF]' : 'bg-violet-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${avgEnergy}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Active Members */}
        <motion.div
          className={`p-6 ${cardRadius} border backdrop-blur-sm cursor-pointer ${
            mode === 'Chill'
              ? 'bg-white border-[#88D4A7]/20 hover:border-[#88D4A7]/40 shadow-sm hover:shadow-md'
              : isDark
              ? 'bg-neutral-900/60 border-blue-500/30 hover:border-blue-500/50'
              : 'bg-white/80 border-neutral-300/40 hover:border-neutral-400/60 shadow-lg'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          whileHover={{ y: mode === 'Focus' ? 0 : -2, scale: mode === 'Sprint' ? 1.01 : 1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className={`w-5 h-5 ${mode === 'Chill' ? 'text-[#88D4A7]' : 'text-blue-400'}`} />
            <span className={`text-sm ${mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Active Members
            </span>
          </div>
          <div className={`text-3xl mb-1 ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-blue-400' : 'text-neutral-900'}`}>
            {activeMembers}
          </div>
          <p className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
            All online now
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className={`grid ${mode === 'Focus' ? 'grid-cols-1' : 'grid-cols-3'} ${cardSpacing}`}>
        {/* Team Status Grid - Takes 2 columns */}
        <div className={mode === 'Focus' ? '' : 'col-span-2 space-y-6'}>
          {/* Team Members */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className={`text-sm uppercase tracking-wider mb-4 ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
              Team Status
            </h3>
            <div className={`grid ${mode === 'Sprint' ? 'grid-cols-3 gap-3' : mode === 'Focus' ? 'grid-cols-2 gap-6' : 'grid-cols-2 gap-6'}`}>
              {teamEnergyData.map((member, index) => (
                <motion.div
                  key={member.name}
                  className={`p-5 ${cardRadius} border cursor-pointer transition-all ${
                    mode === 'Chill'
                      ? member.status === 'critical'
                        ? 'bg-red-50 border-red-200 hover:border-red-300 hover:shadow-md'
                        : member.status === 'warning'
                        ? 'bg-orange-50 border-orange-200 hover:border-orange-300 hover:shadow-md'
                        : 'bg-white border-[#E8EDF3] hover:border-[#6CA8FF]/30 hover:shadow-md'
                      : isDark
                      ? member.status === 'critical'
                        ? 'bg-red-500/10 border-red-500/40 hover:border-red-500/60'
                        : member.status === 'warning'
                        ? 'bg-orange-500/10 border-orange-500/40 hover:border-orange-500/60'
                        : 'bg-neutral-900/60 border-violet-500/20 hover:border-violet-500/40'
                      : 'bg-white/80 border-neutral-300/40 hover:border-neutral-400/60 shadow-sm hover:shadow-lg'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  whileHover={{ 
                    y: mode === 'Sprint' ? -2 : mode === 'Focus' ? 0 : -4,
                    scale: mode === 'Sprint' ? 1.01 : 1 
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 ${mode === 'Chill' ? 'rounded-2xl' : 'rounded-xl'} bg-gradient-to-br ${member.avatar} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className={`mb-1 truncate ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                        {member.name}
                      </p>
                      <div className={`text-2xl ${getEnergyColor(member.energy)}`}>
                        {member.energy}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className={`w-4 h-4 ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`} />
                    <span className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                      {member.taskLoad} tasks
                    </span>
                  </div>

                  <div className={`px-2 py-1 ${mode === 'Chill' ? 'rounded-lg' : 'rounded-md'} text-xs border inline-block ${getModeColor(member.mode)}`}>
                    {member.mode}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Blockers - Collapsible */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm uppercase tracking-wider ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                Active Blockers ({activeBlockers.length})
              </h3>
              <motion.button
                onClick={() => setBlockersExpanded(!blockersExpanded)}
                className={`p-2 ${cardRadius} ${
                  mode === 'Chill'
                    ? 'bg-white border border-[#E8EDF3] text-[#3A4A62] hover:border-[#6CA8FF]/30'
                    : isDark
                    ? 'bg-neutral-900/60 border border-violet-500/20 text-neutral-400 hover:border-violet-500/40'
                    : 'bg-white border border-neutral-300/40 text-neutral-700 hover:border-neutral-400/60'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {blockersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </motion.button>
            </div>

            <AnimatePresence>
              {blockersExpanded && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                >
                  {activeBlockers.map((blocker, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 ${cardRadius} border ${getSeverityStyles(blocker.severity)}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: mode === 'Sprint' ? 2 : 0 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-wide ${
                              blocker.severity === 'critical' ? 'bg-red-600 text-white' :
                              blocker.severity === 'urgent' ? 'bg-orange-600 text-white' :
                              'bg-yellow-600 text-white'
                            }`}>
                              {blocker.severity}
                            </span>
                            {blocker.daysOpen > 0 && (
                              <span className={`text-xs ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                                {blocker.daysOpen}d open
                              </span>
                            )}
                          </div>
                          <p className={`mb-1 ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                            {blocker.title}
                          </p>
                          <p className={`text-xs mb-2 ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                            {blocker.description}
                          </p>
                          <p className={`text-xs ${mode === 'Chill' ? 'text-[#3A4A62]' : 'text-neutral-400'}`}>
                            Assigned: {blocker.assignee}
                          </p>
                        </div>
                        <motion.button
                          className={`px-3 py-1 rounded-lg text-xs flex items-center gap-1 ${
                            blocker.severity === 'critical'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : blocker.severity === 'urgent'
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-yellow-500 text-white hover:bg-yellow-600'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Resolve
                          <ChevronRight className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column - Mode Controls & Risk Summary */}
        {mode !== 'Focus' && (
          <div className="space-y-6">
            {/* Team Mode Control */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                Team Mode Control
              </h3>
              <div className={`p-5 ${cardRadius} border space-y-2 ${
                mode === 'Chill'
                  ? 'bg-white border-[#E8EDF3] shadow-sm'
                  : 'bg-neutral-900/60 border-violet-500/20'
              }`}>
                <motion.button
                  className={`w-full p-3 ${mode === 'Chill' ? 'rounded-xl' : 'rounded-lg'} text-sm flex items-center gap-3 transition-all group bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 ${
                    mode === 'Chill' ? 'text-red-700' : 'text-red-400'
                  }`}
                  whileHover={{ scale: mode === 'Sprint' ? 1.01 : 1, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap className="w-4 h-4" />
                  <span className="flex-1 text-left">Force Sprint Mode</span>
                </motion.button>

                <motion.button
                  className={`w-full p-3 ${mode === 'Chill' ? 'rounded-xl' : 'rounded-lg'} text-sm flex items-center gap-3 transition-all group ${
                    mode === 'Chill'
                      ? 'bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 hover:border-neutral-300 text-neutral-700'
                      : 'bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 hover:border-neutral-500/50 text-neutral-300'
                  }`}
                  whileHover={{ scale: mode === 'Sprint' ? 1.01 : 1, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="w-4 h-4" />
                  <span className="flex-1 text-left">Force Focus Session</span>
                </motion.button>

                <motion.button
                  className={`w-full p-3 ${mode === 'Chill' ? 'rounded-xl' : 'rounded-lg'} text-sm flex items-center gap-3 transition-all group bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 ${
                    mode === 'Chill' ? 'text-blue-700' : 'text-blue-400'
                  }`}
                  whileHover={{ scale: mode === 'Sprint' ? 1.01 : 1, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Waves className="w-4 h-4" />
                  <span className="flex-1 text-left">Initiate Chill Cooldown</span>
                </motion.button>

                <motion.button
                  className={`w-full p-3 ${mode === 'Chill' ? 'rounded-xl' : 'rounded-lg'} text-sm flex items-center gap-3 transition-all group bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 hover:border-violet-500/50 ${
                    mode === 'Chill' ? 'text-violet-700' : 'text-violet-400'
                  }`}
                  whileHover={{ scale: mode === 'Sprint' ? 1.01 : 1, x: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Radio className="w-4 h-4" />
                  <span className="flex-1 text-left">Enable Sync Mode</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Risk Summary Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <h3 className={`text-sm uppercase tracking-wider mb-4 ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                Risk Summary
              </h3>
              
              <div className="space-y-3">
                {/* Team Burnout Signs */}
                <motion.div
                  className={`p-4 ${cardRadius} border ${
                    mode === 'Chill'
                      ? 'bg-red-50 border-red-200'
                      : mode === 'Sprint'
                      ? 'bg-red-500/10 border-red-500/40'
                      : 'bg-red-100 border-red-300'
                  }`}
                  whileHover={{ scale: mode === 'Chill' ? 1 : 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-4 h-4 ${mode === 'Chill' ? 'text-red-600' : 'text-red-400'}`} />
                    <span className={`text-sm ${mode === 'Chill' ? 'text-red-700' : 'text-red-400'}`}>
                      Team Burnout Signs
                    </span>
                  </div>
                  <p className={`text-xs mb-3 ${mode === 'Chill' ? 'text-red-600' : 'text-red-300'}`}>
                    {teamEnergyData.filter(m => m.energy < 40).map(m => m.name.split(' ')[0]).join(', ')} showing critical energy levels
                  </p>
                  <motion.button
                    className={`w-full px-3 py-2 rounded-lg text-xs ${
                      mode === 'Chill'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Suggest Chill Mode
                  </motion.button>
                </motion.div>

                {/* High Mode Intensity */}
                <motion.div
                  className={`p-4 ${cardRadius} border ${
                    mode === 'Chill'
                      ? 'bg-orange-50 border-orange-200'
                      : 'bg-orange-500/10 border-orange-500/40'
                  }`}
                  whileHover={{ scale: mode === 'Chill' ? 1 : 1.01 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-4 h-4 ${mode === 'Chill' ? 'text-orange-600' : 'text-orange-400'}`} />
                    <span className={`text-sm ${mode === 'Chill' ? 'text-orange-700' : 'text-orange-400'}`}>
                      High Mode Intensity
                    </span>
                  </div>
                  <p className={`text-xs mb-3 ${mode === 'Chill' ? 'text-orange-600' : 'text-orange-300'}`}>
                    {teamEnergyData.filter(m => m.mode === 'Sprint').length} members in Sprint for 4+ hours
                  </p>
                  <motion.button
                    className={`w-full px-3 py-2 rounded-lg text-xs ${
                      mode === 'Chill'
                        ? 'bg-violet-500 text-white hover:bg-violet-600'
                        : 'bg-violet-500 text-white hover:bg-violet-600'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enable Sync Mode
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Link to Full PM Dashboard */}
            <motion.button
              className={`w-full p-4 ${cardRadius} bg-gradient-to-r border flex items-center justify-between transition-all ${
                mode === 'Chill'
                  ? 'from-violet-50 to-purple-50 border-violet-200 hover:border-violet-300 text-violet-700'
                  : 'from-violet-500/10 to-purple-500/10 border-violet-500/30 hover:border-violet-500/50 text-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={{ y: mode === 'Chill' ? -2 : -1, scale: mode === 'Sprint' ? 1.01 : 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => context.setCurrentScreen('pm')}
            >
              <div className="text-left">
                <p className={`text-sm mb-1 ${mode === 'Chill' ? 'text-violet-700' : 'text-white'}`}>
                  Need deeper insights?
                </p>
                <p className={`text-xs ${mode === 'Chill' ? 'text-violet-600' : 'text-neutral-400'}`}>
                  View Full PM Dashboard
                </p>
              </div>
              <ChevronRight className={`w-5 h-5 ${mode === 'Chill' ? 'text-violet-700' : 'text-white'}`} />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}