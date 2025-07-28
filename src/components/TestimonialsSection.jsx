import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialsSection = () => {

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      company: 'TechStart Inc.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      quote: "Shubham delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made our project a huge success.",
      project: 'E-Commerce Platform',
      projectType: 'Full Stack Development'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLab',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      quote: "Working with Shubham was a pleasure. He transformed our complex requirements into a beautiful, user-friendly application. Highly recommended!",
      project: 'Task Management App',
      projectType: 'Frontend Development'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      company: 'GreenTech Solutions',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      quote: "Shubham's full-stack expertise helped us launch our MVP in record time. His code quality and communication skills are outstanding.",
      project: 'Environmental Dashboard',
      projectType: 'Full Stack Development'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'CTO',
      company: 'DataFlow Systems',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      rating: 5,
      quote: "The API gateway solution Shubham built for us is robust and scalable. His backend development skills are top-notch.",
      project: 'API Gateway Service',
      projectType: 'Backend Development'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Marketing Director',
      company: 'SocialBuzz',
      image: 'https://randomuser.me/api/portraits/women/94.jpg',
      rating: 5,
      quote: "Our social media dashboard has revolutionized how we manage our campaigns. Shubham's work is simply amazing!",
      project: 'Social Media Dashboard',
      projectType: 'Full Stack Development'
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
    <section id="testimonials" className="section-padding bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              color: i % 2 === 0 ? '#fbbf24' : '#f59e0b',
              zIndex: 0,
              fontSize: `${Math.random() * 20 + 20}px`,
              opacity: 0.2,
              filter: `blur(${Math.random() * 2}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 1.5,
            }}
          >
            <FiStar />
          </motion.div>
        ))}
        
        {/* Floating quote marks */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i + 6}
            className="absolute font-serif text-4xl md:text-6xl font-bold opacity-10"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              color: i % 2 === 0 ? '#fbbf24' : '#f59e0b',
              zIndex: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.05, 0.1, 0.05],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              rotate: [0, Math.random() > 0.5 ? 15 : -15],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: i * 2,
            }}
          >
            {i % 2 === 0 ? '"' : '"'}
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
              Trusted by Innovators
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Hear from clients who have experienced the impact of my work firsthand.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div variants={itemVariants}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: true,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center h-full flex flex-col justify-between shadow-lg">
                    <div>
                      {/* Stars Rating */}
                      <div className="flex justify-center mb-6 text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="fill-current" size={22} />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg text-gray-300 mb-6 leading-relaxed italic">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>

                    {/* Client Info */}
                    <div className="mt-auto">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-violet-500 shadow-lg"
                      />
                      <h4 className="text-xl font-bold text-white mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-violet-400 font-medium">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="slider-controler mt-8">
                <div className="swiper-button-prev slider-arrow"></div>
                <div className="swiper-button-next slider-arrow"></div>
                <div className="swiper-pagination"></div>
              </div>
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection