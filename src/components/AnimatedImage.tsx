
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const AnimatedImage = ({
  src,
  alt,
  delay = 0,
  className,
  width,
  height
}: AnimatedImageProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay: delay,
          ease: [0.22, 1, 0.36, 1]
        }
      });
    }
  }, [inView, controls, delay]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={controls}
        className="w-full h-full"
      >
        <div className="image-reveal">
          <img 
            src={src} 
            alt={alt} 
            width={width} 
            height={height}
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedImage;
