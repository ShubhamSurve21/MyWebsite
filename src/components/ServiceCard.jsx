import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import Tilt from 'react-parallax-tilt';

const ServiceCard = ({ service }) => {
  return (
    <Tilt
      className="parallax-effect-glare-scale"
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      scale={1.02}
      gyroscope={true}
    >
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}
      className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full flex flex-col overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="w-48 h-48 mx-auto mb-6">
          <Player
            autoplay
            loop
            src={service.lottieUrl}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
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
   </Tilt>
  );
};

export default ServiceCard;