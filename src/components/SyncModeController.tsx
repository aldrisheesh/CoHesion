import { motion, AnimatePresence } from 'motion/react';
import { Radio, Zap, Target, Heart, Shield, AlertTriangle, Unlock } from 'lucide-react';
import { Mode } from '../App';
import { useState } from 'react';

interface SyncModeControllerProps {
  mode: Mode;
  role: 'member' | 'pm';
  syncModeActive: boolean;
  setSyncModeActive: (active: boolean) => void;
  syncModeType: Mode | null;
  setSyncModeType: (mode: Mode | null) => void;
  setMode: (mode: Mode) => void;
}

export function SyncModeController({
  mode,
  role,
  syncModeActive,
  setSyncModeActive,
  syncModeType,
  setSyncModeType,
  setMode,
}: SyncModeControllerProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [pendingMode, setPendingMode] = useState<Mode | null>(null);

  const handleEnableSyncMode = (targetMode: Mode) => {
    if (role !== 'pm') return;

    // Show warning for Sprint mode
    if (targetMode === 'Sprint') {
      setShowWarning(true);
      setPendingMode(targetMode);
      return;
    }

    // Activate sync mode
    activateSyncMode(targetMode);
  };

  const activateSyncMode = (targetMode: Mode) => {
    setSyncModeActive(true);
    setSyncModeType(targetMode);
    setMode(targetMode);
    setShowWarning(false);
    setPendingMode(null);
  };

  const handleDisableSyncMode = () => {
    if (role !== 'pm') return;
    setSyncModeActive(false);
    setSyncModeType(null);
  };

  // Only render PM controls
  if (role !== 'pm') return null;

  return (
    <>
      {/* Sync Mode Control Panel */}
      <motion.div
        className="p-5 rounded-xl bg-neutral-900/60 border border-violet-500/20 backdrop-blur-sm space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-violet-400" />
            <h3 className="text-white">Team Sync Mode</h3>
          </div>
          {syncModeActive && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs text-violet-300">Active</span>
            </div>
          )}
        </div>

        <p className="text-sm text-neutral-400 mb-4">
          Force all team members into synchronized mode
        </p>

        {/* Mode Control Buttons */}
        <div className="space-y-2">
          <motion.button
            onClick={() => handleEnableSyncMode('Sprint')}
            disabled={syncModeActive && syncModeType === 'Sprint'}
            className={`w-full p-3 rounded-lg text-sm flex items-center gap-3 transition-all group ${
              syncModeActive && syncModeType === 'Sprint'
                ? 'bg-red-500/30 border-2 border-red-500 text-white cursor-not-allowed'
                : 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400'
            }`}
            whileHover={!(syncModeActive && syncModeType === 'Sprint') ? { scale: 1.02, x: -2 } : {}}
            whileTap={!(syncModeActive && syncModeType === 'Sprint') ? { scale: 0.98 } : {}}
          >
            <Zap className="w-4 h-4" />
            <span className="flex-1 text-left">Force Sprint Mode</span>
            {syncModeActive && syncModeType === 'Sprint' && (
              <Shield className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            onClick={() => handleEnableSyncMode('Focus')}
            disabled={syncModeActive && syncModeType === 'Focus'}
            className={`w-full p-3 rounded-lg text-sm flex items-center gap-3 transition-all group ${
              syncModeActive && syncModeType === 'Focus'
                ? 'bg-neutral-700/50 border-2 border-neutral-500 text-white cursor-not-allowed'
                : 'bg-neutral-700/30 hover:bg-neutral-700/50 border border-neutral-600/30 text-neutral-300'
            }`}
            whileHover={!(syncModeActive && syncModeType === 'Focus') ? { scale: 1.02, x: -2 } : {}}
            whileTap={!(syncModeActive && syncModeType === 'Focus') ? { scale: 0.98 } : {}}
          >
            <Target className="w-4 h-4" />
            <span className="flex-1 text-left">Start Focus Session</span>
            {syncModeActive && syncModeType === 'Focus' && (
              <Shield className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            onClick={() => handleEnableSyncMode('Chill')}
            disabled={syncModeActive && syncModeType === 'Chill'}
            className={`w-full p-3 rounded-lg text-sm flex items-center gap-3 transition-all group ${
              syncModeActive && syncModeType === 'Chill'
                ? 'bg-blue-500/30 border-2 border-blue-500 text-white cursor-not-allowed'
                : 'bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400'
            }`}
            whileHover={!(syncModeActive && syncModeType === 'Chill') ? { scale: 1.02, x: -2 } : {}}
            whileTap={!(syncModeActive && syncModeType === 'Chill') ? { scale: 0.98 } : {}}
          >
            <Heart className="w-4 h-4" />
            <span className="flex-1 text-left">Initiate Chill Cooldown</span>
            {syncModeActive && syncModeType === 'Chill' && (
              <Shield className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Disable Sync Mode */}
        {syncModeActive && (
          <motion.button
            onClick={handleDisableSyncMode}
            className="w-full p-3 rounded-lg text-sm flex items-center justify-center gap-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 text-violet-300 transition-all mt-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Unlock className="w-4 h-4" />
            Disable Sync Mode
          </motion.button>
        )}
      </motion.div>

      {/* Sprint Mode Warning Modal */}
      <AnimatePresence>
        {showWarning && pendingMode === 'Sprint' && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-neutral-900 border border-orange-500/50 rounded-2xl p-6 max-w-md shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-orange-500/20">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-white text-lg">Sprint Mode Warning</h3>
              </div>
              
              <p className="text-neutral-300 mb-2">
                Forcing Sprint Mode will override all team members' individual modes and may increase burnout risk.
              </p>
              <p className="text-neutral-400 text-sm mb-6">
                This action will synchronize the entire team to high-intensity work mode.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowWarning(false);
                    setPendingMode(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => activateSyncMode('Sprint')}
                  className="flex-1 px-4 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  Enable Sprint Sync
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
