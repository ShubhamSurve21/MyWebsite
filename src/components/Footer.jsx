import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`w-full py-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Logo and Copyright */}
          <div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center sm:justify-start"
            >
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Shubham
              </span>
            </motion.div>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} All rights reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Quick Links
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="hover:underline transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Connect With Me
            </h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
              {[
                { icon: <FaGithub size={20} />, url: 'https://github.com/shubham' },
                { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com/in/shubham' },
                { icon: <FaEnvelope size={20} />, url: 'mailto:shubham@example.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Made with <FaHeart className="inline text-red-500 mx-1" /> by Shubham | Website & Mobile App Developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;