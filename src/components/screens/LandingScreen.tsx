import { motion } from 'motion/react';
import { Zap, Target, Waves, Sparkles, Shield, Bell, Users } from 'lucide-react';
import { useState } from 'react';
import { Mode } from '../../App';
import { CoHesionLogo } from '../CoHesionLogo';

interface LandingScreenProps {
  onLogin: (selectedMode?: Mode) => void;
}

export function LandingScreen({ onLogin }: LandingScreenProps) {
  const [hoveredMode, setHoveredMode] = useState<Mode | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode>('Focus');

  const modeCards = [
    {
      mode: 'Sprint' as Mode,
      icon: Zap,
      title: 'Sprint Mode',
      description: 'High-energy atmosphere for urgent tasks and rapid execution',
      accent: '#FF4A4A',
      gradient: ['#351515', '#241113'],
      bgShift: ['#1C0E0E', '#2D1518'],
    },
    {
      mode: 'Focus' as Mode,
      icon: Target,
      title: 'Focus Mode',
      description: 'Minimal grey environment for distraction-free deep work',
      accent: '#D0D0D0',
      gradient: ['#1C1C1E', '#18181A'],
      bgShift: ['#0F1113', '#16191D'],
    },
    {
      mode: 'Chill' as Mode,
      icon: Waves,
      title: 'Chill Mode',
      description: 'Calm blue gradient for deeper well-being and reflection',
      accent: '#6CA8FF',
      gradient: ['#1A2845', '#0F1B35'],
      bgShift: ['#0F1120', '#1A1D33'],
    },
  ];

  const features = [
    { icon: Sparkles, label: 'AI-Powered Insights' },
    { icon: Bell, label: 'Smart Notifications' },
    { icon: Users, label: 'Team Energy Sensing' },
    { icon: Shield, label: 'Adaptive Workflows' },
  ];

  const getBackgroundGradient = () => {
    if (!hoveredMode) {
      return 'from-[#0D0F12] to-[#131720]';
    }
    const mode = modeCards.find(m => m.mode === hoveredMode);
    if (!mode) return 'from-[#0D0F12] to-[#131720]';
    
    return `from-[${mode.bgShift[0]}] to-[${mode.bgShift[1]}]`;
  };

  const getCTAGradient = () => {
    if (!hoveredMode) return 'from-[#6C63FF] to-[#805DFF]';
    if (hoveredMode === 'Sprint') return 'from-[#8C63FF] to-[#A05DFF]';
    if (hoveredMode === 'Chill') return 'from-[#5C73FF] to-[#7085FF]';
    return 'from-[#6C63FF] to-[#805DFF]';
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Ambient Background with Interactive Shifts */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}
        animate={{
          background: hoveredMode 
            ? `linear-gradient(to bottom right, ${modeCards.find(m => m.mode === hoveredMode)?.bgShift[0]}, ${modeCards.find(m => m.mode === hoveredMode)?.bgShift[1]})`
            : 'linear-gradient(to bottom right, #0D0F12, #131720)',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Subtle Background Drift Animation */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(108, 99, 255, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 1.8, 
              delay: 0.2,
              type: 'spring',
              stiffness: 100,
              damping: 25,
            }}
          >
            <div className="relative">
              {/* Main logo */}
              <CoHesionLogo size={64} animated={true} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl font-semibold text-white/95 mb-4 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ letterSpacing: '0.5px' }}
          >
            CoHesion
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-white/70 text-base mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            An adaptive workspace that transforms with your mental state.
          </motion.p>
        </motion.div>

        {/* Mode Selection Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {modeCards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredMode === card.mode;
            const isSelected = selectedMode === card.mode;
            const isDimmed = hoveredMode && !isHovered;

            return (
              <motion.div
                key={card.mode}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isDimmed ? 0.4 : 1,
                  y: 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ 
                  duration: 0.2,
                  delay: 0.5 + index * 0.15,
                }}
                onMouseEnter={() => {
                  setHoveredMode(card.mode);
                  setSelectedMode(card.mode);
                }}
                onMouseLeave={() => setHoveredMode(null)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-xl"
                  style={{
                    background: `linear-gradient(to bottom, ${card.gradient[0]}, ${card.gradient[1]})`,
                    opacity: isHovered ? 0.4 : 0.2,
                  }}
                  animate={{
                    opacity: isHovered ? 0.4 : 0.2,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Card */}
                <div
                  className="relative rounded-3xl p-8 border border-white/5 backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(to bottom, ${card.gradient[0]}, ${card.gradient[1]})`,
                  }}
                >
                  {/* Selected Indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full"
                      style={{ backgroundColor: card.accent }}
                      layoutId="selectedMode"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${card.accent}20`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: card.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/75 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <motion.button
            className={`px-12 py-5 rounded-2xl text-white text-lg font-semibold relative overflow-hidden bg-gradient-to-r ${getCTAGradient()}`}
            onClick={() => onLogin(selectedMode)}
            whileHover={{ 
              y: -4,
              boxShadow: '0 20px 40px rgba(108, 99, 255, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                '0 10px 30px rgba(108, 99, 255, 0.2)',
                '0 15px 40px rgba(108, 99, 255, 0.25)',
                '0 10px 30px rgba(108, 99, 255, 0.2)',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            {/* Glow bloom effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-2xl"
              animate={{
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="relative z-10">Enter Your Workspace</span>
          </motion.button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  y: -2,
                  opacity: 1,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3 border border-white/5">
                  <Icon className="w-6 h-6 text-[#8EA0FF]" />
                </div>
                <p className="text-white/80 text-sm font-medium">
                  {feature.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}