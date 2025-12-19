import React from "react";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-dark-violet-900/20 via-black to-black animate-pulse-slow" />

      <div className="relative flex flex-col items-center">
        {/* Pulsing Orb */}
        <div className="relative w-24 h-24 mb-8">
          {/* Core */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-dark-violet-600 to-accent-500 blur-md"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Outer Ring 1 */}
          <motion.div
            className="absolute inset-[-10px] rounded-full border border-white/10"
            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          {/* Outer Ring 2 */}
          <motion.div
            className="absolute inset-[-20px] rounded-full border border-white/5 border-t-accent-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Typography
            variant="h6"
            className="text-white font-bold tracking-[0.2em] uppercase"
          >
            Loading
          </Typography>
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent mt-2 w-full"
            animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;
