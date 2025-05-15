'use client'
import { useState, useEffect } from 'react';

export default function useWindowSize(window : Window) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Пустой массив зависимостей = эффект только при монтировании/размонтировании

  return windowSize;
}