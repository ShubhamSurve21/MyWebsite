import React from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAIAssistant } from '../../context/AIAssistantContext';

const SuggestionChips = ({ suggestions, onSuggestionClick }) => {
  const { isDarkMode } = useDarkMode();
  const { currentSection } = useAIAssistant();

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {suggestions.map((suggestion, index) => {
        // Determine if this suggestion is related to current section
        const isContextual = suggestion.toLowerCase().includes(currentSection.toLowerCase());
        
        return (
          <motion.button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={`text-xs py-1.5 px-3 rounded-full flex items-center ${isContextual 
              ? isDarkMode ? 'bg-indigo-700 hover:bg-indigo-600 text-white' : 'bg-blue-500 hover:bg-blue-400 text-white' 
              : isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } transition-colors duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            {isContextual && (
              <span className="w-2 h-2 rounded-full bg-white mr-1.5 opacity-70"></span>
            )}
            {suggestion}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default SuggestionChips;