import { useEffect, useRef } from "react";

const SimpleAnimatedGradient = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let animationId;
    let time = 0;
    
    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);
    
    // Gradient colors (customize these)
    const colors = {
      color1: { r: 89, g: 17, b: 23 },    // #591117
      color2: { r: 140, g: 42, b: 50 },   // #8C2A32
      color3: { r: 217, g: 173, b: 173 }, // #D9ADAD
      color4: { r: 140, g: 28, b: 28 }    // #8C1C1C
    };
    
    const animate = () => {
      time += 0.002; // Slow animation speed
      
      // Create gradient
      const grad = ctx.createLinearGradient(
        canvas.width * (0.3 + Math.sin(time) * 0.1),
        canvas.height * (0.2 + Math.cos(time * 0.7) * 0.1),
        canvas.width * (0.7 + Math.sin(time + 2) * 0.1),
        canvas.height * (0.8 + Math.cos(time * 0.5) * 0.1)
      );
      
      // Animated color stops
      grad.addColorStop(0, `rgb(${colors.color1.r}, ${colors.color1.g}, ${colors.color1.b})`);
      grad.addColorStop(0.3, `rgb(${colors.color2.r}, ${colors.color2.g}, ${colors.color2.b})`);
      grad.addColorStop(0.7, `rgb(${colors.color3.r}, ${colors.color3.g}, ${colors.color3.b})`);
      grad.addColorStop(1, `rgb(${colors.color4.r}, ${colors.color4.g}, ${colors.color4.b})`);
      
      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
};

export default SimpleAnimatedGradient;