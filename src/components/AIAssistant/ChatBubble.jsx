import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../context/DarkModeContext';
import AIAvatar from './AIAvatar';
import { FaVolumeUp } from 'react-icons/fa';

const ChatBubble = ({ message, isTyping = false, onSpeakMessage }) => {
  const { isDarkMode } = useDarkMode();
  const isAI = message?.sender === 'ai' || isTyping;

  // Typing indicator animation variants
  const typingVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  // Dot animation variants
  const dotVariants = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'loop'
      }
    })
  };

  // Handle text-to-speech for AI messages
  const handleSpeak = () => {
    if (isAI && onSpeakMessage) {
      onSpeakMessage(message.text);
    }
  };

  return (
    <div className={`flex items-end mb-4 ${isAI ? '' : 'justify-end'}`}>
      {isAI && (
        <div className="mr-2 mb-1">
          <AIAvatar size="sm" />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`max-w-[80%] rounded-2xl p-3 ${isAI 
          ? `${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'} rounded-bl-none` 
          : `${isDarkMode ? 'bg-indigo-600' : 'bg-blue-500'} text-white rounded-br-none`
        } ${isDarkMode && isAI ? 'text-white' : ''} ${!isDarkMode && isAI ? 'text-gray-800' : ''}`}
      >
        {isTyping ? (
          <motion.div 
            className="flex space-x-1 px-1 py-2 items-center justify-center"
            variants={typingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`}
                variants={dotVariants}
                initial="initial"
                animate="animate"
                custom={i}
              />
            ))}
          </motion.div>
        ) : (
          <div className="flex justify-between items-start">
            <div className="text-sm">{message?.text}</div>
            {isAI && onSpeakMessage && (
              <button 
                onClick={handleSpeak}
                className="ml-2 p-1 text-xs opacity-60 hover:opacity-100 transition-opacity"
                title="Listen to this message"
              >
                <FaVolumeUp />
              </button>
            )}
          </div>
        )}
        {message?.action && (
          <div className="mt-2 pt-2 border-t border-gray-600 text-xs">
            <span className="opacity-75">Action: </span>
            <span className="font-medium">{message.action}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatBubble;