"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 20% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: 50% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col items-center justify-center">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
            Kapish Rawat.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Creative Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl">
            I build digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              experiences.
            </span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white max-w-2xl">
            Bridging design <br />
            and engineering.
          </h2>
        </motion.div>
        
      </div>
    </div>
  );
}
