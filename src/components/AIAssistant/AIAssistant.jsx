import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAIAssistant } from '../../context/AIAssistantContext';
import AIAvatar from './AIAvatar';
import ChatBubble from './ChatBubble';
import MessageList from './MessageList';
import InputArea from './InputArea';
import SuggestionChips from './SuggestionChips';
import { FaTimes, FaMicrophone, FaVolumeUp, FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineSmartToy } from 'react-icons/md';

const AIAssistant = () => {
  const { 
    isOpen, 
    toggleChat, 
    messages, 
    isTyping, 
    listening, 
    currentSection,
    sendMessage, 
    handleVoiceInput, 
    getSuggestions, 
    handleUIAction,
    clearConversation,
    chatContainerRef,
    messageEndRef
  } = useAIAssistant();
  
  const { isDarkMode } = useDarkMode();
  
  // Text-to-speech functionality
  const speakMessage = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Get available voices and select a good one
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('Samantha')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser');
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };
  
  // Get context-aware suggestions
  const suggestions = getSuggestions();

  return (
    <>
      {/* Floating chat bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <button
          onClick={toggleChat}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : `${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-500 hover:bg-blue-600'}`} transition-all duration-300`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? (
            <FaTimes className="text-white text-xl" />
          ) : (
            <div className="relative">
              <AIAvatar size="md" pulseEffect={true} />
            </div>
          )}
        </button>
      </motion.div>

      {/* Chat interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 sm:right-8 md:right-10 z-40 w-[95%] sm:w-[400px] md:w-[450px] max-h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className={`flex flex-col h-[500px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} backdrop-blur-md bg-opacity-90 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} rounded-2xl`}>
              {/* Header */}
              <div className={`p-4 flex items-center justify-between ${isDarkMode ? 'bg-gray-900 bg-opacity-60' : 'bg-blue-500'} text-white`}>
                <div className="flex items-center space-x-3">
                  <AIAvatar size="sm" />
                  <div>
                    <h3 className="font-medium flex items-center">
                      AIVA Assistant
                      <span className="ml-2 text-xs px-2 py-0.5 bg-white bg-opacity-20 rounded-full flex items-center">
                        <MdOutlineSmartToy className="mr-1" />
                        <span>{currentSection}</span>
                      </span>
                    </h3>
                    <p className="text-xs text-gray-300">Context-aware AI guide</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => clearConversation()}
                    className={`p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
                    aria-label="Clear Conversation"
                    title="Clear conversation"
                  >
                    <FaRegTrashAlt className="text-white text-sm" />
                  </button>
                  <button 
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-full ${listening ? 'bg-red-500 animate-pulse' : 'bg-white bg-opacity-20 hover:bg-opacity-30'} transition-all duration-300`}
                    aria-label="Voice Input"
                    title="Voice input"
                  >
                    <FaMicrophone className="text-white text-sm" />
                  </button>
                </div>
              </div>
              
              {/* Messages container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
              >
                <MessageList messages={messages} onSpeakMessage={speakMessage} />
                {isTyping && <ChatBubble isTyping={true} />}
                <div ref={messageEndRef} />
              </div>
              
              {/* Suggestion chips */}
              <div className="px-4 py-2">
                <SuggestionChips suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
              </div>
              
              {/* Input area */}
              <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <InputArea onSendMessage={sendMessage} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;