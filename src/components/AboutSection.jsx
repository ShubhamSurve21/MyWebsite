import React from 'react';
import { motion } from 'framer-motion'
import {
  FaReact,
  FaNodeJs,
  FaJs,
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
  SiExpress,
  SiGraphql,
  SiVuedotjs,
} from 'react-icons/si'

const AboutSection = () => {
  const techStack = {
    Frontend: [
      { name: 'React', icon: FaReact, color: 'text-blue-500' },
      { name: 'Next.js', icon: SiNextdotjs, color: 'text-gray-900 dark:text-white' },
      { name: 'Vue.js', icon: SiVuedotjs, color: 'text-green-500' },
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
      { name: 'JavaScript', icon: FaJs, color: 'text-yellow-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    ],
    Backend: [
      { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
      { name: 'Express.js', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
      { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
      { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
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
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* About Me Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">
              About Me
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate full-stack developer who loves building beautiful, performant web applications. 
              With expertise in modern technologies, I transform ideas into immersive digital experiences that users love.
            </p>
          </motion.div>

          {/* Tech Stack Section */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">
                Tech Stack
              </h3>
            </div>
            
            {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl"
              >
                <h4 className="text-2xl font-semibold mb-6 text-white text-center">
                  {category}
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5, 
                        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)'
                      }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl transition-all duration-300 text-center group hover:bg-white/10"
                    >
                      <tech.icon 
                        className={`text-4xl ${tech.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} 
                      />
                      <p className="font-medium text-gray-300 text-sm">
                        {tech.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection;