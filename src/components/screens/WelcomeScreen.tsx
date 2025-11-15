import { motion } from 'motion/react';
import { Sparkles, Zap, Focus, Waves } from 'lucide-react';

interface WelcomeScreenProps {
  onLogin: () => void;
}

export function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-6">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Logo and Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-white mb-3">CoHesion</h1>
          <p className="text-neutral-400">An adaptive workspace that transforms with your mental state</p>
        </motion.div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-white mb-2">Sprint Mode</h3>
            <p className="text-neutral-400">High-energy workspace for urgent tasks and critical deadlines. Sharp focus, real-time updates.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-neutral-500/10 to-neutral-600/10 border border-neutral-500/30 rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-500/20 flex items-center justify-center mb-4">
              <Focus className="w-6 h-6 text-neutral-400" />
            </div>
            <h3 className="text-white mb-2">Focus Mode</h3>
            <p className="text-neutral-400">Minimal distraction environment for deep work. Single-task view, batched notifications.</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <Waves className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-white mb-2">Chill Mode</h3>
            <p className="text-neutral-400">Calm, spacious workspace for reflection and well-being. Gentle transitions, no push alerts.</p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            onClick={onLogin}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/30"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Your Workspace
          </motion.button>
          <p className="text-neutral-500 mt-4">Experience adaptive productivity powered by AI</p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {['Adaptive AI', 'Smart Notifications', 'Energy Sensing', 'Team Insights'].map((feature, index) => (
            <div key={index} className="text-neutral-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-2" />
              {feature}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
