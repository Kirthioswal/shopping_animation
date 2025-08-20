import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const TypingEffect = ({ text, speed = 100, className = '', delay = 0 }: TypingEffectProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      setStarted(true);
    }
  }, [delay]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <span className={className}>
      {displayText}
      {started && currentIndex < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </span>
  );
};

export default TypingEffect;
