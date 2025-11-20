import { motion, AnimatePresence } from 'motion/react';
import { Waves, Zap, Target, Unlock, Shield } from 'lucide-react';
import { Mode } from '../App';
import { useEffect, useState } from 'react';

interface SyncModeToastProps {
  syncModeActive: boolean;
  syncModeType: Mode | null;
  role: 'member' | 'pm';
  previousSyncState: boolean;
}

export function SyncModeToast({
  syncModeActive,
  syncModeType,
  role,
  previousSyncState,
}: SyncModeToastProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastIcon, setToastIcon] = useState<React.ElementType>(Waves);

  useEffect(() => {
    // Detect sync mode changes
    if (syncModeActive && !previousSyncState) {
      // Sync mode just activated
      if (role === 'member') {
        if (syncModeType === 'Sprint') {
          setToastMessage('Sprint Mode is now active for everyone.');
          setToastIcon(Zap);
        } else if (syncModeType === 'Focus') {
          setToastMessage('Focus session initiated by Project Manager.');
          setToastIcon(Target);
        } else if (syncModeType === 'Chill') {
          setToastMessage('Team Chill Mode activated for recovery.');
          setToastIcon(Waves);
        }
      } else {
        setToastMessage('Sync Mode enabled successfully.');
        setToastIcon(Shield);
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } else if (!syncModeActive && previousSyncState) {
      // Sync mode just deactivated
      if (role === 'member') {
        setToastMessage('You now have control over your mode again.');
        setToastIcon(Unlock);
      } else {
        setToastMessage('Sync Mode disabled. Team modes restored.');
        setToastIcon(Unlock);
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  }, [syncModeActive, syncModeType, role, previousSyncState]);

  const Icon = toastIcon;

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] pointer-events-none"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div
            className={`px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 ${
              syncModeActive
                ? syncModeType === 'Sprint'
                  ? 'bg-red-500/20 border-red-500/50'
                  : syncModeType === 'Focus'
                  ? 'bg-neutral-600/20 border-neutral-500/50'
                  : 'bg-blue-500/20 border-blue-500/50'
                : 'bg-violet-500/20 border-violet-500/50'
            }`}
          >
            <div
              className={`p-2 rounded-full ${
                syncModeActive
                  ? syncModeType === 'Sprint'
                    ? 'bg-red-500/30'
                    : syncModeType === 'Focus'
                    ? 'bg-neutral-600/30'
                    : 'bg-blue-500/30'
                  : 'bg-violet-500/30'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  syncModeActive
                    ? syncModeType === 'Sprint'
                      ? 'text-red-400'
                      : syncModeType === 'Focus'
                      ? 'text-neutral-300'
                      : 'text-blue-400'
                    : 'text-violet-400'
                }`}
              />
            </div>
            <span className="text-white font-medium">{toastMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
