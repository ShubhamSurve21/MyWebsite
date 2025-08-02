import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, useGLTF, Environment, ContactShadows, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei';
import { inSphere } from 'maath/random';
import * as THREE from 'three';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiCode, FiExternalLink } from 'react-icons/fi';

// Enhanced Stars with more density and color variation
const Stars = () => {
  const ref = useRef();
  const [sphere1] = useState(() => inSphere(new Float32Array(10000), { radius: 1.8 }));
  const [sphere2] = useState(() => inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    ref.current.rotation.z = Math.cos(t * 0.02) * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere1} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#9d4edd" // Vibrant purple
          size={0.003}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points positions={sphere2} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00b4d8" // Cyan accent
          size={0.002}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Advanced Floating Orb with interactive elements
const FloatingOrb = ({ isHovered }) => {
  const group = useRef();
  const innerGroup = useRef();
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    if (group.current) {
      // Main floating animation
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      // Rotation speed increases when hovered
      group.current.rotation.y += delta * (isHovered ? 0.3 : 0.15);
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
    
    if (innerGroup.current) {
      // Counter-rotation for inner elements
      innerGroup.current.rotation.y -= delta * 0.2;
      innerGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  useEffect(() => {
    // Position camera to look at the model
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <group ref={group}>
      {/* Outer energy field */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#120338"
          emissive="#6a0dad"
          emissiveIntensity={0.2}
          roughness={0.4}
          metalness={0.8}
          distort={isHovered ? 0.4 : 0.2} // More distortion when hovered
          speed={isHovered ? 4 : 2}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Core sphere with gradient material */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          color="#9d4edd" 
          emissive="#9d4edd"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Inner structure - data visualization */}
      <group ref={innerGroup}>
        <mesh scale={0.7} rotation={[0, Math.PI / 4, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#ffffff" 
            wireframe 
            emissive="#ff00ff"
            emissiveIntensity={0.6}
          />
        </mesh>
        
        {/* Data nodes */}
        {[...Array(5)].map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          const y = Math.cos(angle) * 0.5;
          return (
            <mesh key={`node-${i}`} position={[Math.sin(angle) * 0.5, y, 0]} scale={0.08}>
              <dodecahedronGeometry />
              <meshStandardMaterial 
                color="#00b4d8" 
                emissive="#00b4d8"
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </group>

      {/* Orbiting particles with trails */}
      {[...Array(40)].map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const radius = 1.2 + Math.sin(i * 5) * 0.1;
        const speed = 0.2 + Math.random() * 0.3;
        const size = 0.015 + Math.random() * 0.025;
        const colorIndex = i % 4;
        const color = [
          "#ff00ff", // Magenta
          "#00b4d8", // Cyan
          "#f72585", // Pink
          "#ffffff"  // White
        ][colorIndex];
        
        return (
          <mesh key={i} position={[
            Math.sin(angle) * radius,
            Math.cos(angle) * radius * 0.8,
            Math.sin(angle * 2) * 0.3
          ]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
      
      {/* Holographic data elements */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.5;
        const yOffset = Math.sin(i * 0.8) * 0.5;
        
        return (
          <group key={`symbol-${i}`} position={[
            Math.sin(angle) * radius,
            yOffset,
            Math.cos(angle) * radius
          ]} scale={0.15} rotation={[0, -angle, 0]}>
            <Text
              color="#00ffff"
              fontSize={0.5}
              maxWidth={200}
              lineHeight={1}
              letterSpacing={0.02}
              textAlign="center"
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#00ffff"
            >
              {["AI", "ML", "3D", "UI", "UX", "AR", "VR", "XR"][i % 8]}
            </Text>
          </group>
        );
      })}
      
      {/* Environment and lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#ff00ff" />
      <pointLight position={[-3, -3, 3]} intensity={1} color="#00ffff" />
      
      {/* Energy rings that appear when hovered */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => {
            const scale = 1 + (i * 0.2);
            return (
              <mesh key={`ring-${i}`} rotation={[Math.PI / 2, 0, 0]} scale={[scale, scale, scale]}>
                <ringGeometry args={[0.95, 1, 64]} />
                <meshBasicMaterial 
                  color={i === 0 ? "#ff00ff" : i === 1 ? "#00ffff" : "#ffffff"}
                  transparent
                  opacity={0.3 - (i * 0.1)}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
};

// Animated Futuristic Button
const FuturisticButton = ({ children, primary, onClick, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-lg overflow-hidden
        ${primary 
          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 text-white'}
        font-medium transition-all duration-300 group
      `}
    >
      {/* Background effects */}
      <div className={`
        absolute inset-0 w-full h-full transition-all duration-300
        ${primary 
          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-100' 
          : 'bg-white/5 opacity-80'}
        ${isHovered ? 'opacity-90' : 'opacity-100'}
      `} />
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 w-full h-full transition-all duration-300
        ${primary ? 'bg-fuchsia-600' : 'bg-white/20'}
        filter blur-xl opacity-0 group-hover:opacity-30
      `} />
      
      {/* Border glow */}
      {primary && (
        <div className="
          absolute inset-0 w-full h-full rounded-lg
          border border-white/20 opacity-0 group-hover:opacity-100
          transition-all duration-300
        "></div>
      )}
      
      {/* Button content */}
      <span className="relative flex items-center justify-center gap-2">
        {icon && icon}
        {children}
        {isHovered && primary && (
          <motion.span 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <FiExternalLink className="ml-1" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};

// Main Hero Section Component
const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for parallax effects
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 2, // -1 to 1
      y: (clientY / innerHeight - 0.5) * 2 // -1 to 1
    });
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      className="relative h-screen bg-gradient-to-b from-background via-secondary/50 to-background text-foreground flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1.5] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#240046]/30 to-black/80"></div>
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZDRlZGQyMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Futuristic circuit lines */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTI1LDUwIEw1MCwyNSBMNzUsNTAgTDUwLDc1IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkNGVkZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTAgMCBMIDEwMCAxMDAiIHN0cm9rZT0iIzAwYjRkOCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUsMTAiLz48L3BhdHRlcm4+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-8"
          style={{
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -5}px)`
          }}
        >
          <div className="px-6 py-2 glass-card rounded-full border border-primary-500/30 shadow-lg shadow-primary-500/20 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 animate-pulse"></div>
             <div className="flex items-center gap-2 relative z-10">
               <FiCode className="text-primary-500" />
               <span className="text-foreground font-medium">Full Stack Developer & AI Enthusiast</span>
             </div>
           </div>
        </motion.div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
            style={{
              transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 10}px)`
            }}
          >
            <>
  <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-400">
  Hi, I'm <span className="relative inline-block text-white drop-shadow-lg font-extrabold">Shubham Surve
    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-purple-500"></span>
  </span>
</h1>
<h2 className="text-2xl md:text-3xl font-light mb-6 text-muted-foreground">
  Delivering <span className="font-semibold text-foreground">Intelligent, Scalable Digital Solutions</span> for the Modern Enterprise
</h2>
<p className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
  I partner with forward-thinking businesses to design and develop high-performance web platforms powered by full-stack technologies and AI innovation. From concept to execution, I craft tailored digital solutions that enhance operational efficiency, elevate user experience, and drive measurable business outcomes. Let’s collaborate to transform your ideas into strategic assets that deliver real impact.
</p>
  {/* CTA Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
    <FuturisticButton 
      primary 
      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
    >
      Get in Touch
    </FuturisticButton>
    <FuturisticButton
      onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
    >
      View Projects
    </FuturisticButton>
  </div>
</>
{/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300"
              >
                <FiGithub size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300"
              >
                <FiLinkedin size={24} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3, scale: 1.2 }}
                href="mailto:shubham@example.com" 
                className="text-gray-300 hover:text-purple-400 transition-all duration-300"
              >
                <FiMail size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right: 3D Visualization */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative h-[400px] md:h-[500px] flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -10}px)`
            }}
          >
            <div className="w-full h-full relative">
              <Canvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={null}>
                  <FloatingOrb isHovered={isHovered} />
                  <ContactShadows position={[0, -1.5, 0]} opacity={0.2} scale={5} blur={3} far={4} />
                  <Environment preset="night" />
                </Suspense>
              </Canvas>
              
              {/* Enhanced glow effects */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"></div>
              </div>
              
              {/* Interactive hint */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0 : 0.7 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm flex flex-col items-center"
              >
                <span className="px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  Hover to interact
                </span>
                <FiArrowDown className="mt-2 animate-bounce" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-400 text-sm mb-2 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center p-1 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 bg-purple-400 rounded-full relative z-10"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;