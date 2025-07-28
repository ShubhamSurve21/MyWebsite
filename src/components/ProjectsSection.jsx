import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('All')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
      longDescription: 'Built a comprehensive e-commerce platform using the MERN stack. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and an admin dashboard for inventory and sales analytics.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express'],
      category: 'Full Stack',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'User Authentication & Authorization',
        'Product Catalog with Search & Filters',
        'Shopping Cart & Wishlist',
        'Secure Payment Processing',
        'Order Tracking & Management',
        'Admin Dashboard with Analytics'
      ]
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team collaboration features.',
      longDescription: 'Developed a modern task management application similar to Trello/Asana. Features real-time collaboration, drag-and-drop functionality, file attachments, comments, and team management with role-based permissions.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
      category: 'Frontend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Real-time Collaboration',
        'Drag & Drop Interface',
        'File Attachments & Comments',
        'Team Management',
        'Progress Tracking',
        'Mobile Responsive Design'
      ]
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather application with location-based forecasts and interactive maps.',
      longDescription: 'Created a comprehensive weather dashboard using React and weather APIs. Features include current weather, 7-day forecasts, interactive maps, location search, and weather alerts with a beautiful, responsive design.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['React', 'API Integration', 'Charts.js', 'Tailwind'],
      category: 'Frontend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Current Weather & Forecasts',
        'Interactive Weather Maps',
        'Location-based Services',
        'Weather Alerts & Notifications',
        'Historical Weather Data',
        'Responsive Design'
      ]
    },
    {
      id: 4,
      title: 'API Gateway Service',
      description: 'A microservices API gateway with authentication, rate limiting, and monitoring.',
      longDescription: 'Built a robust API gateway service using Node.js and Express. Implements JWT authentication, rate limiting, request/response transformation, load balancing, and comprehensive logging and monitoring.',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      tags: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker'],
      category: 'Backend',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'JWT Authentication & Authorization',
        'Rate Limiting & Throttling',
        'Request/Response Transformation',
        'Load Balancing',
        'Comprehensive Logging',
        'Health Monitoring & Alerts'
      ]
    },
    {
      id: 5,
      title: 'Social Media Dashboard',
      description: 'A comprehensive social media management dashboard with analytics and scheduling.',
      longDescription: 'Developed a social media management platform that allows users to manage multiple social accounts, schedule posts, track analytics, and engage with audiences from a single dashboard.',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
      tags: ['Next.js', 'PostgreSQL', 'Redis', 'Chart.js'],
      category: 'Full Stack',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Multi-platform Integration',
        'Post Scheduling & Automation',
        'Analytics & Reporting',
        'Content Calendar',
        'Team Collaboration',
        'Performance Insights'
      ]
    },
    {
      id: 6,
      title: 'Real-time Chat Application',
      description: 'A modern chat application with real-time messaging, file sharing, and video calls.',
      longDescription: 'Built a feature-rich chat application using React and Socket.io. Includes real-time messaging, file sharing, emoji reactions, typing indicators, online status, and integrated video calling functionality.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697320964?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      tags: ['React', 'Socket.io', 'WebRTC', 'MongoDB'],
      category: 'Full Stack',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      features: [
        'Real-time Messaging',
        'File & Media Sharing',
        'Video & Voice Calls',
        'Group Chats & Channels',
        'Message Encryption',
        'Mobile App Support'
      ]
    }
  ]

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack']

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

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
    <section id="projects" className="section-padding bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating code brackets */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl md:text-5xl font-mono opacity-10"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              color: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
              zIndex: 0,
              textShadow: `0 0 10px ${i % 2 === 0 ? '#6366f1' : '#8b5cf6'}`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [0, Math.random() > 0.5 ? 180 : -180],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2,
            }}
          >
            {i % 2 === 0 ? '{' : '}'}
          </motion.div>
        ))}
        
        {/* Floating tech symbols */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i + 4}
            className="absolute text-3xl md:text-5xl opacity-10"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              color: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
              zIndex: 0,
              textShadow: `0 0 10px ${i % 2 === 0 ? '#6366f1' : '#8b5cf6'}`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              rotate: [0, Math.random() > 0.5 ? 180 : -180],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2 + 1,
            }}
          >
            {i % 4 === 0 ? '<>' : i % 4 === 1 ? '/>' : i % 4 === 2 ? '#' : '()' }
          </motion.div>
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-400 to-white">
              My Creations
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Here are some of the projects I'm proud to have worked on, showcasing my skills in creating modern, functional web applications.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base border-2 ${ 
                  filter === category
                    ? 'bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onViewProject={() => setSelectedProject(project)} 
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectsSection;