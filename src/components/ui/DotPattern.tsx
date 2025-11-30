"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
  className?: string;
}

export function DotPattern({
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = false,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // 🟣 Hitung ukuran container
  useEffect(() => {
    const handleResize = () => {
      if (!svgRef.current) return;
      const { width, height } = svgRef.current.getBoundingClientRect();
      setSize({ w: width, h: height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cols = Math.ceil(size.w / width);
  const halfHeight = size.h * 0.5; 
  const rows = Math.ceil(halfHeight / height);

  const dotsTotal = cols * rows;

  // 🟣 Generate posisi dot + fade opacity
  const dots = Array.from({ length: dotsTotal }, (_, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);

    // Fade: semakin ke tengah (row besar) makin pudar
    const fade = 1 - row / rows; // dari 1 → 0
    const opacity = fade * 0.4; // max opacity = 0.4 biar soft

    return {
      x: col * width + cx,
      y: row * height + cy,
      opacity,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    };
  });

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-[#281A14]",
        className
      )}
      {...props}
    >
      {/* Glow gradient */}
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Render dots */}
      {dots.map((dot) => (
        <motion.circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-glow)` : "currentColor"}
          initial={{ opacity: 0 }}
          animate={{
            opacity: glow
              ? [dot.opacity, dot.opacity + 0.4, dot.opacity]
              : dot.opacity,
            scale: glow ? [1, 1.4, 1] : 1,
          }}
          transition={{
            duration: glow ? dot.duration : 1,
            repeat: glow ? Infinity : undefined,
            repeatType: glow ? "reverse" : undefined,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}
