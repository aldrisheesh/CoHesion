  import { motion } from 'motion/react';
  import { Home, LayoutDashboard, Users, Briefcase, Puzzle, Settings, ChevronLeft, ChevronRight, Sparkles, Shield, MessageSquare } from 'lucide-react';
  import { Screen, Mode } from '../App';
  
  interface PMSidebarProps {
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mode: Mode;
    currentTheme: any;
  }
  
  export function PMSidebar({ 
    currentScreen, 
    setCurrentScreen, 
    collapsed, 
    setCollapsed, 
    mode, 
    currentTheme 
  }: PMSidebarProps) {
    // PM-only navigation - no Member screens visible (Tasks, Notifications, Team Energy hidden)
    const managementItems = [
      { id: 'home' as Screen, icon: Home, label: 'PM Home Overview' },
      { id: 'pm' as Screen, icon: LayoutDashboard, label: 'PM Dashboard' },
      { id: 'team' as Screen, icon: Users, label: 'Team Overview' },
      { id: 'taskdiscussions' as Screen, icon: MessageSquare, label: 'Task Discussions' },
    ];
  
    // Automation and System sections remain visible for both roles
    const automationItems = [
      { id: 'integrations' as Screen, icon: Puzzle, label: 'Integrations' },
    ];
  
    const systemItems = [
      { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
    ];
  
    const renderNavItem = (item: typeof managementItems[0]) => {
      const Icon = item.icon;
      const isActive = currentScreen === item.id;
      
      return (
        <motion.button
          key={item.id}
          onClick={() => setCurrentScreen(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden ${
            isActive
              ? 'text-neutral-400 hover:text-white'
              : mode === 'Chill'
              ? 'text-neutral-400 hover:text-white'
              : mode === 'Focus'
              ? 'text-neutral-400 hover:text-white'
              : 'text-neutral-400 hover:text-white'
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-violet-500/20"
              layoutId="activePMNav"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-violet-400' : ''}`} />
          {!collapsed && (
            <span className="relative z-10">{item.label}</span>
          )}
        </motion.button>
      );
    };
  
    return (
      <motion.aside
        className={`${
          mode === 'Chill' 
            ? 'bg-gradient-to-b from-[#2D3548] to-[#1E2534] backdrop-blur-xl' 
            : mode === 'Focus' 
            ? 'bg-gradient-to-b from-neutral-800 to-neutral-900 backdrop-blur-xl' 
            : 'bg-gradient-to-b from-[#1A1A1A] via-[#1E1A24] to-[#1A1A1A] backdrop-blur-xl'
        } border-r ${
          mode === 'Chill' 
            ? 'border-violet-500/20' 
            : 'border-violet-500/20'
        } h-full relative`}
        initial={{ width: collapsed ? 80 : 260 }}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full p-4">
          {/* PM Mode Label with Badge */}
          {!collapsed && (
            <motion.div
              className="mb-4 pb-3 border-b border-violet-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" />
                <p className="text-xs uppercase tracking-wider text-violet-400">
                  Project Manager
                </p>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Management Console</p>
            </motion.div>
          )}
  
          <nav className="flex-1 space-y-6">
            {/* Management Section */}
            <div className="space-y-1">
              {!collapsed && (
                <p className="text-xs uppercase tracking-wider text-neutral-500 px-2 mb-2">
                  Management
                </p>
              )}
              {managementItems.map(renderNavItem)}
            </div>
  
            {/* Automation Section */}
            <div className="space-y-1">
              {!collapsed && (
                <p className="text-xs uppercase tracking-wider text-neutral-500 px-2 mb-2">
                  Automation
                </p>
              )}
              {automationItems.map(renderNavItem)}
            </div>
  
            {/* System Section */}
            <div className="space-y-1">
              {!collapsed && (
                <p className="text-xs uppercase tracking-wider text-neutral-500 px-2 mb-2">
                  System
                </p>
              )}
              {systemItems.map(renderNavItem)}
            </div>
          </nav>
  
          {/* AI Insights Status for PM - Only visible when not collapsed */}
          {!collapsed && (
            <motion.div
              className="mb-3 p-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-violet-300">PM AI Guide</span>
              </div>
              <p className="text-xs text-neutral-400">
                {mode === 'Sprint' ? 'Team alerts & risks' : mode === 'Focus' ? 'Analytics mode' : 'Team insights'}
              </p>
            </motion.div>
          )}
  
          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            className="mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors border border-violet-500/20"
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