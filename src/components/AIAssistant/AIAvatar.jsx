import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAIAssistant } from '../../context/AIAssistantContext';

const AIAvatar = ({ size = 'md', pulseEffect = false }) => {
  const { isDarkMode } = useDarkMode();
  const { isTyping, listening } = useAIAssistant();
  const playerRef = useRef(null);
  const [animationState, setAnimationState] = useState('idle'); // idle, speaking, listening, thinking
  
  // Update animation state based on AI state
  useEffect(() => {
    if (listening) {
      setAnimationState('listening');
    } else if (isTyping) {
      setAnimationState('thinking');
    } else {
      setAnimationState('idle');
    }
  }, [isTyping, listening]);
  
  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  // Determine animation color based on state
  const getAnimationColor = () => {
    switch (animationState) {
      case 'listening':
        return 'bg-red-500';
      case 'thinking':
        return isDarkMode ? 'bg-indigo-500' : 'bg-blue-400';
      default:
        return isDarkMode ? 'bg-indigo-500' : 'bg-blue-400';
    }
  };
  
  // Determine animation speed based on state
  const getAnimationSpeed = () => {
    switch (animationState) {
      case 'listening':
        return 1;
      case 'thinking':
        return 1.5;
      default:
        return 2;
    }
  };

  // Load and play animation when component mounts
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  }, []);

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden`}>
      {/* Pulse effect */}
      {(pulseEffect || animationState !== 'idle') && (
        <motion.div
          className={`absolute inset-0 rounded-full ${getAnimationColor()} opacity-30`}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: getAnimationSpeed(),
            ease: "easeInOut" 
          }}
        />
      )}
      
      {/* Animated AI orb */}
      <div className={`relative z-10 w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-indigo-600' : 'bg-blue-500'} flex items-center justify-center`}>
        {/* Fallback to SVG if Lottie doesn't load */}
        <svg 
          className="w-2/3 h-2/3 text-white" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
            fill="currentColor"
          />
          <path 
            d="M12 3C12.5523 3 13 3.44772 13 4V5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5V4C11 3.44772 11.4477 3 12 3Z" 
            fill="currentColor"
          />
          <path 
            d="M12 18C12.5523 18 13 18.4477 13 19V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V19C11 18.4477 11.4477 18 12 18Z" 
            fill="currentColor"
          />
          <path 
            d="M21 12C21 12.5523 20.5523 13 20 13H19C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11H20C20.5523 11 21 11.4477 21 12Z" 
            fill="currentColor"
          />
          <path 
            d="M6 12C6 12.5523 5.55228 13 5 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H5C5.55228 11 6 11.4477 6 12Z" 
            fill="currentColor"
          />
          <path 
            d="M18.3639 5.63604C18.7545 6.02656 18.7545 6.65973 18.3639 7.05025L17.6569 7.75736C17.2664 8.14788 16.6332 8.14788 16.2427 7.75736C15.8522 7.36684 15.8522 6.73367 16.2427 6.34315L16.9498 5.63604C17.3403 5.24551 17.9734 5.24551 18.3639 5.63604Z" 
            fill="currentColor"
          />
          <path 
            d="M7.75736 16.2426C8.14788 16.6332 8.14788 17.2663 7.75736 17.6569L7.05025 18.364C6.65973 18.7545 6.02656 18.7545 5.63604 18.364C5.24551 17.9734 5.24551 17.3403 5.63604 16.9497L6.34315 16.2426C6.73367 15.8521 7.36684 15.8521 7.75736 16.2426Z" 
            fill="currentColor"
          />
          <path 
            d="M18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9498 18.364L16.2427 17.6569C15.8521 17.2663 15.8521 16.6332 16.2427 16.2426C16.6332 15.8521 17.2663 15.8521 17.6569 16.2426L18.364 16.9497Z" 
            fill="currentColor"
          />
          <path 
            d="M7.05025 5.63604C7.44077 5.24551 8.07394 5.24551 8.46446 5.63604C8.85499 6.02656 8.85499 6.65973 8.46446 7.05025L7.75736 7.75736C7.36684 8.14788 6.73367 8.14788 6.34315 7.75736C5.95262 7.36684 5.95262 6.73367 6.34315 6.34315L7.05025 5.63604Z" 
            fill="currentColor"
          />
        </svg>
        
        {/* Lottie animation for AI Avatar */}
        <Player
          ref={playerRef}
          autoplay={true}
          loop={true}
          src={animationState === 'listening' 
            ? "https://assets5.lottiefiles.com/packages/lf20_jJJl6i.json" 
            : animationState === 'thinking' 
              ? "https://assets5.lottiefiles.com/packages/lf20_ystsffqy.json" 
              : "https://assets9.lottiefiles.com/packages/lf20_xdfeea1w.json"}
          style={{ width: '100%', height: '100%' }}
          speed={animationState === 'thinking' ? 1.5 : 1}
        />
      </div>
      
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-indigo-400' : 'bg-blue-300'} blur-md opacity-40 -z-10`}
      />
    </div>
  );
};

export default AIAvatar;