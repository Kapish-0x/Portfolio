"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits e.g., 000, 001
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const renderFrame = (index: number) => {
    if (!imagesRef.current[index] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Object-fit: cover logic
    const img = imagesRef.current[index];
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (imagesLoaded) {
      renderFrame(Math.floor(latest));
    }
  });

  // Handle resize & initial render
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set actual pixel dimensions to match display size for crispness
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        if (imagesLoaded) {
          renderFrame(Math.floor(currentIndex.get()));
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block" 
        />
        
        <Overlay scrollYProgress={scrollYProgress} />
        
        {/* Loading state indicator */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}
