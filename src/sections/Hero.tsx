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
        bg-gradient-to-b from-black to-dark-violet-900
        flex items-center
        overflow-hidden
        pb-12 md:pb-20
        pt-16
      "
    >
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-8 pt-4">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-5 z-30 mt-6 md:mt-0">
          {/* Heading */}
          <div className="overflow-hidden">
            <Typography
              component="h1"
              variant="h1"
              sx={{ typography: { xs: 'h2', md: 'h1' } }}
              className="
                font-extrabold
                leading-tight
                text-xl        
                sm:text-2xl    
                md:text-5xl    
                lg:text-6xl    
                z-30
                mb-2 sm:mb-3
                flex flex-wrap justify-center md:justify-start
                "
            >
              <span className="mr-2 overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block text-white"
                >
                  I'm
                </motion.span>
              </span>

              <span className="overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
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
              className="max-w-lg text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
            >
              A curious and adaptable thinker with a passion for continuous learning, collaboration, and turning challenges into meaningful solutions.
            </Typography>
          </motion.div>

          {/* Button */}
          <div className="relative mt-4 sm:mt-5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50 blur-xl rounded-full" />
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative
                inline-block
                px-6 py-2.5
                sm:px-7 sm:py-3
                bg-gradient-to-r from-purple-500 to-pink-500
                rounded-full
                drop-shadow-lg
                hover:opacity-90
                transition
                duration-300
              "
            >
              <Typography
                variant="button"
                className="text-white font-semibold text-sm sm:text-base"
              >
                View Projects
              </Typography>
            </motion.a>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex justify-center mb-4 sm:mb-0">
          <img
            src="https://i.ibb.co/gL2hq04X/4102879-971-Photoroom-1.png"
            alt="Laptop and tablet illustration"
            className="
              w-full
              max-w-[340px]
              xs:max-w-[700px]
              sm:max-w-[740px]
              md:max-w-[780px]
              lg:max-w-[840px]
              xl:max-w-[800px]
              object-contain
            "
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="hidden md:block absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30"
      >
        <a
          href="#about"
          className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition-colors duration-300"
        >
          <Typography
            variant="caption"
            className="mb-1 uppercase tracking-wide text-xs"
          >
            Scroll Down
          </Typography>
          <ChevronDown className="animate-bounce text-purple-400" size={22} />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;