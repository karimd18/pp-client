import React, { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Menu, X } from "lucide-react";
import Typography from "@mui/material/Typography";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

// Framer Motion variants for staggered list (mobile)
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("Home");

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // change header BG on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight link based on section in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id; // e.g. 'about'
            const current = navItems.find((item) => item.href === `#${id}`);
            if (current) setActive(current.name);
          }
        });
      },
      {
        rootMargin: "-30% 0px -65% 0px", // Adjusted for better detection
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleNavClick = (name: string) => {
    setActive(name);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "bg-background/80 backdrop-blur-md py-4 shadow-md"
              : "bg-transparent py-6"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.name)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`
                  relative group cursor-pointer transition-colors
                  ${
                    active === item.name
                      ? "text-dark-violet-400"
                      : "text-gray-300"
                  }
                `}
              >
                <Typography
                  variant="button"
                  className="uppercase tracking-wider text-lg"
                >
                  {item.name}
                </Typography>
                <span
                  className={`
                    absolute left-0 -bottom-1 h-0.5 bg-dark-violet-400 transition-all duration-300
                    ${active === item.name ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile burger button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-4 md:hidden text-white focus:outline-none"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </header>

      {/* Full-screen mobile menu - Fixed at viewport top */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-lg flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button inside mobile menu */}
          <motion.button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white z-70 focus:outline-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X size={32} strokeWidth={2} />
          </motion.button>
          
          {/* Navigation items with proper centering */}
          <motion.div
            className="flex flex-col items-center justify-center space-y-8 w-full"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map(item => (
              <motion.div key={item.name} variants={itemVariants}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.name)}
                  className={`
                    text-2xl uppercase tracking-wide transition-colors
                    ${active === item.name ? "text-white" : "text-gray-300"}
                    hover:text-white font-medium
                  `}
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;