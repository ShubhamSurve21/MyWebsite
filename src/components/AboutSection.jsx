import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaJs, FaLaptopCode, FaServer } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiGraphql, SiVuedotjs, SiFlutter } from 'react-icons/si';

const techStack = {
  Web: [
    { name: 'React', icon: FaReact, color: 'text-blue-500' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-black dark:text-white' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-500' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-green-600' },
    { name: 'Express.js', icon: SiExpress, color: 'text-gray-700 dark:text-gray-300' },
    { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
    { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
    { name: 'Vue.js', icon: SiVuedotjs, color: 'text-green-400' },
  ],
  Mobile: [
    { name: 'React Native', icon: FaReact, color: 'text-blue-400' },
    { name: 'Flutter', icon: SiFlutter, color: 'text-sky-500' },
    { name: 'Expo', icon: FaLaptopCode, color: 'text-indigo-400' },
    { name: 'Firebase', icon: FaServer, color: 'text-yellow-600' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
    { name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
  ],
};

const floatAnimation = {
  y: [0, -6, 0, 6, 0],
  transition: {
    duration: 6,
    ease: 'easeInOut',
    repeat: Infinity,
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">
              About Me
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              I’m a full-stack developer passionate about creating modern websites and mobile apps.
              With a strong foundation in both frontend and backend, I love transforming complex ideas into intuitive digital experiences.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-blue-400">
              Tech Stack
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Web Stack */}
            <motion.div
              className="glass-card p-8 rounded-2xl flex-1 hover-lift shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-semibold mb-6 text-foreground text-center">
                Web Development
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {techStack.Web.map(({ name, icon: Icon, color }, index) => (
                  <motion.div
                    key={name}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-xl text-center w-full group shadow-xl hover:shadow-cyan-500/20 transition"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.05,
                    }}
                    animate={floatAnimation}
                  >
                    <Icon className={`text-4xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 ${color}`} />
                    <p className="text-sm font-medium text-gray-200">{name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Stack */}
            <motion.div
              className="glass-card p-8 rounded-2xl flex-1 hover-lift shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-semibold mb-6 text-foreground text-center">
                Mobile Development
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {techStack.Mobile.map(({ name, icon: Icon, color }, index) => (
                  <motion.div
                    key={name}
                    className="bg-white/5 border border-white/10 backdrop-blur-xl p-5 rounded-xl text-center w-full group shadow-xl hover:shadow-cyan-500/20 transition"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 10,
                      delay: index * 0.05,
                    }}
                    animate={floatAnimation}
                  >
                    <Icon className={`text-4xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 ${color}`} />
                    <p className="text-sm font-medium text-gray-200">{name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
