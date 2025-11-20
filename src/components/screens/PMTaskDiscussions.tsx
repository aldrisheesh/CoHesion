import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Clock, AlertCircle, Users, Pin, TrendingUp } from 'lucide-react';
import { AppContextType } from '../../App';
import { useState, useEffect } from 'react';
import { ThreadPanel } from '../communication/ThreadPanel';
import { conversationManager } from '../../utils/conversationManager';

interface Task {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Blocked' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assignee: string;
  project: string;
  description?: string;
  unreadMessages?: number;
  messageCount?: number;
  lastMessageTime?: Date;
}

interface PMTaskDiscussionsProps {
  context: AppContextType;
}

export function PMTaskDiscussions({ context }: PMTaskDiscussionsProps) {
  const { mode } = context;
  const isDark = mode !== 'Focus';

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Implement user authentication flow', 
      status: 'In Progress', 
      priority: 'High', 
      dueDate: 'Tomorrow', 
      assignee: 'You',
      project: 'Auth System',
      description: 'Set up OAuth 2.0 with JWT tokens',
    },
    { 
      id: '2', 
      title: 'Design dashboard layout', 
      status: 'Blocked', 
      priority: 'High', 
      dueDate: 'Today', 
      assignee: 'Roi Santos',
      project: 'Dashboard',
      description: 'Create wireframes and mockups',
    },
    { 
      id: '3', 
      title: 'Write API documentation', 
      status: 'To Do', 
      priority: 'Medium', 
      dueDate: 'Dec 20', 
      assignee: 'Stephen Robiso',
      project: 'Documentation',
      description: 'Document all REST endpoints'
    },
    { 
      id: '4', 
      title: 'Fix responsive layout issues', 
      status: 'Done', 
      priority: 'Medium', 
      dueDate: 'Dec 18', 
      assignee: 'You',
      project: 'Frontend',
      description: 'Mobile and tablet breakpoints'
    },
    { 
      id: '5', 
      title: 'Set up CI/CD pipeline', 
      status: 'In Progress', 
      priority: 'Low', 
      dueDate: 'Next week', 
      assignee: 'Shane Binuya',
      project: 'DevOps',
      description: 'GitHub Actions workflow',
    },
  ]);

  // Update tasks with conversation data
  useEffect(() => {
    const updateTasksWithConversationData = () => {
      const updatedTasks = tasks.map(task => {
        const conversation = conversationManager.getConversation(task.id);
        return {
          ...task,
          unreadMessages: conversation.unreadCount,
          messageCount: conversation.messages.length,
          lastMessageTime: conversation.messages.length > 0 
            ? conversation.messages[conversation.messages.length - 1].timestamp 
            : undefined,
        };
      });
      setTasks(updatedTasks);
    };
    
    updateTasksWithConversationData();
    
    // Update when drawer closes
    if (!drawerOpen) {
      updateTasksWithConversationData();
    }
  }, [drawerOpen]);

  // Sort tasks by last message time (most recent first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.lastMessageTime && !b.lastMessageTime) return 0;
    if (!a.lastMessageTime) return 1;
    if (!b.lastMessageTime) return -1;
    return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Blocked':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Done':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">MED</span>;
      case 'Low':
        return <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">LOW</span>;
    }
  };

  const formatLastMessageTime = (time?: Date) => {
    if (!time) return 'No messages';
    
    const now = new Date();
    const diff = now.getTime() - time.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className={`${mode === 'Sprint' ? 'p-6' : mode === 'Chill' ? 'p-12' : 'p-8'} max-w-7xl mx-auto`}>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className={mode === 'Chill' ? 'w-8 h-8 text-[#6CA8FF]' : 'w-8 h-8 text-violet-400'} />
          <h1 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
            Task Discussions
          </h1>
        </div>
        <p className={mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
          View and participate in all task conversations across the team
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div
          className={`p-4 rounded-xl border ${
            mode === 'Chill'
              ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)]'
              : isDark
              ? 'bg-neutral-900/50 border-violet-500/20'
              : 'bg-white border-neutral-300/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${mode === 'Chill' ? 'bg-[#6CA8FF]/10' : 'bg-violet-500/10'}`}>
              <MessageSquare className={`w-5 h-5 ${mode === 'Chill' ? 'text-[#6CA8FF]' : 'text-violet-400'}`} />
            </div>
            <div>
              <div className={`text-2xl ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                {tasks.reduce((sum, t) => sum + (t.messageCount || 0), 0)}
              </div>
              <div className={`text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`}>
                Total Messages
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`p-4 rounded-xl border ${
            mode === 'Chill'
              ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)]'
              : isDark
              ? 'bg-neutral-900/50 border-violet-500/20'
              : 'bg-white border-neutral-300/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${mode === 'Chill' ? 'bg-red-500/10' : 'bg-red-500/10'}`}>
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className={`text-2xl ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                {tasks.reduce((sum, t) => sum + (t.unreadMessages || 0), 0)}
              </div>
              <div className={`text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`}>
                Unread Messages
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`p-4 rounded-xl border ${
            mode === 'Chill'
              ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)]'
              : isDark
              ? 'bg-neutral-900/50 border-violet-500/20'
              : 'bg-white border-neutral-300/30'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${mode === 'Chill' ? 'bg-green-500/10' : 'bg-green-500/10'}`}>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className={`text-2xl ${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                {tasks.filter(t => (t.messageCount || 0) > 0).length}
              </div>
              <div className={`text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`}>
                Active Threads
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.id}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              mode === 'Chill'
                ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)] hover:border-[#6CA8FF]/30 hover:shadow-lg'
                : isDark
                ? 'bg-neutral-900/50 border-violet-500/20 hover:border-violet-500/40 hover:bg-neutral-900/70'
                : 'bg-white border-neutral-300/30 hover:border-neutral-400/50 hover:shadow-lg'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => {
              setSelectedTask(task);
              setDrawerOpen(true);
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`${mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {task.title}
                  </h3>
                  {getPriorityBadge(task.priority)}
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <span className={`text-sm px-2 py-1 rounded border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`}>
                    {task.project}
                  </span>
                  <div className={`flex items-center gap-1 text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-400'}`}>
                    <Users className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-4 text-sm ${mode === 'Chill' ? 'text-[#7888A0]' : 'text-neutral-500'}`}>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{task.messageCount || 0} messages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatLastMessageTime(task.lastMessageTime)}</span>
                  </div>
                </div>
              </div>

              {/* Unread Badge */}
              {task.unreadMessages && task.unreadMessages > 0 && (
                <motion.div
                  className={`px-3 py-1.5 rounded-full ${
                    mode === 'Chill' 
                      ? 'bg-[#6CA8FF] text-white' 
                      : 'bg-violet-500 text-white'
                  } shadow-lg`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span className="text-sm">{task.unreadMessages} new</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Communication Drawer */}
      {selectedTask && (
        <ThreadPanel
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          taskId={selectedTask.id}
          taskTitle={selectedTask.title}
          projectName={selectedTask.project}
          assignees={[selectedTask.assignee]}
          status={selectedTask.status}
          mode={mode}
          currentUserRole={context.role}
          syncModeActive={context.syncModeActive}
        />
      )}
    </div>
  );
}