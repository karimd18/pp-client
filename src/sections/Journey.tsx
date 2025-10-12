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

import { journeyData, type JourneyItem, type JourneyType } from "../data/journey";

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
      className="min-h-screen bg-gradient-to-b from-black to-dark-violet-900 py-20 relative overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-8">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-6">
            {(["experience", "achievement", "certificate"] as JourneyType[]).map(
              (type) => (
                <motion.button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                    selectedType === type
                      ? "bg-gradient-to-r from-dark-violet-500 to-purple-600 text-white shadow-lg shadow-dark-violet-500/30"
                      : "bg-dark-violet-900/30 text-gray-300 hover:bg-dark-violet-800/50 border border-dark-violet-500/30"
                  }`}
                  whileHover={{ scale: 1.05 }}
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
              )
            )}
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
            className="grid gap-10 px-4 md:px-0"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                className={`relative bg-dark-violet-900/30 backdrop-blur-sm border border-dark-violet-500/20 rounded-xl p-6 transition-all duration-300 ${
                  hoveredId === item.id
                    ? "shadow-xl shadow-dark-violet-500/20 border-dark-violet-500/40 scale-[1.02]"
                    : ""
                }`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`bg-gradient-to-r ${getTypeColor(
                      item.type
                    )} p-4 rounded-xl transform transition-transform duration-300 ${
                      hoveredId === item.id ? "scale-110" : ""
                    }`}
                  >
                    {getTypeIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-4 mb-3">
                      <h3 className="text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{item.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300 mb-3">
                      <Building2 className="w-4 h-4" />
                      <span>{item.organization}</span>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-300 leading-relaxed">
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
                          className="mt-2 flex items-center gap-1 text-dark-violet-300 hover:text-dark-violet-100 transition-colors"
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
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(isMobile && !expandedSkills[item.id]
                            ? item.skills.slice(0, 3)
                            : item.skills
                          ).map((skill, idx) => (
                            <span
                              key={`${item.id}-skill-${idx}`}
                              className={`px-3 py-1.5 rounded-full text-sm bg-dark-violet-800/50 text-dark-violet-300 border border-dark-violet-500/30 transition-all duration-300 ${
                                hoveredId === item.id
                                  ? "border-dark-violet-500/50"
                                  : ""
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        {isMobile && item.skills.length > 3 && (
                          <motion.button
                            onClick={() => toggleSkills(item.id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
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
                        className="inline-flex items-center gap-2 text-dark-violet-400 hover:text-dark-violet-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Decorative gradient line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getTypeColor(
                    item.type
                  )} rounded-full opacity-50 transition-opacity duration-300 ${
                    hoveredId === item.id ? "opacity-100" : ""
                  }`}
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
