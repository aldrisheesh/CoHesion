import { motion } from 'motion/react';
import { User, Settings, Sparkles } from 'lucide-react';
import { Mode } from '../App';
import { useState } from 'react';
import { CoHesionLogo } from './CoHesionLogo';

interface TopBarProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentTheme: any;
  showAIPanel?: boolean;
  setShowAIPanel?: (show: boolean) => void;
}

export function TopBar({ mode, setMode, currentTheme, showAIPanel, setShowAIPanel }: TopBarProps) {
  const modes: Mode[] = ['Sprint', 'Focus', 'Chill'];
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleModeChange = (newMode: Mode) => {
    setIsTransitioning(true);
    setMode(newMode);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <>
      {/* Full-screen transition overlay */}
      {isTransitioning && (
        <motion.div
          className={`fixed inset-0 z-50 pointer-events-none ${
            mode === 'Sprint' 
              ? 'bg-red-500/20' 
              : mode === 'Chill' 
              ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
              : 'bg-neutral-400/10'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: mode === 'Sprint' ? 0.3 : mode === 'Focus' ? 0.8 : 0.6,
            ease: mode === 'Sprint' ? 'easeOut' : 'easeInOut'
          }}
        />
      )}

      <motion.header
        className={`h-16 ${
          mode === 'Chill' 
            ? 'bg-[var(--color-surface)] backdrop-blur-xl' 
            : mode === 'Focus' 
            ? 'bg-white/80 backdrop-blur-xl' 
            : 'bg-neutral-900/80 backdrop-blur-xl'
        } border-b ${mode === 'Chill' ? 'border-[var(--color-border-soft)]' : currentTheme.border} flex items-center justify-between px-6 sticky top-0 z-50`}
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <CoHesionLogo mode={mode} animated={false} />
            <span className={`${mode === 'Chill' ? 'text-[var(--color-text-primary)]' : mode === 'Focus' ? 'text-neutral-900' : 'text-white'}`}>CoHesion</span>
          </motion.div>
        </div>

        {/* Mode Toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-neutral-800/50 rounded-full p-1.5 backdrop-blur-sm">
          {modes.map((m) => (
            <motion.button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`px-6 py-2 rounded-full transition-all relative ${
                mode === m
                  ? 'text-white'
                  : mode === 'Focus'
                  ? 'text-neutral-500 hover:text-neutral-300'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mode === m && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${
                    m === 'Sprint' ? 'bg-red-500' : m === 'Chill' ? 'bg-blue-500' : 'bg-neutral-600'
                  }`}
                  layoutId="activeMode"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m}</span>
            </motion.button>
          ))}
        </div>

        {/* Profile Menu */}
        <div className="flex items-center gap-3">
          {/* AI Insights Toggle - Show in Focus Mode */}
          {mode === 'Focus' && setShowAIPanel && (
            <motion.button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                showAIPanel 
                  ? 'bg-neutral-300/50 text-neutral-900' 
                  : 'text-neutral-600 hover:bg-neutral-200/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI</span>
            </motion.button>
          )}
          
          <motion.button
            className={`p-2 rounded-lg hover:bg-neutral-700/30 transition-colors ${
              mode === 'Chill' 
                ? 'text-[#6CA8FF]' 
                : mode === 'Focus' 
                ? 'text-neutral-700' 
                : 'text-neutral-300'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
          <motion.div
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${mode === 'Sprint' ? 'from-red-500 to-red-600' : mode === 'Chill' ? 'from-blue-500 to-blue-600' : 'from-neutral-400 to-neutral-500'} flex items-center justify-center cursor-pointer`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            <User className="w-4 h-4 text-white" />
          </motion.div>
        </div>
      </motion.header>
    </>
  );
}