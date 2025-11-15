import { useEffect } from 'react';
import { Mode } from '../App';

interface FaviconManagerProps {
  mode: Mode;
}

export function FaviconManager({ mode }: FaviconManagerProps) {
  useEffect(() => {
    // Get colors based on mode
    const getColors = () => {
      if (mode === 'Sprint') {
        return {
          ring: '#FF4A4A',
          nodes: '#FFFFFF',
          core: '#FFFFFF',
        };
      }
      if (mode === 'Chill') {
        return {
          ring: '#4A7CFF',
          nodes: '#4A7CFF',
          core: '#6CA8FF',
        };
      }
      if (mode === 'Focus') {
        return {
          ring: '#4A4A4A',
          nodes: '#5A5A5A',
          core: '#6B7280',
        };
      }
      // Default
      return {
        ring: '#E8EAED',
        nodes: '#FFFFFF',
        core: '#FFFFFF',
      };
    };

    const colors = getColors();

    // Create simplified SVG favicon (optimized for 32x32)
    const svg = `
      <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer ring -->
        <circle cx="50" cy="50" r="38" stroke="${colors.ring}" stroke-width="6" fill="none" stroke-linecap="round"/>
        
        <!-- Three nodes -->
        <circle cx="50" cy="26" r="10" fill="${colors.nodes}"/>
        <circle cx="29" cy="65" r="10" fill="${colors.nodes}"/>
        <circle cx="71" cy="65" r="10" fill="${colors.nodes}"/>
        
        <!-- Connection lines -->
        <line x1="50" y1="36" x2="35" y2="58" stroke="${colors.nodes}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <line x1="50" y1="36" x2="65" y2="58" stroke="${colors.nodes}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        <line x1="37" y1="65" x2="63" y2="65" stroke="${colors.nodes}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
        
        <!-- Center core -->
        <circle cx="50" cy="50" r="8" fill="${colors.core}"/>
      </svg>
    `;

    // Convert SVG to data URL
    const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    // Update or create favicon link element
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    link.href = url;

    // Cleanup
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [mode]);

  return null;
}
