import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemberSidebar } from './components/MemberSidebar';
import { PMSidebar } from './components/PMSidebar';
import { TopBar } from './components/TopBar';
import { MemberAIGuide } from './components/MemberAIGuide';
import { PMAIGuide } from './components/PMAIGuide';
import { ModeTransitionOverlay } from './components/ModeTransitionOverlay';
import { SyncModeToast } from './components/SyncModeToast';
import { LandingScreen } from './components/screens/LandingScreen';
import { HomeDashboard } from './components/screens/HomeDashboard';
import { TaskManagement } from './components/screens/TaskManagement';
import { NotificationCenter } from './components/screens/NotificationCenter';
import { TeamEngagement } from './components/screens/TeamEngagement';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { PMDashboard } from './components/screens/PMDashboard';
import { IntegrationsScreen } from './components/screens/IntegrationsScreen';
import { PMTaskDiscussions } from './components/screens/PMTaskDiscussions';
import { FaviconManager } from './components/FaviconManager';

export type Mode = 'Sprint' | 'Focus' | 'Chill';
export type Screen = 'welcome' | 'home' | 'tasks' | 'notifications' | 'team' | 'insights' | 'settings' | 'pm' | 'integrations' | 'workload' | 'taskdiscussions';
export type Role = 'member' | 'pm';

export interface AppContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  showAIPanel: boolean;
  setShowAIPanel: (show: boolean) => void;
  role: Role;
  setRole: (role: Role) => void;
  syncModeActive: boolean;
  syncModeType: Mode | null;
}

export default function App() {
  const [mode, setMode] = useState<Mode>('Focus');
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>(() => {
    // Persist role selection in localStorage
    const saved = localStorage.getItem('cohesion-role');
    return (saved as Role) || 'member';
  });
  const [syncModeActive, setSyncModeActive] = useState(false);
  const [syncModeType, setSyncModeType] = useState<Mode | null>(null);
  const [previousSyncState, setPreviousSyncState] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Track sync mode state changes for toast notifications
  useEffect(() => {
    if (syncModeActive !== previousSyncState) {
      setPreviousSyncState(syncModeActive);
    }
  }, [syncModeActive, previousSyncState]);

  // Sync mode changes should trigger transitions
  useEffect(() => {
    if (syncModeActive && syncModeType) {
      setIsTransitioning(true);
      setMode(syncModeType);
      setTimeout(() => setIsTransitioning(false), 650);
    }
  }, [syncModeActive, syncModeType]);

  // Save role to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cohesion-role', role);
  }, [role]);

  useEffect(() => {
    // Ensure navigation resets to the appropriate home view when switching roles
    if (currentScreen !== 'welcome' && currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  }, [role, currentScreen]);

  // Theme configuration for each mode
  const modeThemes = {
    Sprint: {
      bg: 'bg-gradient-to-br from-[#1E1E1E] via-[#2A1F24] to-[#1E1E1E]',
      accent: '#FF4A4A',
      shadow: 'shadow-xl shadow-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
      cardBg: 'bg-neutral-900/60',
      rimLight: 'shadow-[0_0_60px_-12px_rgba(255,74,74,0.3)]',
    },
    Focus: {
      bg: 'bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200',
      accent: '#6B7280',
      shadow: 'shadow-lg shadow-neutral-300/20',
      text: 'text-neutral-600',
      border: 'border-neutral-300/40',
      cardBg: 'bg-white/80',
      rimLight: '',
    },
    Chill: {
      bg: 'bg-gradient-to-br from-[#F7F9FC] via-[#FAFBFD] to-[#F7F9FC]',
      accent: '#6CA8FF',
      shadow: 'shadow-[0_4px_16px_rgba(108,168,255,0.12)]',
      text: 'text-[#6CA8FF]',
      border: 'border-[rgba(108,168,255,0.15)]',
      cardBg: 'bg-white',
      rimLight: 'shadow-[0_0_40px_-12px_rgba(108,168,255,0.2)]',
      textPrimary: 'text-[#1E2A40]',
      textSecondary: 'text-[#3A4A62]',
      textMuted: 'text-[#7888A0]',
      panelBg: 'bg-gradient-to-br from-[#F7F9FC] via-[#FAFBFD] to-[#F7F9FC]',
      notificationInfo: 'bg-[rgba(108,168,255,0.12)]',
      notificationWarning: 'bg-[rgba(255,190,100,0.12)]',
      notificationSuccess: 'bg-[rgba(80,200,120,0.12)]',
      notificationNeutral: 'bg-[rgba(184,194,209,0.12)]',
      accentPurple: '#A9A2FF',
      accentGreen: '#88D4A7',
    },
  };

  const currentTheme = modeThemes[mode];

  useEffect(() => {
    // Auto-collapse sidebar and hide AI panel in Focus Mode
    if (mode === 'Focus') {
      setSidebarCollapsed(true);
      setShowAIPanel(false);
    } else {
      setSidebarCollapsed(false);
      setShowAIPanel(true);
    }
  }, [mode]);

  useEffect(() => {
    // Auto-suggest mode changes based on time of day (simulated AI)
    const hour = new Date().getHours();
    if (isLoggedIn && currentScreen === 'welcome') {
      setCurrentScreen('home');
    }
  }, [isLoggedIn, currentScreen]);

  const handleLogin = (selectedMode?: Mode) => {
    if (selectedMode) {
      setMode(selectedMode);
    }
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const appContext: AppContextType = {
    mode,
    setMode,
    currentScreen,
    setCurrentScreen,
    showAIPanel,
    setShowAIPanel,
    role,
    setRole,
    syncModeActive,
    syncModeType,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <LandingScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeDashboard context={appContext} />;
      case 'tasks':
        return <TaskManagement context={appContext} />;
      case 'notifications':
        return <NotificationCenter context={appContext} />;
      case 'team':
        return <TeamEngagement context={appContext} />;
      case 'settings':
        return <SettingsScreen context={appContext} />;
      case 'pm':
        return <PMDashboard context={appContext} />;
      case 'integrations':
        return <IntegrationsScreen context={appContext} />;
      case 'taskdiscussions':
        return <PMTaskDiscussions context={appContext} />;
      default:
        return <HomeDashboard context={appContext} />;
    }
  };

  if (currentScreen === 'welcome') {
    return renderScreen();
  }

  return (
    <>
      {/* Favicon Manager - updates favicon based on current mode */}
      <FaviconManager mode={mode} />
      
      {/* Mode Transition Overlay */}
      <ModeTransitionOverlay
        mode={mode}
        isTransitioning={isTransitioning}
        syncModeActive={syncModeActive}
        syncModeType={syncModeType}
      />

      {/* Sync Mode Toast Notifications */}
      <SyncModeToast
        syncModeActive={syncModeActive}
        syncModeType={syncModeType}
        role={role}
        previousSyncState={previousSyncState}
      />
      
      <motion.div
        key={mode}
        data-mode={mode}
        className={`min-h-screen ${currentTheme.bg} ${currentTheme.rimLight}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <TopBar 
          mode={mode} 
          setMode={setMode}
          currentTheme={currentTheme}
          showAIPanel={showAIPanel}
          setShowAIPanel={setShowAIPanel}
          role={role}
          setRole={setRole}
          syncModeActive={syncModeActive}
          syncModeType={syncModeType}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
        
        <div className="flex h-[calc(100vh-64px)]">
          {role === 'member' ? (
            <MemberSidebar
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
              mode={mode}
              currentTheme={currentTheme}
            />
          ) : (
            <PMSidebar
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
              mode={mode}
              currentTheme={currentTheme}
            />
          )}
          
          <motion.main
            className="flex-1 overflow-auto"
            layout
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </motion.main>

          {showAIPanel && currentScreen !== 'welcome' && (
            role === 'member' ? (
              <MemberAIGuide
                mode={mode}
                currentTheme={currentTheme}
                onClose={() => setShowAIPanel(false)}
              />
            ) : (
              <PMAIGuide
                mode={mode}
                currentTheme={currentTheme}
                onClose={() => setShowAIPanel(false)}
                context={appContext}
              />
            )
          )}
        </div>
      </motion.div>
    </>
  );
}