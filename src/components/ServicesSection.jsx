import React from 'react';
import { motion } from 'framer-motion'
import { FiMonitor, FiSmartphone, FiCpu } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase, FaMobile, FaBrain } from 'react-icons/fa';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      icon: FiMonitor,
      title: 'Website Development',
      description: 'Professional website development services creating responsive, high-performance web applications tailored to your business needs.',
      features: [
        'Custom Website Design & Development',
        'E-commerce Platform Solutions',
        'Content Management Systems',
        'Progressive Web Applications',
        'SEO Optimization & Performance'
      ],
      technologies: [FaReact, 'Next.js', 'TypeScript', 'Tailwind CSS'],
      lottieUrl: 'https://assets5.lottiefiles.com/packages/lf20_qp1q7mct.json',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiSmartphone,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application development delivering native-quality experiences for iOS and Android platforms.',
      features: [
        'Cross-Platform Mobile Apps',
        'Native iOS & Android Development',
        'Mobile UI/UX Design',
        'App Store Deployment',
        'Mobile Performance Optimization'
      ],
      technologies: ['React Native', 'Flutter', FaMobile, 'Firebase'],
      lottieUrl: 'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiCpu,
      title: 'AI Integration',
      description: 'Intelligent automation and AI-powered features integration to enhance your digital products with cutting-edge artificial intelligence.',
      features: [
        'AI-Powered Chatbots & Assistants',
        'Machine Learning Implementation',
        'Natural Language Processing',
        'Predictive Analytics Integration',
        'Automated Business Processes'
      ],
      technologies: ['OpenAI API', 'TensorFlow', FaBrain, 'Python'],
      lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_fcfjwiyb.json',
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
              I deliver comprehensive digital solutions spanning website development, mobile applications, and AI integration to drive your business forward.
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