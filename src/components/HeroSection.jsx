import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import { FiLinkedin, FiMail, FiArrowDown, FiCode } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] pt-16 bg-gradient-to-b from-background via-secondary/50 to-background text-foreground flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Futuristic circuit lines */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTI1LDUwIEw1MCwyNSBMNzUsNTAgTDUwLDc1IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkNGVkZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTAgMCBMIDEwMCAxMDAiIHN0cm9rZT0iIzAwYjRkOCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUsMTAiLz48L3BhdHRlcm4+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-screen-xl mx-auto px-4 sm:px-8 flex flex-col flex-1 grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-muted-foreground">
                <FiCode className="text-primary" />
                Welcome to my digital space
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Shubham Surve
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mb-4">
                Website & Mobile App Developer
              </h2>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-wide">
                I help forward-thinking businesses build high-performance web platforms that integrate modern tech and AI to optimize efficiency, enhance UX, and drive real results.
                <br className="hidden sm:block" />
                <span className="text-white font-medium">Let's collaborate</span> to turn your vision into scalable, strategic digital assets.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <FiMail size={20} />
                    Let's Work Together
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    View My Work
                    <FiArrowDown size={20} />
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6">
              <motion.a
                whileHover={{ y: -4, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                href="https://linkedin.com/in/shubhams21"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300"
              >
                <FiLinkedin size={26} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                href="mailto:shubham@example.com"
                className="text-gray-300 hover:text-purple-400 transition-all duration-300"
              >
                <FiMail size={26} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Content - Simple Animated Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex items-center justify-center order-2 lg:order-2"
          >
            <div className="flex items-center justify-center min-h-[220px] min-w-[220px] w-full">
              {/* Center Element */}
              <div className="flex items-center justify-center w-full h-full">
                <Player
                  autoplay
                  loop
                  src="https://assets2.lottiefiles.com/packages/lf20_1pxqjqps.json" // Futuristic robot head
                  style={{ height: '220px', width: '220px' }}
                  className="lg:!h-[520px] lg:!w-[520px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
