import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

const DistortionLayer = ({
  imageUrl,
  speed = 0.6,
  volatility = 0.25,
  mouseMovementMultiplier = 0.01,
  hoverMultiplier = 1.2,
  colorTint = "#ffffff",
  zIndex = 0,
  opacity = 1
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const textureRef = useRef(null);
  const frameRef = useRef(null);
  const meshRef = useRef(null);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const timeRef = useRef(0);






  const mouseMovementRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(false);
  const hoverActiveRef = useRef(false);
  const isDesktopRef = useRef(window.innerWidth > 768);

  // Load image
  useEffect(() => {
    if (!imageUrl) return;
    
    let mounted = true;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      if (mounted) {
        setImageLoaded(true);
      }
    };
    
    img.onerror = (err) => {
      console.error(`Failed to load image for layer ${zIndex}:`, imageUrl, err);
      if (mounted) setImageLoaded(true);
    };
    
    img.src = imageUrl;
















    
    return () => {
      mounted = false;


    };
  }, [imageUrl, zIndex]);

  // Mouse movement tracking
  const handleMouseMove = useCallback((e) => {
    if (!isDesktopRef.current || !materialRef.current) return;

    if (!lastMousePositionRef.current.x && !lastMousePositionRef.current.y) {
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const dx = Math.abs(e.clientX - lastMousePositionRef.current.x);
    const dy = Math.abs(e.clientY - lastMousePositionRef.current.y);
    const movement = Math.sqrt(dx * dx + dy * dy);

    mouseMovementRef.current = Math.min(mouseMovementRef.current + movement * 0.1, 10);
    mouseActiveRef.current = true;

    lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleHoverStart = useCallback(() => {
    if (!materialRef.current) return;
    hoverActiveRef.current = true;
  }, []);

  const handleHoverEnd = useCallback(() => {
    if (!materialRef.current) return;
    hoverActiveRef.current = false;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!materialRef.current) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    timeRef.current += 0.016;

    // Update uniforms based on interaction
    const baseVolatility = Math.sin(timeRef.current * 0.3) * 0.1 + volatility;
    
    if (isDesktopRef.current) {
      // Mouse movement decay
      if (mouseActiveRef.current) {
        mouseMovementRef.current *= 0.92;
        if (mouseMovementRef.current < 0.05) {
          mouseMovementRef.current = 0;
          mouseActiveRef.current = false;
        }
      }

      const mouseBoost = mouseMovementRef.current * mouseMovementMultiplier;
      materialRef.current.uniforms.uVolatility.value = baseVolatility + mouseBoost;
      materialRef.current.uniforms.uSpeed.value = speed + mouseBoost * 0.2;
      materialRef.current.uniforms.uHoverMultiplier.value = 1.0;
      materialRef.current.uniforms.uMouseBoost.value = mouseBoost;
    } else {
      // Mobile hover
      const currentMultiplier = hoverActiveRef.current ? hoverMultiplier : 1;
      materialRef.current.uniforms.uVolatility.value = baseVolatility;
      materialRef.current.uniforms.uSpeed.value = speed * (hoverActiveRef.current ? 1.2 : 1);
      materialRef.current.uniforms.uHoverMultiplier.value = currentMultiplier;
      materialRef.current.uniforms.uMouseBoost.value = 0;
    }

    materialRef.current.uniforms.uTime.value = timeRef.current;




    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

















    frameRef.current = requestAnimationFrame(animate);
  }, [speed, volatility, mouseMovementMultiplier, hoverMultiplier]);

  // Initialize Three.js
  useEffect(() => {
    if (!containerRef.current || !imageLoaded) return;

    let mounted = true;
    let geometry, material, renderer;

    const initThree = () => {
      try {
        // Load texture from image
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          if (!mounted) return;
          
          const texture = new THREE.Texture(img);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.needsUpdate = true;
          textureRef.current = texture;

          // Setup scene
          const scene = new THREE.Scene();
          sceneRef.current = scene;

          const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
          camera.position.z = 1;
          cameraRef.current = camera;

          renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
          });
          
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          renderer.setPixelRatio(dpr);
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0x000000, 0); // Transparent
          rendererRef.current = renderer;
          
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(renderer.domElement);

          // Shader material
          material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
              uTime: { value: 0 },
              uSpeed: { value: speed },
              uVolatility: { value: volatility },
              uHoverMultiplier: { value: 1.0 },
              uMouseBoost: { value: 0.0 },
              uTexture: { value: texture },
              uOpacity: { value: opacity },
              uColorTint: { value: new THREE.Color(colorTint) }
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec2 vUv;
              uniform sampler2D uTexture;
              uniform float uTime;
              uniform float uSpeed;
              uniform float uVolatility;
              uniform float uHoverMultiplier;
              uniform float uMouseBoost;
              uniform float uOpacity;
              uniform vec3 uColorTint;

              void main() {
                vec2 uv = vUv;
                
                // Distortion waves
                float waveX = sin(uv.y * 12.0 + uTime * uSpeed) * uVolatility;
                float waveY = sin(uv.x * 10.0 + uTime * uSpeed * 1.3) * uVolatility;
                float waveX2 = sin(uv.y * 25.0 - uTime * uSpeed * 1.8) * uVolatility * 0.5;
                float waveY2 = cos(uv.x * 20.0 + uTime * uSpeed * 1.5) * uVolatility * 0.5;
                
                // Interactive effects
                waveX *= uHoverMultiplier;
                waveY *= uHoverMultiplier;
                
                // Mouse movement boost
                float mouseEffect = sin(uv.x * 20.0 + uTime * uSpeed * 2.5) * uMouseBoost * 0.4;
                waveX += mouseEffect + waveX2;
                waveY += mouseEffect + waveY2;
                
                uv.x += waveX * 0.03;
                uv.y += waveY * 0.03;
                
                vec4 color = texture2D(uTexture, uv);
                color.rgb *= uColorTint;
                color.a *= uOpacity;
                
                if (color.a < 0.01) discard;
                gl_FragColor = color;
              }
            `
          });

          materialRef.current = material;

          geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.z = zIndex * 0.01; // Slight depth between layers
          meshRef.current = mesh;
          scene.add(mesh);

          // Event listeners
          if (isDesktopRef.current) {
            window.addEventListener("mousemove", handleMouseMove);
          } else {
            containerRef.current.addEventListener("mouseenter", handleHoverStart);
            containerRef.current.addEventListener("mouseleave", handleHoverEnd);
            containerRef.current.addEventListener("touchstart", handleHoverStart);
            containerRef.current.addEventListener("touchend", handleHoverEnd);
          }

          // Start animation
          frameRef.current = requestAnimationFrame(animate);
        };
        
        img.src = imageUrl;
      } catch (error) {
        console.error(`Three.js error for layer ${zIndex}:`, error);














      }
    };

    initThree();






    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isDesktop = width > 768;
      isDesktopRef.current = isDesktop;
      
      if (rendererRef.current) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        rendererRef.current.setPixelRatio(dpr);
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      
      window.removeEventListener("mousemove", handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener("mouseenter", handleHoverStart);
        containerRef.current.removeEventListener("mouseleave", handleHoverEnd);


      }
      window.removeEventListener("resize", handleResize);
      
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (textureRef.current) textureRef.current.dispose();
      if (renderer) renderer.dispose();












    };
  }, [imageLoaded, imageUrl, speed, volatility, mouseMovementMultiplier, hoverMultiplier, colorTint, opacity, zIndex, handleMouseMove, handleHoverStart, handleHoverEnd, animate]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: zIndex,
        opacity: imageLoaded ? 1 : 0,
        transition: "opacity 0.5s ease-out"
      }}
    />
  );
};

// Main component with 3 layers
const LayeredDistortion = ({
  layers = [
    {
      imageUrl: "/images/layer1-background.png",
      speed: 0.3,
      volatility: 0.15,
      mouseMovementMultiplier: 0.005,
      hoverMultiplier: 1.1,
      colorTint: "#ffffff",
      opacity: 0.8,
      zIndex: 0
    },
    {
      imageUrl: "/images/layer2-mid.png",
      speed: 0.6,
      volatility: 0.25,
      mouseMovementMultiplier: 0.015,
      hoverMultiplier: 1.3,
      colorTint: "#ffffff",
      opacity: 0.9,
      zIndex: 1
    },
    {
      imageUrl: "/images/layer3-foreground.png",
      speed: 1.0,
      volatility: 0.35,
      mouseMovementMultiplier: 0.03,
      hoverMultiplier: 1.6,
      colorTint: "#ffffff",
      opacity: 1,
      zIndex: 2
    }
  ]
}) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {layers.map((layer, index) => (
        <DistortionLayer
          key={index}
          imageUrl={layer.imageUrl}
          speed={layer.speed}
          volatility={layer.volatility}
          mouseMovementMultiplier={layer.mouseMovementMultiplier}
          hoverMultiplier={layer.hoverMultiplier}
          colorTint={layer.colorTint}
          opacity={layer.opacity}
          zIndex={layer.zIndex || index}
        />
      ))}
    </div>
  );
};

export default LayeredDistortion;