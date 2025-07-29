import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { inSphere } from 'maath/random';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Stars = () => {
  const ref = useRef();
  const sphere = inSphere(new Float32Array(6000), { radius: 1.5 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00ffff"
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// 3D Humanoid Model
const HumanoidModel = () => {
  const group = useRef();
  const { camera } = useThree();
  
  // Create a simple humanoid model using basic Three.js geometries
  useFrame((state, delta) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation
      group.current.rotation.y += delta * 0.2;
    }
  });

  useEffect(() => {
    // Position camera to look at the model
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group ref={group}>
      {/* Head - Brain sphere with glowing material */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
        {/* Brain-like inner structure */}
        <mesh scale={0.8}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe 
            emissive="#00ffff"
            emissiveIntensity={0.3}
          />
        </mesh>
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.3, 0]}>
        <capsuleGeometry args={[0.3, 1, 16, 16]} />
        <meshStandardMaterial 
          color="#303040" 
          metalness={0.7} 
          roughness={0.2}
        />
        {/* Tech details on body */}
        <mesh position={[0, 0, 0.31]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial 
            color="#101020" 
            emissive="#003366"
            emissiveIntensity={0.5}
          />
        </mesh>
      </mesh>

      {/* Digital circuits/lines emanating from the brain */}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[
          Math.sin(i * Math.PI * 2 / 20) * 0.7,
          0.5 + Math.cos(i * Math.PI * 2 / 20) * 0.7,
          0
        ]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial 
            color="#00ffff" 
            emissive="#00ffff"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
      
      {/* Environment and lighting for the model */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </group>
  );
};

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1.5] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left: Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-primary-400 text-sm mb-4">
            👋 Welcome to my digital space
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi, I’m <span className="text-cyan-400">Shubham</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-medium mt-2 mb-4 text-gray-300">
            Full Stack Web Developer
          </h2>
          <p className="text-gray-400 max-w-lg mb-6">
            I craft innovative web applications with modern technologies, passionate about artificial intelligence.
          </p>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Hire Me
            </button>
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
            >
              View Projects
            </button>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
              <FiGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
              <FiLinkedin size={24} />
            </a>
            <a href="mailto:shubham@example.com" className="hover:text-cyan-400">
              <FiMail size={24} />
            </a>
          </div>
        </motion.div>

        {/* Right: 3D Humanoid Model */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center h-[400px] md:h-[500px]"
        >
          <div className="w-full h-full relative">
            <Canvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 50 }}>
              <Suspense fallback={null}>
                <HumanoidModel />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
            {/* Overlay effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-lg"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
