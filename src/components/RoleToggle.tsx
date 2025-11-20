import { motion } from 'motion/react';
import { User, Shield } from 'lucide-react';
import { Mode, Screen } from '../App';

interface RoleToggleProps {
  role: 'member' | 'pm';
  setRole: (role: 'member' | 'pm') => void;
  mode: Mode;
  currentScreen?: Screen;
  setCurrentScreen?: (screen: Screen) => void;
}

export function RoleToggle({ role, setRole, mode, currentScreen, setCurrentScreen }: RoleToggleProps) {
  const isDark = mode !== 'Focus';

  const handleRoleChange = (newRole: 'member' | 'pm') => {
    setRole(newRole);
    
    // Always navigate to home screen when switching roles
    if (setCurrentScreen) {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Toggle Control - Removed Badge */}
      <div className={`flex rounded-xl p-1 ${
        mode === 'Chill'
          ? 'bg-white border border-[rgba(108,168,255,0.15)]'
          : isDark
          ? 'bg-neutral-800/50 border border-red-500/20'
          : 'bg-neutral-100 border border-neutral-300/30'
      }`}>
        <motion.button
          onClick={() => handleRoleChange('member')}
          className={`px-4 py-2 rounded-lg text-sm relative transition-colors ${
            role === 'member'
              ? mode === 'Chill'
                ? 'text-[#1E2A40]'
                : isDark
                ? 'text-white'
                : 'text-neutral-900'
              : mode === 'Chill'
              ? 'text-[#7888A0] hover:text-[#3A4A62]'
              : isDark
              ? 'text-neutral-500 hover:text-neutral-300'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {role === 'member' && (
            <motion.div
              className={`absolute inset-0 rounded-lg ${
                mode === 'Sprint'
                  ? 'bg-red-500/20'
                  : mode === 'Chill'
                  ? 'bg-[#6CA8FF]/20'
                  : 'bg-neutral-300/50'
              }`}
              layoutId="roleIndicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <User className="w-4 h-4" />
            Member
          </span>
          {role === 'member' && (
            <motion.div
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full ${
                mode === 'Sprint'
                  ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                  : mode === 'Chill'
                  ? 'bg-[#6CA8FF] shadow-[0_0_8px_rgba(108,168,255,0.5)]'
                  : 'bg-neutral-600 shadow-[0_0_4px_rgba(0,0,0,0.2)]'
              }`}
              layoutId="roleGlow"
            />
          )}
        </motion.button>

        <motion.button
          onClick={() => handleRoleChange('pm')}
          className={`px-4 py-2 rounded-lg text-sm relative transition-colors ${
            role === 'pm'
              ? 'text-violet-400'
              : mode === 'Chill'
              ? 'text-[#7888A0] hover:text-[#3A4A62]'
              : isDark
              ? 'text-neutral-500 hover:text-neutral-300'
              : 'text-neutral-600 hover:text-neutral-800'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {role === 'pm' && (
            <motion.div
              className="absolute inset-0 rounded-lg bg-violet-500/20"
              layoutId="roleIndicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Project Manager
          </span>
          {role === 'pm' && (
            <motion.div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]"
              layoutId="roleGlow"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}