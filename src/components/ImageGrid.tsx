
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedImage from './AnimatedImage';

// Sample images - these would be replaced with real user images
const sampleImages = [
  'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&auto=format',
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&auto=format',
  'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&auto=format',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format',
  'https://i.postimg.cc/mDWmkqvd/face-swap.png',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format',
  'https://i.postimg.cc/DzbDp1QX/temp-Imagex-WHQ3-V.avif',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format',
  'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&auto=format',
  'https://i.postimg.cc/QxLfFRMv/temp-Imagee5-Fhxb.avif',
  'https://images.unsplash.com/photo-1492681290082-e932832941e6?w=600&auto=format',
  'https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?w=600&auto=format',
  'https://images.unsplash.com/photo-1542206395-9feb3bbe3d9e?w=600&auto=format',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format'
];
// Arrangement of images in heart shape
const heartGrid = [
  { row: 1, col: 2 }, { row: 1, col: 4 },
  { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }, { row: 2, col: 5 },
  { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 },
  { row: 4, col: 2 }, { row: 4, col: 3 }, { row: 4, col: 4 },
  { row: 5, col: 3 },
];

const ImageGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Setup continuous scrolling animation
  useEffect(() => {
    const images = document.querySelectorAll('.grid-image');
    let currentImageIndex = 0;

    const animateImages = () => {
      if (!containerRef.current) return;
      
      // Move current image from left to right
      const img = images[currentImageIndex] as HTMLElement;
      if (img) {
        // Reset all images first
        images.forEach((image) => {
          const el = image as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0) scale(1)';
        });
        
        // Animate current image
        img.style.transform = 'translateX(10px) scale(1.05)';
        img.style.transition = 'transform 1.5s ease-in-out';
        
        // Move to next image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        
        // Schedule next animation
        animationRef.current = requestAnimationFrame(() => {
          setTimeout(animateImages, 500); // Delay between animations
        });
      }
    };
    
    // Start animation
    animateImages();
    
    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animate images on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const images = containerRef.current.querySelectorAll('.grid-image');
      images.forEach((image, index) => {
        const img = image as HTMLElement;
        const imageRect = img.getBoundingClientRect();
        const imageX = imageRect.left + imageRect.width / 2 - rect.left;
        const imageY = imageRect.top + imageRect.height / 2 - rect.top;
        
        // Calculate distance between mouse and image center
        const deltaX = (x - imageX) / 20;
        const deltaY = (y - imageY) / 20;
        
        // Apply subtle movement based on mouse position
        img.style.transform = `translate(${-deltaX/3}px, ${-deltaY/3}px) scale(1.05)`;
        img.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      });
    };
    
    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      const images = containerRef.current.querySelectorAll('.grid-image');
      images.forEach(image => {
        const img = image as HTMLElement;
        img.style.transform = 'translate(0, 0) scale(1)';
      });
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  
  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-5 grid-rows-5 gap-4 w-full max-w-3xl mx-auto h-[600px] py-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {heartGrid.map((pos, index) => (
        <motion.div
          key={index}
          className="grid-image relative rounded-xl overflow-hidden shadow-lg hover-lift"
          style={{
            gridColumn: pos.col,
            gridRow: pos.row,
            opacity: 1
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.5, 
              delay: index * 0.1 
            }
          }}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatedImage
            src={sampleImages[index % sampleImages.length]}
            alt={`User ${index + 1}`}
            delay={index * 0.1}
            className="h-full w-full rounded-xl"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ImageGrid;