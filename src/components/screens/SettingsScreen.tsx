import { motion } from 'motion/react';
import { Settings, User, Bell, Palette, Zap, Shield, Moon, Sun } from 'lucide-react';
import { AppContextType } from '../../App';
import { useState } from 'react';

interface SettingsScreenProps {
  context: AppContextType;
}

export function SettingsScreen({ context }: SettingsScreenProps) {
  const { mode } = context;
  const isDark = mode === 'Sprint';
  const isChill = mode === 'Chill';

  const [settings, setSettings] = useState({
    autoModeSwitch: true,
    smartNotifications: true,
    energyTracking: true,
    breakReminders: true,
    teamVisibility: true,
    darkMode: false,
  });

  const toggleSetting = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const settingsSections = [
    {
      title: 'AI & Automation',
      icon: Zap,
      settings: [
        { key: 'autoModeSwitch', label: 'Auto Mode Switching', description: 'Let AI suggest mode changes based on your activity' },
        { key: 'smartNotifications', label: 'Smart Notifications', description: 'AI-powered notification prioritization and batching' },
      ],
    },
    {
      title: 'Well-being',
      icon: User,
      settings: [
        { key: 'energyTracking', label: 'Energy Tracking', description: 'Monitor your productivity patterns and energy levels' },
        { key: 'breakReminders', label: 'Break Reminders', description: 'Receive gentle reminders to take breaks' },
      ],
    },
    {
      title: 'Team',
      icon: Shield,
      settings: [
        { key: 'teamVisibility', label: 'Team Visibility', description: 'Allow team members to see your current mode and availability' },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings className={`w-6 h-6 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-[#6CA8FF]' : 'text-neutral-600'}`} />
          <h1 className={isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>Settings & Preferences</h1>
        </div>
        <p className={isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          Customize your CoHesion experience
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        className={`mb-8 p-6 rounded-2xl border backdrop-blur-sm shadow-sm ${
          mode === 'Sprint' 
            ? 'bg-neutral-800/50 border-red-500/20' 
            : mode === 'Chill' 
            ? 'bg-white border-blue-200' 
            : 'bg-white/80 border-neutral-300/30'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${mode === 'Sprint' ? 'from-red-500 to-red-600' : mode === 'Chill' ? 'from-blue-500 to-blue-600' : 'from-neutral-400 to-neutral-500'} flex items-center justify-center`}>
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className={`mb-1 ${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>Alex Thompson</h2>
            <p className={isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>alex.thompson@cohesion.com</p>
            <div className="flex items-center gap-3 mt-2">
              <span className={`px-3 py-1 rounded-full ${mode === 'Sprint' ? 'bg-red-500/20 text-red-400' : mode === 'Chill' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-500/20 text-neutral-600'}`}>
                {mode} Mode Active
              </span>
              <span className={`px-3 py-1 rounded-full ${isChill ? 'bg-neutral-100 text-[#3A4A62]' : isDark ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}>
                Product Manager
              </span>
            </div>
          </div>
          <motion.button
            className={`px-6 py-3 rounded-xl ${mode === 'Sprint' ? 'bg-red-500 text-white' : mode === 'Chill' ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-white'} hover:opacity-90 transition-opacity`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Edit Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={sectionIndex}
              className={`p-6 rounded-2xl border backdrop-blur-sm shadow-sm ${
                mode === 'Sprint' 
                  ? 'bg-neutral-800/50 border-red-500/20' 
                  : mode === 'Chill' 
                  ? 'bg-white border-blue-200' 
                  : 'bg-white/80 border-neutral-300/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${mode === 'Sprint' ? 'bg-red-500/20' : mode === 'Chill' ? 'bg-blue-500/20' : 'bg-neutral-300/30'}`}>
                  <Icon className={`w-5 h-5 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-blue-500' : 'text-neutral-600'}`} />
                </div>
                <h3 className={isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>{section.title}</h3>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={settingIndex}
                    className={`p-4 rounded-xl flex items-center justify-between ${
                      mode === 'Sprint' 
                        ? 'bg-neutral-900/50' 
                        : mode === 'Chill' 
                        ? 'bg-blue-50/50 border border-blue-100' 
                        : 'bg-neutral-50'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sectionIndex * 0.1 + settingIndex * 0.05 }}
                  >
                    <div className="flex-1">
                      <h4 className={`mb-1 ${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{setting.label}</h4>
                      <p className={`text-sm ${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{setting.description}</p>
                    </div>
                    <motion.button
                      onClick={() => toggleSetting(setting.key)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        settings[setting.key as keyof typeof settings]
                          ? mode === 'Sprint' ? 'bg-red-500' : mode === 'Chill' ? 'bg-blue-500' : 'bg-neutral-600'
                          : isDark ? 'bg-neutral-700' : 'bg-neutral-300'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                        animate={{ x: settings[setting.key as keyof typeof settings] ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mode Preferences */}
      <motion.div
        className={`mt-6 p-6 rounded-2xl border backdrop-blur-sm shadow-sm ${
          mode === 'Sprint' 
            ? 'bg-neutral-800/50 border-red-500/20' 
            : mode === 'Chill' 
            ? 'bg-white border-blue-200' 
            : 'bg-white/80 border-neutral-300/30'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${mode === 'Sprint' ? 'bg-red-500/20' : mode === 'Chill' ? 'bg-blue-500/20' : 'bg-neutral-300/30'}`}>
            <Palette className={`w-5 h-5 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-blue-500' : 'text-neutral-600'}`} />
          </div>
          <h3 className={isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>Mode Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { mode: 'Sprint', color: 'red', icon: Zap, description: 'High-energy urgent tasks' },
            { mode: 'Focus', color: 'neutral', icon: User, description: 'Deep work sessions' },
            { mode: 'Chill', color: 'blue', icon: Moon, description: 'Relaxation & reflection' },
          ].map((modeOption, index) => {
            const Icon = modeOption.icon;
            const isCurrentMode = mode === modeOption.mode;
            return (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  isCurrentMode
                    ? modeOption.color === 'red' ? 'border-red-500 bg-red-500/10' :
                      modeOption.color === 'blue' ? 'border-blue-500 bg-blue-500/10' :
                      'border-neutral-500 bg-neutral-500/10'
                    : isDark 
                      ? 'border-neutral-700 bg-neutral-900/50 hover:border-neutral-600' 
                      : isChill 
                      ? 'border-blue-200 bg-blue-50/30 hover:border-blue-300' 
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => context.setMode(modeOption.mode as any)}
              >
                <Icon className={`w-6 h-6 mb-3 ${
                  modeOption.color === 'red' ? 'text-red-500' :
                  modeOption.color === 'blue' ? 'text-blue-500' :
                  'text-neutral-600'
                }`} />
                <h4 className={`mb-1 ${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{modeOption.mode}</h4>
                <p className={`text-sm ${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{modeOption.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}