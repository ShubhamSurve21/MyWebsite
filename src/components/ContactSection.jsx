import React from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiLinkedin } from 'react-icons/fi'
import { Player } from '@lottiefiles/react-lottie-player'

const ContactSection = () => {
  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'shubhams2121@gmail.com',
      link: 'mailto:shubhams2121@gmail.com'
    },
    {
      icon: FiPhone,
      title: 'Phone',
      value: '+91 8208146451',
      link: 'tel:+918208146451'
    },
    {
      icon: FiMapPin,
      title: 'Location',
      value: 'Pune, Maharashtra',
      link: 'https://maps.google.com'
    }
  ]

  const socialLinks = [
    {
      icon: FiLinkedin,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/shubhams21',
      color: 'hover:text-blue-600'
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
    <section id="contact" className="section-padding relative overflow-hidden bg-gray-900">
      {/* Unique animated background accent */}
      <div className="absolute inset-0 pointer-events-none">
        {/* AI neural network background accent */}
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_1pxqjqps.json" // AI neural network animation
          style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.13 }}
        />
      </div>
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 relative"
          >
            {/* AI accent animation near header */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-20 md:-top-24 z-10">
              <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_9cyyl8i9.json" // AI brain animation
                style={{ height: '80px', width: '80px' }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-white">
              Contact Me
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Feel free to reach out for collaborations, freelance work, or just to say hi!
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center">
            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="flex-1 min-w-[260px] max-w-[350px] w-full bg-white/5 border border-white/10 rounded-xl p-8 shadow-xl mb-8 md:mb-0"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Contact Info</h3>
              <ul className="flex flex-col gap-6">
                {contactInfo.map((info, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span className="text-2xl text-cyan-400">
                      <info.icon />
                    </span>
                    <div>
                      <div className="text-white font-medium">{info.title}</div>
                      <a href={info.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm hover:underline">
                        {info.value}
                      </a>
                    </div>
                  </li>
                ))}
               </ul>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16 p-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Let's turn your ideas into reality. I'm here to help you build something amazing.
            </p>
            <motion.a
              href="mailto:shubham@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              <FiMail size={20} />
              Get Started Today
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection