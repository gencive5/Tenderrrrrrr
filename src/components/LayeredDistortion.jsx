import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

const LayeredDistortion = ({ layers = [] }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshesRef = useRef([]);
  const frameRef = useRef(null);
  const timeRef = useRef(0);
  const texturesRef = useRef([]);
  
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imagesLoadedRef = useRef(0);
  
  // Mouse tracking for all layers
  const mouseMovementRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseActiveRef = useRef(false);
  const hoverActiveRef = useRef(false);
  const isDesktopRef = useRef(window.innerWidth > 768);

  // Load all textures
  useEffect(() => {
    if (!layers.length) return;
    
    imagesLoadedRef.current = 0;
    const loadedTextures = [];
    
    layers.forEach((layer, index) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      
      img.onload = () => {
        const texture = new THREE.Texture(img);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        loadedTextures[index] = texture;
        texturesRef.current[index] = texture;
        
        imagesLoadedRef.current++;
        if (imagesLoadedRef.current === layers.length) {
          setAllImagesLoaded(true);
        }
      };
      
      img.onerror = (err) => {
        console.error(`Failed to load image for layer ${index}:`, layer.imageUrl, err);
        imagesLoadedRef.current++;
        if (imagesLoadedRef.current === layers.length) {
          setAllImagesLoaded(true);
        }
      };
      
      img.src = layer.imageUrl;
    });
    
    return () => {
      texturesRef.current.forEach(texture => {
        if (texture) texture.dispose();
      });
    };
  }, [layers]);

  // Mouse movement tracking
  const handleMouseMove = useCallback((e) => {
    if (!isDesktopRef.current) return;

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
    hoverActiveRef.current = true;
  }, []);

  const handleHoverEnd = useCallback(() => {
    hoverActiveRef.current = false;
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    timeRef.current += 0.016;

    // Update mouse movement decay
    if (isDesktopRef.current) {
      if (mouseActiveRef.current) {
        mouseMovementRef.current *= 0.92;
        if (mouseMovementRef.current < 0.05) {
          mouseMovementRef.current = 0;
          mouseActiveRef.current = false;
        }
      }
    }

    // Update uniforms for all meshes
    meshesRef.current.forEach((mesh, idx) => {
      const layer = layers[idx];
      if (!mesh.material || !layer) return;

      const baseVolatility = Math.sin(timeRef.current * 0.3) * 0.1 + layer.volatility;
      
      if (isDesktopRef.current) {
        const mouseBoost = mouseMovementRef.current * layer.mouseMovementMultiplier;
        mesh.material.uniforms.uVolatility.value = baseVolatility + mouseBoost;
        mesh.material.uniforms.uSpeed.value = layer.speed + mouseBoost * 0.2;
        mesh.material.uniforms.uHoverMultiplier.value = 1.0;
        mesh.material.uniforms.uMouseBoost.value = mouseBoost;
      } else {
        const currentMultiplier = hoverActiveRef.current ? (layer.hoverMultiplier || 1.2) : 1;
        mesh.material.uniforms.uVolatility.value = baseVolatility;
        mesh.material.uniforms.uSpeed.value = layer.speed * (hoverActiveRef.current ? 1.2 : 1);
        mesh.material.uniforms.uHoverMultiplier.value = currentMultiplier;
        mesh.material.uniforms.uMouseBoost.value = 0;
      }

      mesh.material.uniforms.uTime.value = timeRef.current;
    });

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [layers]);

  // Initialize Three.js single renderer
  useEffect(() => {
    if (!containerRef.current || !allImagesLoaded) return;

    let mounted = true;
    const geometries = [];

    try {
      // Create single renderer
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent
      renderer.sortObjects = true; // Ensure objects sort by z-index
      rendererRef.current = renderer;
      
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(renderer.domElement);

      // Create single scene and camera
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Create meshes for each layer - sort by zIndex before creating
      const sortedLayers = [...layers].sort((a, b) => {
        const zA = a.zIndex !== undefined ? a.zIndex : 0;
        const zB = b.zIndex !== undefined ? b.zIndex : 0;
        return zA - zB; // Lower zIndex first (background)
      });
      
      const meshes = [];
      
      sortedLayers.forEach((layer, sortedIndex) => {
        // Find original index for texture lookup
        const originalIndex = layers.findIndex(l => l === layer);
        const texture = texturesRef.current[originalIndex];
        if (!texture) return;

        // Create shader material for this layer
        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false, // Allow transparency blending
          depthTest: true,
          uniforms: {
            uTime: { value: 0 },
            uSpeed: { value: layer.speed },
            uVolatility: { value: layer.volatility },
            uHoverMultiplier: { value: 1.0 },
            uMouseBoost: { value: 0.0 },
            uTexture: { value: texture },
            uOpacity: { value: layer.opacity || 1 },
            uColorTint: { value: new THREE.Color(layer.colorTint || '#ffffff') }
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

        // Create geometry (reuse same geometry for all layers)
        const geometry = new THREE.PlaneGeometry(2, 2, 128, 128);
        geometries.push(geometry);
        
        const mesh = new THREE.Mesh(geometry, material);
        // Position based on sorted index to ensure proper layering
        mesh.position.z = sortedIndex * 0.01;
        scene.add(mesh);
        meshes.push(mesh);
      });
      
      meshesRef.current = meshes;

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

    } catch (error) {
      console.error("Three.js initialization error:", error);
    }

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
        containerRef.current.removeEventListener("touchstart", handleHoverStart);
        containerRef.current.removeEventListener("touchend", handleHoverEnd);
      }
      window.removeEventListener("resize", handleResize);
      
      // Clean up geometries
      geometries.forEach(geometry => {
        if (geometry) geometry.dispose();
      });
      
      // Clean up materials
      meshesRef.current.forEach(mesh => {
        if (mesh.material) mesh.material.dispose();
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement) {
          rendererRef.current.domElement.remove();
        }
      }
    };
  }, [allImagesLoaded, layers, handleMouseMove, handleHoverStart, handleHoverEnd, animate]);

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
        zIndex: 0,
      }}
    />
  );
};

export default LayeredDistortion;