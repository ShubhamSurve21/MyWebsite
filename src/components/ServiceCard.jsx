import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef(null);
  
  // Handle animation speed and direction on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (playerRef.current) {
      playerRef.current.setPlayerSpeed(1.5); // Speed up on hover
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (playerRef.current) {
      playerRef.current.setPlayerSpeed(1); // Normal speed
    }
  };
  
  return (
    <motion.div
      whileHover={{ 
        y: -10, 
        rotateX: 5, 
        rotateY: 5, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' 
      }}
      className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full flex flex-col overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <motion.div 
          className="w-48 h-48 mx-auto mb-6"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Player
            ref={playerRef}
            autoplay
            loop
            src={service.lottieUrl}
            style={{ height: '100%', width: '100%' }}
          />
        </motion.div>
        <h3 className="text-2xl font-bold mb-4 text-white text-center">
          {service.title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed text-center flex-grow">
          {service.description}
        </p>
        <ul className="space-y-2 text-left">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <span className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3 flex-shrink-0`}></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}></div>
    </motion.div>
  );
};

export default ServiceCard;