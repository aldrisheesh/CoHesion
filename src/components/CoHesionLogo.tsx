import { motion } from 'motion/react';
import { Mode } from '../App';

interface CoHesionLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  mode?: Mode;
}

export function CoHesionLogo({ size = 64, className = '', animated = true, mode }: CoHesionLogoProps) {
  const strokeWidth = size * 0.08;
  const radius = size * 0.35;
  
  // Determine colors based on mode
  const getColors = () => {
    if (mode === 'Sprint') {
      return {
        ring: ['#FF6B6B', '#FF4A4A', '#E63946'],
        nodes: ['#FFFFFF', '#FFE5E5'],
        lines: ['#FF9B9B', '#FF8585'],
        core: ['#FFFFFF', '#FFE5E5', '#FFCCCC'],
        glow: ['#FF4A4A', '#FF6B6B'],
      };
    }
    if (mode === 'Chill') {
      return {
        ring: ['#4A7CFF', '#3A6FE8', '#2A5FD0'],
        nodes: ['#2A5FD0', '#4A7CFF'],
        lines: ['#5A8AFF', '#4A7CFF'],
        core: ['#6CA8FF', '#5A95FF', '#4A7CFF'],
        glow: ['#6CA8FF', '#7BA4FF'],
      };
    }
    if (mode === 'Focus') {
      return {
        ring: ['#4A4A4A', '#3A3A3A', '#2A2A2A'],
        nodes: ['#5A5A5A', '#4A4A4A'],
        lines: ['#6A6A6A', '#5A5A5A'],
        core: ['#6B7280', '#5A5A5A', '#4A4A4A'],
        glow: ['#6B7280', '#8A8A8A'],
      };
    }
    // Default neutral colors for landing page
    return {
      ring: ['#E8EAED', '#C8CDD3', '#A0A8B0'],
      nodes: ['#FFFFFF', '#E8EAED'],
      lines: ['#B0B8C0', '#A0A8B0'],
      core: ['#FFFFFF', '#E8EAED', '#D0D5DA'],
      glow: ['#E8EAED', '#C8CDD3'],
    };
  };

  const colors = getColors();
  const logoSize = mode ? 32 : size; // Smaller size when in TopBar
  const isTopBar = mode !== undefined; // Disable some animations in TopBar

  return (
    <svg
      width={logoSize}
      height={logoSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer adaptive ring - represents the workspace boundary */}
      <motion.circle
        cx="50"
        cy="50"
        r="38"
        stroke={`url(#logoGradient1-${mode || 'default'})`}
        strokeWidth={strokeWidth * 0.6}
        fill="none"
        strokeLinecap="round"
        initial={false}
        animate={{ 
          rotate: animated && !isTopBar ? 360 : 0,
        }}
        transition={{ 
          rotate: { 
            duration: 40, 
            repeat: Infinity, 
            ease: 'linear',
            repeatType: 'loop'
          }
        }}
        style={{ originX: '50px', originY: '50px' }}
      />

      {/* Three interconnected nodes - representing the three modes */}
      {/* Top node - Sprint */}
      <circle
        cx="50"
        cy="26"
        r="8"
        fill={`url(#logoGradient2-${mode || 'default'})`}
      />

      {/* Bottom left node - Focus */}
      <circle
        cx="29"
        cy="65"
        r="8"
        fill={`url(#logoGradient2-${mode || 'default'})`}
      />

      {/* Bottom right node - Chill */}
      <circle
        cx="71"
        cy="65"
        r="8"
        fill={`url(#logoGradient2-${mode || 'default'})`}
      />

      {/* Connection lines - representing cohesion between modes */}
      <line
        x1="50"
        y1="34"
        x2="35"
        y2="58"
        stroke={`url(#logoGradient3-${mode || 'default'})`}
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.6"
      />

      <line
        x1="50"
        y1="34"
        x2="65"
        y2="58"
        stroke={`url(#logoGradient3-${mode || 'default'})`}
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.6"
      />

      <line
        x1="37"
        y1="65"
        x2="63"
        y2="65"
        stroke={`url(#logoGradient3-${mode || 'default'})`}
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Center core - representing the intelligent AI heart */}
      <circle
        cx="50"
        cy="50"
        r="6"
        fill={`url(#logoGradientCore-${mode || 'default'})`}
      />

      {/* Subtle glow rings */}
      {animated && !isTopBar && (
        <>
          <motion.circle
            cx="50"
            cy="50"
            r="15"
            stroke={`url(#logoGradientGlow-${mode || 'default'})`}
            strokeWidth="1"
            fill="none"
            initial={false}
            animate={{ 
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.4, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: '50px', originY: '50px' }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            stroke={`url(#logoGradientGlow-${mode || 'default'})`}
            strokeWidth="1"
            fill="none"
            initial={false}
            animate={{ 
              scale: [0.8, 1.4, 0.8],
              opacity: [0, 0.3, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            style={{ originX: '50px', originY: '50px' }}
          />
        </>
      )}

      {/* Gradient Definitions */}
      <defs>
        {/* Main ring gradient */}
        <linearGradient id={`logoGradient1-${mode || 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.ring[0]} stopOpacity="0.9" />
          <stop offset="50%" stopColor={colors.ring[1]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colors.ring[2]} stopOpacity="0.9" />
        </linearGradient>

        {/* Nodes gradient */}
        <linearGradient id={`logoGradient2-${mode || 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.nodes[0]} stopOpacity="0.95" />
          <stop offset="100%" stopColor={colors.nodes[1]} stopOpacity="0.95" />
        </linearGradient>

        {/* Connection lines gradient */}
        <linearGradient id={`logoGradient3-${mode || 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.lines[0]} stopOpacity="0.5" />
          <stop offset="100%" stopColor={colors.lines[1]} stopOpacity="0.4" />
        </linearGradient>

        {/* Core gradient */}
        <radialGradient id={`logoGradientCore-${mode || 'default'}`}>
          <stop offset="0%" stopColor={colors.core[0]} stopOpacity="1" />
          <stop offset="70%" stopColor={colors.core[1]} stopOpacity="0.98" />
          <stop offset="100%" stopColor={colors.core[2]} stopOpacity="0.95" />
        </radialGradient>

        {/* Glow gradient */}
        <linearGradient id={`logoGradientGlow-${mode || 'default'}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.glow[0]} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.glow[1]} stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}