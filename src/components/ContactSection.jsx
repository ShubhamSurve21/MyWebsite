import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail, FiPhone, FiMapPin, FiCopy, FiCheck, FiLinkedin, FiExternalLink
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

const contactInfo = [
  {
    title: 'Email Address',
    value: 'shubhams2121@gmail.com',
    icon: FiMail,
    link: 'mailto:shubhams2121@gmail.com',
    gradient: 'from-blue-600 to-indigo-600',
    description: 'Drop me a line anytime'
  },
  {
    title: 'Phone Number',
    value: '+91 8208146451',
    icon: FiPhone,
    link: 'tel:+918208146451',
    gradient: 'from-emerald-600 to-teal-600',
    description: 'Available for calls'
  },
  {
    title: 'Location',
    value: 'Pune, Maharashtra',
    icon: FiMapPin,
    link: 'https://maps.app.goo.gl/BXAk7F8D2boVDgNa9',
    gradient: 'from-purple-600 to-violet-600',
    description: 'Based in India'
  }
];

const ContactSection = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      className="h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden flex items-center"
    >
      {/* Professional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/5 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/5 blur-3xl rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/3 to-purple-600/3 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
          >
            Let's Build Something <span className="text-blue-400">Extraordinary</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-base max-w-2xl mx-auto"
          >
            Ready to collaborate on innovative solutions and meaningful digital experiences?
          </motion.p>
        </div>

        {/* Compact Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => window.open(item.link, '_blank')}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl`} />
              
              {/* Icon */}
              <div className={`relative w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon size={20} className="text-white" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs mb-2">
                  {item.description}
                </p>
                <p className="text-gray-200 font-medium mb-4 text-sm">
                  {item.value}
                </p>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.value, item.title);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 group/btn"
                  >
                    {copied === item.title ? (
                      <FiCheck className="text-green-400 w-3 h-3" />
                    ) : (
                      <FiCopy className="text-gray-300 group-hover/btn:text-white w-3 h-3" />
                    )}
                  </motion.button>
                  
                  <div className="w-8 h-8 bg-white/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200">
                    <FiExternalLink className="text-gray-400 group-hover:text-white w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
            Let's collaborate and bring your vision to life with cutting-edge technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.a
              href="mailto:shubhams2121@gmail.com?subject=Project Collaboration"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-sm"
            >
              <FiMail size={16} />
              Start a Project
            </motion.a>
            
            <motion.a
              href="https://linkedin.com/in/shubhams21"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300 text-sm"
            >
              <FiLinkedin size={16} />
              Connect on LinkedIn
            </motion.a>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-gray-400 text-xs">
              <span className="font-medium text-gray-300">Professional Services:</span> Website Development • Mobile App Development • UI/UX Design • Technical Consulting
            </p>
          </div>
        </motion.div>
        
        {/* Footer Credit */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            Made with <FaHeart className="inline text-red-500 mx-1" /> by Shubham | Website & Mobile App Developer
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
