import React from 'react';
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiLayers } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      icon: FiCode,
      title: 'Frontend Development',
      description: 'Creating beautiful, responsive, and interactive user interfaces using modern frameworks like React, Next.js, and Vue.js.',
      features: [
        'Responsive Web Design',
        'Single Page Applications',
        'Progressive Web Apps',
        'UI/UX Implementation',
        'Performance Optimization'
      ],
      technologies: [FaReact, 'Next.js', 'TypeScript', 'Tailwind CSS'],
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_tno6cg2w.json',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiServer,
      title: 'Backend Development',
      description: 'Building robust, scalable server-side applications with secure APIs, database design, and cloud integration.',
      features: [
        'RESTful API Development',
        'Database Design & Optimization',
        'Authentication & Authorization',
        'Cloud Services Integration',
        'Microservices Architecture'
      ],
      technologies: [FaNodeJs, 'Express.js', 'Python', 'PostgreSQL'],
      lottieUrl: 'https://assets1.lottiefiles.com/packages/lf20_3rqwsqnj.json',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiLayers,
      title: 'Full Stack Solutions',
      description: 'End-to-end web application development from concept to deployment, ensuring seamless integration between frontend and backend.',
      features: [
        'Complete Web Applications',
        'E-commerce Platforms',
        'Content Management Systems',
        'Real-time Applications',
        'DevOps & Deployment'
      ],
      technologies: ['MERN Stack', 'Next.js', FaDatabase, 'AWS'],
      lottieUrl: 'https://assets1.lottiefiles.com/packages/lf20_o6spyjnc.json',
      color: 'from-purple-500 to-pink-500'
    }
  ]

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="section-padding relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Section Header */}
          <motion.div 
            variants={cardVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white">
              What I Do
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              I provide end-to-end web development services, transforming ideas into high-quality, scalable, and user-centric digital products.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} variants={cardVariants}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;