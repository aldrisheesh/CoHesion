import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Filter, Calendar, Flag, CheckCircle2, Circle, Sparkles, AlertCircle } from 'lucide-react';
import { AppContextType } from '../../App';
import { useState } from 'react';

interface TaskManagementProps {
  context: AppContextType;
}

export function TaskManagement({ context }: TaskManagementProps) {
  const { mode } = context;
  const isDark = mode !== 'Focus';

  const [filter, setFilter] = useState<'all' | 'today' | 'urgent'>('all');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Q4 Financial Report', priority: 'high', dueDate: 'Today', completed: false, category: 'Finance', progress: 65 },
    { id: 2, title: 'Client Presentation Deck', priority: 'high', dueDate: 'Today', completed: false, category: 'Sales', progress: 40 },
    { id: 3, title: 'Review Design Mockups', priority: 'medium', dueDate: 'Tomorrow', completed: false, category: 'Design', progress: 80 },
    { id: 4, title: 'Team Standup Notes', priority: 'low', dueDate: 'Today', completed: true, category: 'Management', progress: 100 },
    { id: 5, title: 'Update Documentation', priority: 'medium', dueDate: 'Next Week', completed: false, category: 'Development', progress: 25 },
    { id: 6, title: 'Budget Review Meeting Prep', priority: 'high', dueDate: 'Tomorrow', completed: false, category: 'Finance', progress: 10 },
    { id: 7, title: 'Reply to non-urgent emails', priority: 'low', dueDate: 'This Week', completed: false, category: 'General', progress: 0 },
    { id: 8, title: 'Organize project files', priority: 'low', dueDate: 'This Week', completed: false, category: 'General', progress: 0 },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : task.progress } : task
    ));
  };

  const getPrioritySize = (priority: string) => {
    if (mode === 'Sprint') {
      if (priority === 'high') return 'scale-110';
      if (priority === 'medium') return 'scale-100';
      return 'scale-90 opacity-40';
    }
    if (mode === 'Chill') {
      if (priority === 'low') return 'scale-100';
      return 'scale-95 opacity-60';
    }
    return 'scale-100';
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'today') return task.dueDate === 'Today';
    if (filter === 'urgent') return task.priority === 'high';
    
    // Mode-specific filtering
    if (mode === 'Sprint') return task.priority !== 'low';
    if (mode === 'Chill') return task.priority === 'low' || task.priority === 'medium';
    
    return true;
  }).sort((a, b) => {
    // Priority-based sorting
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (mode === 'Sprint') {
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    }
    if (mode === 'Chill') {
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return 0;
  });

  // Group by priority for Sprint mode
  const urgentTasks = filteredTasks.filter(t => t.priority === 'high');
  const mediumTasks = filteredTasks.filter(t => t.priority === 'medium');
  const lowTasks = filteredTasks.filter(t => t.priority === 'low');

  return (
    <div className={`${mode === 'Sprint' ? 'p-6' : mode === 'Chill' ? 'p-12' : 'p-8'} ${mode === 'Focus' ? 'max-w-3xl' : 'max-w-7xl'} mx-auto`}>
      {/* Header */}
      <motion.div
        className="mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>
            {mode === 'Sprint' ? 'Priority Queue' : mode === 'Chill' ? 'Light Tasks' : 'Task Management'}
          </h1>
          <p className={mode === 'Chill' ? 'text-[#3A4A62]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}>
            {filteredTasks.length} tasks · {tasks.filter(t => !t.completed).length} active
          </p>
        </div>
        <motion.button
          className={`px-6 py-3 rounded-xl flex items-center gap-2 ${
            mode === 'Sprint' 
              ? 'bg-red-500 text-white' 
              : mode === 'Chill' 
              ? 'bg-[#6CA8FF] text-white' 
              : 'bg-neutral-700 text-white'
          } hover:opacity-90`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Task
        </motion.button>
      </motion.div>

      {/* Controls */}
      <motion.div
        className={`flex items-center gap-4 ${mode === 'Chill' ? 'mb-8' : 'mb-6'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl ${
          mode === 'Chill' 
            ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)]' 
            : isDark ? 'bg-neutral-800/50 border-red-500/20' : 'bg-white/80 border-neutral-300/30'
        } border`}>
          <Search className={`w-5 h-5 ${mode === 'Chill' ? 'text-[var(--text-tertiary)]' : isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <input
            type="text"
            placeholder="Search tasks..."
            className={`flex-1 bg-transparent outline-none ${mode === 'Chill' ? 'text-[var(--text-primary)] placeholder-[var(--text-tertiary)]' : isDark ? 'text-white placeholder-neutral-500' : 'text-neutral-900 placeholder-neutral-400'}`}
          />
        </div>

        <motion.button
          className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
            mode === 'Chill' 
              ? 'bg-[var(--surface-card)] border-[var(--color-border-soft)]' 
              : isDark ? 'bg-neutral-800/50 border-red-500/20' : 'bg-white/80 border-neutral-300/30'
          } border`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className={`w-5 h-5 ${mode === 'Sprint' ? 'text-red-500' : mode === 'Chill' ? 'text-blue-500' : 'text-neutral-600'}`} />
          <span className={mode === 'Chill' ? 'text-[#1E2A40]' : isDark ? 'text-white' : 'text-neutral-900'}>AI Sort</span>
        </motion.button>
      </motion.div>

      {/* Sprint Mode - Priority Sections */}
      {mode === 'Sprint' && (
        <div className="space-y-6">
          {/* Critical/Urgent Tasks - Large */}
          {urgentTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h2 className="text-white uppercase tracking-wide text-sm">Critical Priority</h2>
              </div>
              <div className="space-y-3">
                {urgentTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/50 shadow-lg shadow-red-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.button
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 w-7 h-7 rounded-lg border-2 flex items-center justify-center ${task.completed ? 'bg-red-500 border-red-500' : 'border-red-500'}`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {task.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </motion.button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full text-xs bg-red-600 text-white uppercase tracking-wide">URGENT</span>
                          <span className="text-neutral-400 text-sm">{task.category}</span>
                        </div>
                        <h3 className={`text-white text-xl mb-2 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-red-400">
                            <Calendar className="w-4 h-4" />
                            <span>{task.dueDate}</span>
                          </div>
                        </div>
                        
                        {!task.completed && (
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-neutral-800 overflow-hidden">
                              <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                            <span className="text-red-400 text-sm">{task.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Medium Priority - Normal Size */}
          {mediumTasks.length > 0 && (
            <div>
              <h3 className="text-neutral-400 text-sm uppercase tracking-wide mb-3">Secondary</h3>
              <div className="space-y-2">
                {mediumTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: urgentTasks.length * 0.05 + index * 0.05 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={() => toggleTask(task.id)}
                        className={`w-5 h-5 rounded border-2 ${task.completed ? 'bg-neutral-600 border-neutral-600' : 'border-neutral-600'}`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </motion.button>
                      <span className={`flex-1 text-white ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                      <span className="text-neutral-500 text-sm">{task.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chill Mode - Only Light Tasks */}
      {mode === 'Chill' && (
        <div className="grid grid-cols-2 gap-6">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className="p-8 rounded-3xl bg-[var(--component-bg-card)] border border-[var(--color-border-soft)] shadow-[var(--shadow-medium)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <motion.button
                  onClick={() => toggleTask(task.id)}
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center ${task.completed ? 'bg-[var(--color-accent-primary)] border-[var(--color-accent-primary)]' : 'border-[var(--neutral-400)]'}`}
                  whileTap={{ scale: 0.9 }}
                >
                  {task.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                </motion.button>
                <div className="flex-1">
                  <h3 className={`text-[var(--text-primary)] text-lg mb-2 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                  <span className="text-[var(--text-secondary)]">{task.category}</span>
                </div>
              </div>
              {!task.completed && task.progress > 0 && (
                <div className="mt-4">
                  <div className="h-2 rounded-full bg-[var(--neutral-200)] overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--color-accent-primary)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Focus Mode - Standard List */}
      {mode === 'Focus' && (
        <div className="space-y-3">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              className="p-5 rounded-2xl bg-white/80 border border-neutral-300/30 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => toggleTask(task.id)}
                  className={`w-[22px] h-[22px] rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${task.completed ? 'bg-neutral-600 border-neutral-600' : 'border-neutral-300'}`}
                  whileTap={{ scale: 0.9 }}
                >
                  {task.completed && (
                    <motion.div 
                      className="w-[10px] h-[10px] bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.button>
                
                <div className="flex-1">
                  <h3 className={`text-neutral-900 mb-1 ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-neutral-600 text-sm">{task.category}</span>
                    <span className="text-neutral-500 text-sm">{task.dueDate}</span>
                  </div>
                  
                  {!task.completed && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                        <motion.div
                          className="h-full bg-neutral-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${task.progress}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="text-neutral-600 text-sm">{task.progress}%</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}