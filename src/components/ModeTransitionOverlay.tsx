import { motion, AnimatePresence } from 'motion/react';
import { Mode } from '../App';
import { useEffect, useState } from 'react';
import { Zap, Target, Heart, Waves } from 'lucide-react';

interface ModeTransitionOverlayProps {
  mode: Mode;
  isTransitioning: boolean;
  syncModeActive: boolean;
  syncModeType: Mode | null;
}

export function ModeTransitionOverlay({
  mode,
  isTransitioning,
  syncModeActive,
  syncModeType,
}: ModeTransitionOverlayProps) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShowParticles(true);
      setTimeout(() => setShowParticles(false), 650);
    }
  }, [isTransitioning]);

  const getModeIcon = (m: Mode) => {
    switch (m) {
      case 'Sprint':
        return Zap;
      case 'Focus':
        return Target;
      case 'Chill':
        return Heart;
    }
  };

  const getModeColor = (m: Mode) => {
    switch (m) {
      case 'Sprint':
        return 'from-red-500/30 via-red-500/20 to-transparent';
      case 'Focus':
        return 'from-neutral-500/20 via-neutral-500/10 to-transparent';
      case 'Chill':
        return 'from-blue-500/30 via-blue-500/20 to-transparent';
    }
  };

  const getModeParticleColor = (m: Mode) => {
    switch (m) {
      case 'Sprint':
        return 'bg-red-500';
      case 'Focus':
        return 'bg-neutral-400';
      case 'Chill':
        return 'bg-blue-400';
    }
  };

  const Icon = getModeIcon(mode);

  return (
    <>
      {/* Main Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Stage 1: Pre-sync signal (0-200ms) */}
            <motion.div
              className={`absolute inset-0 bg-gradient-radial ${getModeColor(mode)}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />

            {/* Stage 2: Environment transition (200-650ms) */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${
                mode === 'Sprint'
                  ? 'from-red-500/20 via-red-600/10 to-transparent'
                  : mode === 'Focus'
                  ? 'from-neutral-500/10 via-neutral-400/5 to-transparent'
                  : 'from-blue-500/20 via-purple-500/10 to-transparent'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />

            {/* Mode Icon Center Display */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <div
                className={`p-8 rounded-full backdrop-blur-xl border-2 ${
                  mode === 'Sprint'
                    ? 'bg-red-500/20 border-red-500/50'
                    : mode === 'Focus'
                    ? 'bg-neutral-500/20 border-neutral-500/50'
                    : 'bg-blue-500/20 border-blue-500/50'
                }`}
              >
                <Icon
                  className={`w-16 h-16 ${
                    mode === 'Sprint'
                      ? 'text-red-400'
                      : mode === 'Focus'
                      ? 'text-neutral-400'
                      : 'text-blue-400'
                  }`}
                />
              </div>
            </motion.div>

            {/* Sync Mode Label */}
            {syncModeActive && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500/20 backdrop-blur-xl border border-violet-500/50">
                  <Waves className="w-4 h-4 text-violet-400" />
                  <span className="text-white text-sm">Team Sync Active</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient Particles (Sprint Mode) */}
      <AnimatePresence>
        {showParticles && mode === 'Sprint' && (
          <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-red-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  y: [0, -30],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Ambient Fog (Focus Mode) */}
      <AnimatePresence>
        {showParticles && mode === 'Focus' && (
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none bg-neutral-500/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Floating Bubbles (Chill Mode) */}
      <AnimatePresence>
        {showParticles && mode === 'Chill' && (
          <div className="fixed inset-0 z-30 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm"
                style={{
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${100 + Math.random() * 20}%`,
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [0, -600 - Math.random() * 200],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.15,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Blur Blend Layer (All Modes) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-35 pointer-events-none backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
