import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden z-50">
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, #1e1b4b, #2a0f64, #000000, #2a0f64, #1e1b4b)',
          backgroundSize: '200% 200%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle Overlay Pulse */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Spinner Rings with responsive scaling */}
      <div className="relative w-32 h-32 scale-75 sm:scale-100">
        {[
          { dur: 1.2, color: 'border-t-indigo-500' },
          { dur: 0.9, color: 'border-t-pink-500' },
          { dur: 0.6, color: 'border-t-purple-500' }
        ].map((ring, i) => (
          <motion.div
            key={i}
            className={`absolute inset-${i * 2} border-2 sm:border-4 border-transparent ${ring.color} rounded-full`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ repeat: Infinity, ease: 'linear', duration: ring.dur }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
