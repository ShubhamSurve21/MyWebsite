import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion'
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
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
} from 'react-icons/si'

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
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

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 md:w-24 md:h-24"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              background: `linear-gradient(135deg, ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(139, 92, 246, 0.2)'}, transparent)`,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              boxShadow: `0 0 20px ${i % 2 === 0 ? 'rgba(99, 102, 241, 0.3)' : 'rgba(139, 92, 246, 0.3)'}`,
              zIndex: 0,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [0, 360],
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '50% 50% 50% 50% / 50% 50% 50% 50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-400 to-white animate-gradient-x">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate full-stack developer with expertise in modern web technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 items-start">
            {/* Bio Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                A Passion for Building Digital Experiences
              </h3>
              
              <div className="space-y-4 text-gray-400">
                <p>
                  With a foundation in full-stack development, I thrive on turning complex problems into elegant, user-friendly solutions. My journey is driven by a relentless curiosity and a passion for leveraging technology to create impactful digital products.
                </p>
                <p>
                  I am committed to writing clean, efficient, and maintainable code while continuously exploring new technologies to push the boundaries of what's possible on the web.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-green-400">Available for New Projects</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="mt-12 sm:mt-16 md:mt-20">
            <h3 className="text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-white to-secondary-400">
              My Tech Stack
            </h3>
            
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category}>
                  <h4 className="text-xl font-semibold mb-4 sm:mb-6 text-center text-gray-700 dark:text-gray-300">
                    {category}
                  </h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6" style={{ perspective: '1000px' }}>
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
                        whileHover={{ scale: 1.1, y: -5, boxShadow: '0 0 20px rgba(var(--primary-500), 0.3)' }}
                        className="bg-glass-card backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 text-center group hover:border-primary-500/30"
                      >
                        <tech.icon 
                          className={`text-4xl ${tech.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} 
                        />
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {tech.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection;