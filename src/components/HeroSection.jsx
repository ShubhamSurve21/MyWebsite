import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import * as THREE from 'three';
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiTailwindcss } from 'react-icons/si';

const Stars = (props) => {
  const ref = useRef();
  // Increased number of stars and radius for more immersive effect
  const sphere = inSphere(new Float32Array(8000), { radius: 1.5 });

  useFrame((state, delta) => {
    // More dynamic rotation based on mouse position
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    
    ref.current.rotation.x -= delta / 10 + mouseY * 0.01;
    ref.current.rotation.y -= delta / 15 + mouseX * 0.01;
    
    // Subtle pulsing effect
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = 
      1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
          // Added color blending for more vibrant stars
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const HeroSection = () => {
  const techLogos = [
    { Icon: FaReact, color: '#61DAFB' },
    { Icon: FaNodeJs, color: '#339933' },
    { Icon: SiTypescript, color: '#3178C6' },
    { Icon: SiMongodb, color: '#47A248' },
    { Icon: FaAws, color: '#FF9900' },
    { Icon: SiTailwindcss, color: '#06B6D4' },
  ];
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Starfield Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>

      {/* Floating Tech Logos */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {techLogos.map((tech, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-5xl"
            style={{ color: tech.color }}
            initial={{ 
              opacity: 0,
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              opacity: [0, 0.3, 0.3, 0],
              x: `+=${(Math.random() - 0.5) * 200}`,
              y: `+=${(Math.random() - 0.5) * 200}`,
              rotate: [0, Math.random() > 0.5 ? 180 : -180, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2,
            }}
          >
            <tech.Icon />
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <span className="inline-block px-6 py-3 bg-glass-card backdrop-blur-sm border border-white/10 text-primary-400 rounded-full text-sm font-medium mb-4 shadow-glow animate-float">
              <span className="mr-2">👋</span> Welcome to my digital space
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight text-white"
          >
            Hi, I’m{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 animate-gradient-x">Shubham</span>
            <br />
            <motion.span style={{ y }} className="inline-block text-3xl md:text-5xl lg:text-6xl text-gray-300">
              Full Stack Web Developer
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            I craft beautiful, responsive web applications with modern technologies.
            Passionate about creating seamless user experiences and robust backend solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full px-4 sm:px-0 sm:w-auto"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.7)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Hire Me
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#projects')}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                View Projects
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:shubham@example.com', label: 'Email' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-glass-card backdrop-blur-sm border border-white/10 rounded-full text-gray-300 hover:text-primary-400 hover:border-primary-400/50 hover:shadow-glow transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll to explore
            </span>
            <motion.button
              onClick={() => scrollToSection('#about')}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
            >
              <FiArrowDown size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection;