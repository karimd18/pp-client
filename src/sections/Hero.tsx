import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Typography from "@mui/material/Typography";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="
        relative
        w-full
        min-h-screen
        bg-gradient-to-b from-black via-dark-violet-900/40 to-black
        flex items-center
        overflow-hidden
        pb-12 md:pb-20
        pt-16
      "
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-dark-violet-600/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-8 pt-4 relative z-10">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 sm:space-y-8 z-30 mt-8 md:mt-0">
          {/* Heading */}
          <div className="overflow-hidden">
            <Typography
              component="h1"
              variant="h1"
              sx={{ typography: { xs: "h2", md: "h1" } }}
              className="
                font-extrabold
                leading-tight
                text-4xl        
                sm:text-5xl    
                md:text-6xl    
                lg:text-7xl    
                z-30
                mb-2 sm:mb-3
                flex flex-wrap justify-center md:justify-start
                tracking-tight
                "
            >
              <span className="mr-3 overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                  className="inline-block text-white"
                >
                  I'm
                </motion.span>
              </span>

              <span className="overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="
                    inline-block 
                    bg-gradient-to-r from-accent-400 via-purple-400 to-dark-violet-300 
                    bg-clip-text text-transparent
                    pb-2
                  "
                >
                  Karim Doueik
                </motion.span>
              </span>
            </Typography>
          </div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="px-2"
          >
            <Typography
              variant="h6"
              className="max-w-xl text-gray-300/90 text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
            >
              A curious and adaptable thinker with a passion for continuous
              learning, collaboration, and turning challenges into meaningful
              solutions.
            </Typography>
          </motion.div>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative mt-6 sm:mt-8 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dark-violet-500 to-accent-500 opacity-60 blur-lg rounded-full group-hover:opacity-80 transition duration-500" />
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative
                inline-block
                px-8 py-3.5
                sm:px-9 sm:py-4
                bg-gradient-to-r from-dark-violet-600 to-accent-600
                rounded-full
                shadow-[0_0_20px_rgba(114,9,183,0.3)]
                hover:shadow-[0_0_30px_rgba(247,37,133,0.5)]
                transition-all
                duration-300
                border border-white/10
              "
            >
              <Typography
                variant="button"
                className="text-white font-bold text-sm sm:text-base tracking-wide"
              >
                View Projects
              </Typography>
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 sm:mb-0 relative">
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-dark-violet-600/30 to-accent-500/20 rounded-full blur-[80px] opacity-60 transform scale-75" />

          <motion.img
            src="/assets/images/hero-illustration.png"
            alt="Laptop and tablet illustration"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="
              relative
              z-10
              w-full
              max-w-[340px]
              xs:max-w-[700px]
              sm:max-w-[740px]
              md:max-w-[780px]
              lg:max-w-[840px]
              xl:max-w-[800px]
              object-contain
              drop-shadow-2xl
              animate-float
            "
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-accent-400 transition-colors duration-300 group"
        >
          <Typography
            variant="caption"
            className="mb-2 uppercase tracking-[0.2em] text-xs font-medium group-hover:tracking-[0.3em] transition-all"
          >
            Scroll Down
          </Typography>
          <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:border-accent-400/30 transition-colors">
            <ChevronDown
              className="animate-bounce-slow text-accent-400"
              size={20}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
