import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBubble from './ChatBubble';

const MessageList = ({ messages, onSpeakMessage }) => {
  return (
    <AnimatePresence>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ChatBubble message={message} onSpeakMessage={onSpeakMessage} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default MessageList;