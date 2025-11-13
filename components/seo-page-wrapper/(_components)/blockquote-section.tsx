//components/seo-page-wrapper/(_components)/blockquote-section.tsx
'use client';

import { useEffect, useState, useRef } from 'react';

export type BlockquoteConfig = {
  text: string;
};

interface BlockquoteProps {
  config: BlockquoteConfig;
  show?: boolean;
}

export function BlockquoteSection({ config, show = true }: BlockquoteProps) {
  const { text } = config;
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // ✅ Правильная типизация useRef
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (!show || !text) return;

    // Start animation after component mount
    const startDelay = setTimeout(() => {
      startAnimation();
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, text]);

  const startAnimation = () => {
    setIsAnimating(true);
    setHighlightedIndex(-1);
    animationFrameRef.current = 0;
    animateNextChar(0);
  };

  const animateNextChar = (index: number) => {
    if (index >= text.length) {
      // Animation complete - pause for 3 seconds then restart
      setIsAnimating(false);
      
      timeoutRef.current = setTimeout(() => {
        setHighlightedIndex(-1);
        // Restart animation after brief pause
        timeoutRef.current = setTimeout(() => {
          startAnimation();
        }, 100);
      }, 3000);
      return;
    }

    setHighlightedIndex(index);

    // Variable delay to simulate stream-like behavior
    const delay = getRandomDelay(text[index]);
    
    timeoutRef.current = setTimeout(() => {
      animateNextChar(index + 1);
    }, delay);
  };

  /**
   * Generate random delay to simulate StreamText behavior
   * - Faster for common characters
   * - Occasional random pauses
   * - Longer pauses at punctuation
   */
  const getRandomDelay = (char: string): number => {
    // Random pause (10% chance of longer delay)
    if (Math.random() < 0.1) {
      return Math.random() * 300 + 200; // 200-500ms pause
    }

    // Punctuation gets slightly longer pause
    if (['.', ',', '!', '?', ';', ':'].includes(char)) {
      return Math.random() * 100 + 80; // 80-180ms
    }

    // Spaces are quick
    if (char === ' ') {
      return Math.random() * 30 + 20; // 20-50ms
    }

    // Regular characters with variable speed
    return Math.random() * 60 + 30; // 30-90ms
  };

  if (!show) return null;

  return (
    <blockquote className="my-6  border-l-2 border-primary pl-6 italic text-xl">
      <span className="inline">
        {text.split('').map((char, index) => {
          const isHighlighted = index <= highlightedIndex;
          
          return (
            <span
              key={index}
              className={`
                transition-all duration-150 ease-in-out
                ${isHighlighted 
                  ? 'bg-primary/10  text-primary font-medium' 
                  : 'text-foreground'
                }
              `}
            >
              {char}
            </span>
          );
        })}
      </span>
      
    
      
    </blockquote>
  );
}