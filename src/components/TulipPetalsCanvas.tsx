import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

export const TulipPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(254, 240, 138, 0.75)', // lemon 200
      'rgba(253, 224, 71, 0.7)',  // yellow 300
      'rgba(250, 204, 21, 0.65)', // yellow 400
      'rgba(245, 158, 11, 0.6)',  // amber 500
      'rgba(254, 249, 195, 0.8)', // warm cream
    ];

    const petalCount = Math.min(28, Math.floor(width / 45));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 10,
        speedY: Math.random() * 0.9 + 0.5,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.sin(p.wobble), 1);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      // Tulip petal teardrop curve
      ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.6, -p.size * 1.3, 0, -p.size * 1.6);
      ctx.bezierCurveTo(-p.size * 0.6, -p.size * 1.3, -p.size * 0.7, -p.size * 0.5, 0, 0);

      ctx.fillStyle = p.color;
      ctx.fill();

      // Delicate inner vein highlight
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.2);
      ctx.lineTo(0, -p.size * 1.3);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) {
          p.x = -30;
        } else if (p.x < -30) {
          p.x = width + 30;
        }

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
    />
  );
};
