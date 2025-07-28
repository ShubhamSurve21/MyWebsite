import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAIAssistant } from '../../context/AIAssistantContext';

const InputArea = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const { isDarkMode } = useDarkMode();
  const { listening, handleVoiceInput } = useAIAssistant();
  const inputRef = useRef(null);
  
  // Voice visualization
  const [audioVisualization, setAudioVisualization] = useState([]);
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Generate random audio visualization when listening
  useEffect(() => {
    if (listening) {
      const interval = setInterval(() => {
        const newVisualization = Array(8)
          .fill(0)
          .map(() => Math.floor(Math.random() * 50) + 10);
        setAudioVisualization(newVisualization);
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setAudioVisualization([]);
    }
  }, [listening]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={listening ? 'Listening...' : 'Type your message or ask a question...'}
          className={`w-full py-2 px-4 rounded-full outline-none ${listening ? 'pr-12' : ''} ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' : 'bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-200'} border focus:ring-2 ${isDarkMode ? 'focus:ring-indigo-500' : 'focus:ring-blue-300'} transition-all duration-300`}
          disabled={listening}
        />
        
        {listening && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5">
            {audioVisualization.map((height, index) => (
              <div 
                key={index}
                className={`w-0.5 bg-red-500 rounded-full transition-all duration-100`}
                style={{ height: `${height}%`, maxHeight: '20px' }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex space-x-1">
        <motion.button
          type="button"
          onClick={handleVoiceInput}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${listening ? 'bg-red-500' : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-700'} transition-colors duration-300`}
        >
          <FaMicrophone className={listening ? 'animate-pulse' : ''} />
        </motion.button>
        
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors duration-300`}
          disabled={!inputText.trim() || listening}
        >
          <FaPaperPlane />
        </motion.button>
      </div>
    </form>
  );
};

export default InputArea;