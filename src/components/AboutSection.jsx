import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaCode,
  FaLaptopCode,
  FaServer,
  FaBrain,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiExpress,
  SiGraphql,
  SiKubernetes,
  SiVercel,
  SiThreedotjs,
} from 'react-icons/si'

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('profile');
  // Experience section removed as requested
  const techStack = {
    Frontend: [
      { name: 'React', icon: FaReact, color: 'text-blue-500' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-white' },
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
      { name: 'JavaScript', icon: FaJs, color: 'text-yellow-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    ],
    Backend: [
      { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
      { name: 'Express.js', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
      { name: 'Python', icon: FaPython, color: 'text-blue-500' },
      { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
      { name: 'Redis', icon: SiRedis, color: 'text-red-500' },
    ],
    'DevOps/Tools': [
      { name: 'Git', icon: FaGitAlt, color: 'text-orange-500' },
      { name: 'Docker', icon: FaDocker, color: 'text-blue-500' },
      { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-600' },
      { name: 'AWS', icon: FaAws, color: 'text-orange-400' },
      { name: 'Vercel', icon: SiVercel, color: 'text-gray-900 dark:text-white' },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }
  
  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  }

  return (
    <section id="about" ref={ref} className="section-padding relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0yNGgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bS02LTQyaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptLTYtNDJoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi00MmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] opacity-30 animate-pulse-slow"></div>
      
      {/* Futuristic Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 md:w-24 md:h-24"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              background: `linear-gradient(135deg, ${i % 3 === 0 ? 'rgba(59, 130, 246, 0.2)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(14, 165, 233, 0.2)'}, transparent)`,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(14, 165, 233, 0.3)'}`,
              zIndex: 0,
              backdropFilter: 'blur(8px)',
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              rotate: [0, 360],
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 50% 50% / 50% 50% 50% 50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
      
      {/* Holographic Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Digital Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeWidth="0.2"
            fill="none"
            animate={{
              d: [
                "M0,50 Q25,30 50,50 T100,50",
                "M0,50 Q25,70 50,50 T100,50",
                "M0,50 Q25,30 50,50 T100,50"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,30 Q25,50 50,30 T100,30"
            stroke="rgba(139, 92, 246, 0.5)"
            strokeWidth="0.2"
            fill="none"
            animate={{
              d: [
                "M0,30 Q25,50 50,30 T100,30",
                "M0,30 Q25,10 50,30 T100,30",
                "M0,30 Q25,50 50,30 T100,30"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Futuristic Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="relative inline-block">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-blue-500 to-primary-600 rounded-lg blur opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h2 className="relative text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-400 to-white">
                <span className="tracking-tight">ABOUT</span> <span className="font-light">ME</span>
              </h2>
            </div>
            <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              <span className="text-primary-400 font-normal">Full-stack developer</span> crafting next-generation digital experiences
            </p>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex justify-center space-x-2 md:space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-thin">
              {['profile', 'expertise', 'tech'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 ${activeTab === tab 
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/20' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}
                >
                  <span className="text-sm md:text-base font-medium capitalize">
                    {tab === 'profile' ? 'Profile' : tab === 'expertise' ? 'Expertise' : 'Tech Stack'}
                  </span>
                  {activeTab === tab && (
                    <motion.div 
                      className="h-0.5 bg-white mt-1 rounded-full" 
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab Content with AnimatePresence for smooth transitions */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === 'profile' && (
                  <motion.div 
                    key="profile"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden border-2 border-primary-500/50 shadow-lg shadow-primary-500/20">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-blue-500/20 backdrop-blur-sm"></div>
                          <div className="absolute inset-0 flex items-center justify-center text-5xl text-primary-400">
                            <FaCode />
                          </div>
                        </div>
                        
                        <div className="space-y-4 text-center md:text-left">
                          <h3 className="text-3xl font-bold text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">Digital Innovator</span>
                          </h3>
                          
                          <div className="space-y-4 text-gray-300">
                            <p className="leading-relaxed">
                              With a foundation in full-stack development, I transform complex challenges into elegant, user-centric solutions. My approach combines technical expertise with creative problem-solving to build next-generation digital experiences.
                            </p>
                            <p className="leading-relaxed">
                              I'm committed to crafting clean, efficient code while continuously exploring emerging technologies to push the boundaries of what's possible in the digital realm.
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                            <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-green-400/10 border border-green-500/30 px-5 py-2 rounded-full">
                              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                              <span className="text-sm font-medium text-green-400">Available for New Projects</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'expertise' && (
                  <motion.div 
                    key="expertise"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
                        Core <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">Expertise</span>
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            icon: FaLaptopCode, 
                            title: 'Frontend Development', 
                            desc: 'Creating responsive, intuitive interfaces with modern frameworks and state-of-the-art animation techniques.',
                            color: 'from-blue-500 to-primary-500'
                          },
                          { 
                            icon: FaServer, 
                            title: 'Backend Architecture', 
                            desc: 'Building scalable, secure API systems and microservices with efficient data management.',
                            color: 'from-purple-500 to-blue-500'
                          },
                          { 
                            icon: SiThreedotjs, 
                            title: '3D Web Experiences', 
                            desc: 'Developing immersive 3D web applications and interactive visualizations.',
                            color: 'from-green-500 to-blue-500'
                          },
                          { 
                            icon: FaBrain, 
                            title: 'AI Integration', 
                            desc: 'Implementing machine learning models and AI-powered features to enhance user experiences.',
                            color: 'from-red-500 to-purple-500'
                          }
                        ].map((item, index) => (
                          <motion.div 
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)' }}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} text-white`}>
                                <item.icon className="text-xl" />
                              </div>
                              <div>
                                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tech' && (
                  <motion.div 
                    key="tech"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
                      <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">Technology</span> Arsenal
                      </h3>
                      
                      <div className="space-y-8">
                        {Object.entries(techStack).map(([category, technologies]) => (
                          <div key={category} className="mb-8">
                            <div className="flex items-center mb-4">
                              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                              <h4 className="text-lg font-medium px-4 text-gray-300">
                                {category}
                              </h4>
                              <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" style={{ perspective: '1000px' }}>
                              {technologies.map((tech, index) => (
                                <motion.div
                                  key={tech.name}
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
                                    visible: { opacity: 1, scale: 1, rotateY: 0 }
                                  }}
                                  initial="hidden"
                                  animate={isInView ? "visible" : "hidden"}
                                  transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                                  whileHover={{ 
                                    scale: 1.05, 
                                    y: -5, 
                                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
                                    borderColor: 'rgba(59, 130, 246, 0.5)'
                                  }}
                                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl transition-all duration-300 text-center group hover:bg-white/10"
                                >
                                  <tech.icon 
                                    className={`text-3xl ${tech.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} 
                                  />
                                  <p className="font-medium text-gray-300 text-sm">
                                    {tech.name}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection;