import { motion } from 'motion/react';
import { Home, CheckSquare, Bell, Users, Sparkles, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Screen, Mode } from '../App';

interface SidebarProps {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mode: Mode;
  currentTheme: any;
}

export function Sidebar({ currentScreen, setCurrentScreen, collapsed, setCollapsed, mode, currentTheme }: SidebarProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'tasks' as Screen, icon: CheckSquare, label: 'Tasks' },
    { id: 'notifications' as Screen, icon: Bell, label: 'Notifications' },
    { id: 'team' as Screen, icon: Users, label: 'Team Energy' },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.aside
      className={`${
        mode === 'Chill' 
          ? 'bg-[var(--color-surface)] backdrop-blur-xl' 
          : mode === 'Focus' 
          ? 'bg-white/60 backdrop-blur-xl' 
          : 'bg-neutral-900/60 backdrop-blur-xl'
      } border-r ${mode === 'Chill' ? 'border-[var(--color-border-soft)]' : currentTheme.border} h-full relative`}
      initial={{ width: collapsed ? 80 : 240 }}
      animate={{ width: collapsed ? 80 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex flex-col h-full p-4">
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
                  isActive
                    ? `${mode === 'Chill' ? 'text-[var(--color-text-primary)]' : mode === 'Focus' ? 'text-neutral-900' : 'text-white'}`
                    : `${mode === 'Chill' ? 'text-[#5A6B85] hover:text-[var(--color-text-primary)]' : mode === 'Focus' ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-400 hover:text-white'}`
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl ${
                      mode === 'Sprint' ? 'bg-red-500/20' : mode === 'Chill' ? 'bg-[var(--color-accent-primary)]/20' : 'bg-neutral-300/30'
                    }`}
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive && mode === 'Sprint' ? 'text-red-500' : isActive && mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : ''}`} />
                {!collapsed && (
                  <span className="relative z-10">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* AI Insights Toggle - Only visible when not collapsed */}
        {!collapsed && (
          <motion.div
            className={`mb-3 p-3 rounded-xl ${
              mode === 'Chill' 
                ? 'bg-gradient-to-br from-[var(--color-accent-secondary)]/10 to-[var(--color-accent-primary)]/10 border-[var(--color-accent-secondary)]/20' 
                : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20'
            } border`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className={`w-4 h-4 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : 'text-neutral-600'}`} />
              <span className={`text-xs ${mode === 'Chill' ? 'text-[var(--color-text-primary)]' : mode === 'Focus' ? 'text-neutral-900' : 'text-white'}`}>AI Insights</span>
            </div>
            <p className={`text-xs ${mode === 'Chill' ? 'text-[var(--color-text-muted)]' : mode === 'Focus' ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {mode === 'Sprint' ? 'Critical alerts active' : mode === 'Focus' ? 'Minimized view' : 'Wellness mode'}
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className={`mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${
            mode === 'Chill'
              ? 'bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-200)]'
              : mode === 'Focus' 
              ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200' 
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
          } transition-colors`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}