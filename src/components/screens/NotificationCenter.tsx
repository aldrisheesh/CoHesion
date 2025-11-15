import { motion, AnimatePresence } from 'motion/react';
import { Bell, AlertCircle, Info, CheckCircle, X, Archive, Filter } from 'lucide-react';
import { AppContextType } from '../../App';
import { useState } from 'react';

interface NotificationCenterProps {
  context: AppContextType;
}

export function NotificationCenter({ context }: NotificationCenterProps) {
  const { mode } = context;
  const isDark = mode === 'Sprint';
  const isChill = mode === 'Chill';

  const [filter, setFilter] = useState<'all' | 'urgent' | 'batched'>('all');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', title: 'Client review in 30 minutes', message: 'Prepare final slides', time: '30m ago', priority: 'high', batched: false },
    { id: 2, type: 'critical', title: 'Budget approval needed', message: 'Review and approve Q1 budget allocation', time: '1h ago', priority: 'high', batched: false },
    { id: 3, type: 'info', title: 'Team sync completed', message: 'Notes available in shared drive', time: '2h ago', priority: 'low', batched: true },
    { id: 4, type: 'success', title: 'Task completed', message: 'Design mockups approved by team', time: '3h ago', priority: 'low', batched: true },
    { id: 5, type: 'info', title: 'New comment on document', message: 'Sarah commented on Q4 Report', time: '4h ago', priority: 'medium', batched: true },
    { id: 6, type: 'urgent', title: 'Server deployment pending', message: 'Awaiting final approval', time: '5h ago', priority: 'high', batched: false },
  ]);

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
      case 'critical':
        return AlertCircle;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    if (mode === 'Chill') {
      // Clean white cards with subtle colored borders for Chill mode
      if (type === 'urgent' || type === 'critical') {
        return 'border-orange-200 bg-white shadow-sm';
      }
      if (type === 'success') {
        return 'border-green-200 bg-white shadow-sm';
      }
      return 'border-blue-200 bg-white shadow-sm';
    }
    
    // Sprint/Focus modes
    if (type === 'urgent' || type === 'critical') {
      return mode === 'Sprint' ? 'border-red-500/30 bg-red-500/10' : 'border-red-500/30 bg-red-500/10';
    }
    if (type === 'success') return 'border-green-500/30 bg-green-500/10';
    return isDark ? 'border-neutral-700 bg-neutral-800/50' : 'border-neutral-300/30 bg-white/80';
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'urgent') return n.priority === 'high';
    if (filter === 'batched') return n.batched;
    return true;
  });

  const batchedCount = notifications.filter(n => n.batched).length;
  const urgentCount = notifications.filter(n => n.priority === 'high').length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className={`w-6 h-6 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-[var(--color-accent-primary)]' : 'text-neutral-600'}`} />
              <h1 className={mode === 'Chill' ? 'text-[var(--color-text-primary)]' : isDark ? 'text-white' : 'text-neutral-900'}>Notifications</h1>
            </div>
            <p className={mode === 'Chill' ? 'text-[var(--color-text-secondary)]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
              {notifications.length} total · {urgentCount} urgent · {batchedCount} batched
            </p>
          </div>
          <motion.button
            className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
              mode === 'Chill' 
                ? 'bg-[var(--color-card)] text-[var(--color-text-primary)] border-[var(--color-border-soft)]' 
                : isDark ? 'bg-neutral-800/50 text-white border-red-500/20' 
                : 'bg-white/80 text-neutral-900 border-neutral-300/30'
            } border hover:border-opacity-50 transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Archive className="w-5 h-5" />
            Clear All
          </motion.button>
        </div>
      </motion.div>

      {/* Mode Info Banner */}
      {mode !== 'Sprint' && (
        <motion.div
          className={`mb-6 p-4 rounded-xl ${
            mode === 'Focus' 
              ? 'bg-neutral-100 border border-neutral-300/50' 
              : 'bg-white border border-blue-300/40 shadow-sm'
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <Info className={mode === 'Chill' ? 'text-blue-600' : 'text-neutral-600'} />
            <div className="flex-1">
              <p className={isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
                {mode === 'Focus' 
                  ? 'Notifications are batched in Focus Mode. They\'ll appear here without interrupting your work.'
                  : 'Push alerts are disabled in Chill Mode. Review at your own pace.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Filter Tabs */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className={`flex items-center gap-2 p-1.5 rounded-xl ${
          mode === 'Chill' 
            ? 'bg-[var(--surface-card)]' 
            : isDark ? 'bg-neutral-800/50' : 'bg-white/80'
        }`}>
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'urgent', label: 'Urgent', count: urgentCount },
            { id: 'batched', label: 'Batched', count: batchedCount },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all relative flex items-center gap-2 ${
                filter === tab.id
                  ? isDark ? 'text-white' : 'text-neutral-900'
                  : isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter === tab.id && (
                <motion.div
                  className={`absolute inset-0 rounded-lg ${mode === 'Sprint' ? 'bg-red-500/20' : mode === 'Chill' ? 'bg-blue-500/20' : 'bg-neutral-300/30'}`}
                  layoutId="notifFilterActive"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span className={`relative z-10 px-2 py-0.5 rounded-full text-xs ${isDark ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div className="space-y-3" layout>
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <motion.div
                key={notification.id}
                className={`p-5 rounded-2xl border backdrop-blur-sm ${getNotificationColor(notification.type)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                layout
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'urgent' || notification.type === 'critical'
                      ? mode === 'Sprint' ? 'bg-red-500/20' : 'bg-orange-500/20'
                      : notification.type === 'success'
                      ? 'bg-green-500/20'
                      : isDark ? 'bg-neutral-700' : 'bg-neutral-200'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      notification.type === 'urgent' || notification.type === 'critical'
                        ? mode === 'Sprint' ? 'text-red-500' : 'text-orange-500'
                        : notification.type === 'success'
                        ? 'text-green-500'
                        : isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`${isChill ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>{notification.title}</h3>
                      <motion.button
                        onClick={() => dismissNotification(notification.id)}
                        className={`p-1 rounded hover:bg-neutral-700/20 ${isChill ? 'text-[#7888A0]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className={`mb-2 ${isChill ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{notification.message}</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${isChill ? 'text-[#7888A0]' : isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>{notification.time}</span>
                      {notification.batched && (
                        <span className={`px-2 py-0.5 rounded-full text-xs ${mode === 'Chill' ? 'bg-blue-100 text-blue-700 border border-blue-200' : isDark ? 'bg-neutral-700 text-neutral-400' : 'bg-neutral-200 text-neutral-600'}`}>
                          Batched
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredNotifications.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Bell className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`} />
          <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>No notifications to display</p>
        </motion.div>
      )}
    </div>
  );
}