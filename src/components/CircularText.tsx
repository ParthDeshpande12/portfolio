import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * CircularText component renders text in a circular path and animates it.
 * @param {string} text - The text to display in a circle.
 * @param {string} onHover - Animation effect on hover (e.g., 'speedUp').
 * @param {number} spinDuration - Duration (in seconds) for one full spin.
 * @param {string} className - Additional class names for styling.
 */
interface CircularTextProps {
  text: string;
  onHover?: string;
  spinDuration?: number;
  className?: string;
}

const CircularText = ({ text, onHover, spinDuration = 20, className = '' }: CircularTextProps) => {
  const controls = useAnimation();
  const radius = 80;
  const chars = text.split('');
  const charAngle = 360 / chars.length;

  // Animation variants
  const spinVariants = {
    spin: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear" as const,
        duration: spinDuration,
      },
    },
    speedUp: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        ease: "linear" as const,
        duration: Math.max(4, spinDuration / 4),
      },
    },
  };

  const handleMouseEnter = () => {
    if (onHover === 'speedUp') controls.start('speedUp');
  };
  const handleMouseLeave = () => {
    controls.start('spin');
  };

  useEffect(() => {
    controls.start('spin');
  }, [controls, spinDuration]);

  return (
    <motion.div
      className={`relative w-48 h-48 flex items-center justify-center ${className}`}
      animate={controls}
      variants={spinVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ userSelect: 'none' }}
    >
      {chars.map((char, i) => {
        const angle = i * charAngle - 90;
        const x = radius * Math.cos((angle * Math.PI) / 180) + 96;
        const y = radius * Math.sin((angle * Math.PI) / 180) + 96;
        return (
          <span
            key={i}
            className="absolute text-lg font-bold select-none pointer-events-none"
            style={{ left: x, top: y, transform: `translate(-50%, -50%) rotate(${angle + 90}deg)` }}
          >
            {char}
          </span>
        );
      })}
    </motion.div>
  );
};

CircularText.propTypes = {
  text: PropTypes.string.isRequired,
  onHover: PropTypes.string,
  spinDuration: PropTypes.number,
  className: PropTypes.string,
};

export default CircularText;
