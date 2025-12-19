import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase,
  Award,
  GraduationCap,
  ExternalLink,
  Calendar,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  journeyData,
  type JourneyItem,
  type JourneyType,
} from "../data/journey";

const Journey: React.FC = () => {
  const [journey] = useState<JourneyItem[]>(journeyData);
  const [selectedType, setSelectedType] = useState<JourneyType>("experience");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<
    Record<number, boolean>
  >({});
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>(
    {}
  );
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // Determine mobile once and on resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const filteredItems = journey.filter((item) => item.type === selectedType);

  const getTypeIcon = (type: JourneyType) => {
    switch (type) {
      case "experience":
        return <Briefcase className="w-5 h-5" />;
      case "achievement":
        return <Award className="w-5 h-5" />;
      case "certificate":
        return <GraduationCap className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: JourneyType): string => {
    switch (type) {
      case "experience":
        return "from-purple-500 to-pink-500";
      case "achievement":
        return "from-blue-500 to-cyan-500";
      case "certificate":
        return "from-green-500 to-teal-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSkills = (id: number) => {
    setExpandedSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="journey"
      ref={ref}
      className="min-h-screen bg-black py-20 relative overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-dark-violet-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-white">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-accent-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {(
              ["experience", "achievement", "certificate"] as JourneyType[]
            ).map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`
                    px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-md border
                    ${
                      selectedType === type
                        ? "border-accent-500/50 bg-gradient-to-r from-dark-violet-600 to-accent-600 text-white shadow-[0_0_20px_rgba(114,9,183,0.4)]"
                        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                    }
                  `}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  {type === "experience" && <Briefcase className="w-4 h-4" />}
                  {type === "achievement" && <Award className="w-4 h-4" />}
                  {type === "certificate" && (
                    <GraduationCap className="w-4 h-4" />
                  )}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Journey Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 px-4 md:px-0"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`
                  relative 
                  bg-[#0d0a14]/60 
                  backdrop-blur-md 
                  border border-white/5 
                  rounded-2xl 
                  p-8 
                  transition-all 
                  duration-300
                  group
                  hover:border-accent-500/30
                  hover:shadow-[0_0_30px_rgba(114,9,183,0.1)]
                `}
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                  {/* Icon */}
                  <div
                    className={`
                      p-4 rounded-xl transform transition-all duration-300 shadow-lg
                      bg-gradient-to-r ${getTypeColor(item.type)}
                      ${
                        hoveredId === item.id
                          ? "scale-110 shadow-accent-500/30"
                          : ""
                      }
                    `}
                  >
                    <div className="text-white">{getTypeIcon(item.type)}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-200 transition-all">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-accent-300 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/20">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-semibold tracking-wide">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 mb-6 font-medium">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>{item.organization}</span>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-300/90 leading-relaxed font-light text-base md:text-lg">
                        {isMobile
                          ? expandedDescriptions[item.id]
                            ? item.description
                            : `${item.description.substring(0, 200)}${
                                item.description.length > 200 ? "..." : ""
                              }`
                          : item.description}
                      </p>
                      {isMobile && item.description.length > 200 && (
                        <button
                          onClick={() => toggleDescription(item.id)}
                          className="mt-3 flex items-center gap-1 text-accent-400 font-medium hover:text-accent-300 transition-colors text-sm"
                        >
                          {expandedDescriptions[item.id] ? (
                            <>
                              <span>Read less</span>
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              <span>Read more</span>
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Skills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {(isMobile && !expandedSkills[item.id]
                            ? item.skills.slice(0, 3)
                            : item.skills
                          ).map((skill, idx) => (
                            <span
                              key={`${item.id}-skill-${idx}`}
                              className="px-3 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/10 group-hover:border-accent-500/20 group-hover:bg-accent-500/5 transition-all duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        {isMobile && item.skills.length > 3 && (
                          <motion.button
                            onClick={() => toggleSkills(item.id)}
                            className="mt-3 flex items-center gap-1 text-accent-400 font-medium text-sm"
                            whileTap={{ scale: 0.95 }}
                          >
                            {expandedSkills[item.id] ? (
                              <>
                                <span>Show less</span>
                                <ChevronUp className="w-4 h-4" />
                              </>
                            ) : (
                              <>
                                <span>Explore more skills</span>
                                <ChevronDown className="w-4 h-4" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                    )}

                    {/* Link */}
                    {item.link && (
                      <motion.a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-semibold group-hover:text-accent-400 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative Side Line */}
                <div
                  className={`absolute left-[3rem] md:left-[3.5rem] top-24 bottom-24 w-[2px] bg-gradient-to-b ${getTypeColor(
                    item.type
                  )} opacity-20 group-hover:opacity-60 transition-opacity duration-300 hidden md:block`}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Journey;
