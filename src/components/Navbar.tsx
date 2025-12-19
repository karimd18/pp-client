import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("Home");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const current = navItems.find((item) => item.href === `#${id}`);
            if (current) setActive(current.name);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
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
      <header
        className={`
          fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out
          ${
            scrolled || isOpen
              ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-purple-900/5"
              : "bg-transparent py-6"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center relative">
          {/* Desktop Nav - Centered Text Style (Enhanced) */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item, idx) => {
              const isActive = active === item.name;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(item.href);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                      handleNavClick(item.name);
                    }
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group cursor-pointer py-2"
                >
                  <span
                    className={`
                            text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300
                            ${
                              isActive
                                ? "text-white text-shadow-glow"
                                : "text-gray-400 group-hover:text-white"
                            }
                        `}
                  >
                    {item.name}
                  </span>

                  {/* Animated Gradient Underline */}
                  <span
                    className={`
                        absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-dark-violet-500 to-accent-500 transition-all duration-300 ease-out
                        ${
                          isActive
                            ? "w-full opacity-100 shadow-[0_0_10px_rgba(247,37,133,0.5)]"
                            : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
                        }
                      `}
                  />

                  {/* Hover glow spot */}
                  <div className="absolute inset-x-0 -bottom-2 h-4 bg-accent-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.a>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden absolute right-6 text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Simple & Fast */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={32} />
            </button>

            <motion.div
              className="flex flex-col items-center gap-8"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navItems.map((item) => {
                const isActive = active === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.name)}
                    variants={itemVariants}
                    className={`
                        text-3xl font-bold uppercase tracking-widest transition-colors duration-300
                        ${
                          isActive
                            ? "text-white"
                            : "text-white/40 hover:text-white"
                        }
                      `}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
