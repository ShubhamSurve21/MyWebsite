import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Points, PointMaterial, OrbitControls, useGLTF, Environment, ContactShadows, Text, MeshDistortMaterial, RoundedBox, Html } from '@react-three/drei';
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

  // Realistic Earth: load diffuse, specular, and cloud textures
  const [earthTexture, setEarthTexture] = useState(null);
  const [specularMap, setSpecularMap] = useState(null);
  const [cloudsMap, setCloudsMap] = useState(null);
  const [textureError, setTextureError] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const loader = new TextureLoader();
    loader.load(
      'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
      (texture) => { if (isMounted) setEarthTexture(texture); },
      undefined,
      () => { if (isMounted) setTextureError(true); }
    );
    loader.load(
      'https://threejs.org/examples/textures/earth_specular_2048.jpg',
      (texture) => { if (isMounted) setSpecularMap(texture); }
    );
    loader.load(
      'https://threejs.org/examples/textures/earth_clouds_1024.png',
      (texture) => { if (isMounted) setCloudsMap(texture); }
    );
    return () => { isMounted = false; };
  }, []);

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

      {/* Realistic Earth sphere */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 64, 64]} />
        {!textureError && earthTexture ? (
          <meshPhongMaterial
            map={earthTexture}
            specularMap={specularMap}
            specular={new THREE.Color('#222')}
            shininess={18}
            emissive="#111"
            emissiveIntensity={0.12}
          />
        ) : (
          <meshStandardMaterial
            color="#9d4edd"
            metalness={0.7}
            roughness={0.45}
            emissive="#222"
            emissiveIntensity={0.18}
          />
        )}
      </mesh>
      {/* Cloud layer */}
      {!textureError && cloudsMap && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.815, 64, 64]} />
          <meshPhongMaterial
            map={cloudsMap}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      {textureError && (
        <Html center style={{ color: 'red', fontSize: 12, background: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 4 }}>
          Failed to load Earth texture
        </Html>
      )}

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
      id="home"
      className="relative min-h-[100dvh] pt-16 bg-gradient-to-b from-background via-secondary/50 to-background text-foreground flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Futuristic circuit lines */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTI1LDUwIEw1MCwyNSBMNzUsNTAgTDUwLDc1IFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkNGVkZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTAgMCBMIDEwMCAxMDAiIHN0cm9rZT0iIzAwYjRkOCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUsMTAiLz48L3BhdHRlcm4+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-screen-xl mx-auto px-4 sm:px-8 flex flex-col flex-1 grow">
        {/* Top Badge */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center flex-1 min-h-0">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left px-4"
            style={{
              transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 10}px)`
            }}
          >
            <>
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-400 drop-shadow-xl">
                Hi, I'm
                <span className="relative inline-block ml-2 text-white">
                  Shubham Surve
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-primary-500 to-purple-500 rounded-full shadow-lg"></span>
                </span>
              </h1>

              {/* Subheading */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-6 text-muted-foreground tracking-wide">
                Delivering
                <span className="font-semibold text-foreground mx-1">
                  Intelligent, Scalable Digital Solutions
                </span>
                for the Modern Enterprise
              </h2>

              {/* Paragraph */}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-wide">
                I help forward-thinking businesses build high-performance web platforms that integrate modern tech and AI to optimize efficiency, enhance UX, and drive real results.
                <br className="hidden sm:block" />
                <span className="text-white font-medium">Let’s collaborate</span> to turn your vision into scalable, strategic digital assets.
              </p>


              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <FuturisticButton
                    primary
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get in Touch
                  </FuturisticButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <FuturisticButton
                    onClick={() =>
                      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    View Projects
                  </FuturisticButton>
                </motion.div>
              </div>
            </>

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

          {/* Right: 3D Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full flex items-center justify-center min-h-[220px]"
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