import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typography from "@mui/material/Typography";
import {
  projectsData,
  type Project,
  type ProjectCategory,
} from "../data/projects";
import {
  Github,
  ExternalLink,
  Code,
  Monitor,
  Smartphone,
  Brain,
  X,
  Tag as TagIcon,
  Lock,
} from "lucide-react";

type FilterKey = "all" | ProjectCategory;

const DESCRIPTION_LIMIT = 200;

const filters: { id: FilterKey; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "All Projects", icon: <Code className="h-4 w-4" /> },
  { id: "web", label: "Web Apps", icon: <Monitor className="h-4 w-4" /> },
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: <Smartphone className="h-4 w-4" />,
  },
  { id: "AI", label: "AI Projects", icon: <Brain className="h-4 w-4" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expandedIds, setExpandedIds] = useState<Set<Project["id"]>>(new Set());
  const [selected, setSelected] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  useEffect(() => {
    setLoading(true);
    try {
      setProjects(projectsData);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          filter === "all" || p.categories.includes(filter as ProjectCategory)
      ),
    [projects, filter]
  );

  const toggleExpand = (id: Project["id"]) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="projects"
      className="w-full min-h-screen bg-black py-20 relative overflow-hidden"
    >
      {/* Dynamic Background Elements - Consistent "Blobs" */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-dark-violet-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading + Filters */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
            variants={itemVariants}
          >
            My{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-300/90 max-w-3xl mx-auto mb-10 text-lg font-light leading-relaxed"
            variants={itemVariants}
          >
            A curated selection across web, mobile, and AI—clean UI, strong UX,
            and production-ready integrations.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={itemVariants}
          >
            {filters.map((cat) => {
              const isActive = filter === cat.id;
              return (
                <motion.button
                  key={cat.label}
                  onClick={() => setFilter(cat.id)}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={[
                    "flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-300",
                    "backdrop-blur-md border",
                    isActive
                      ? "text-white border-accent-500/50 bg-gradient-to-r from-dark-violet-600 to-accent-600 shadow-[0_0_15px_rgba(114,9,183,0.4)]"
                      : "text-gray-400 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white",
                  ].join(" ")}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {/* Skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`sk-${i}`}
                variants={itemVariants}
                className="h-[400px] rounded-2xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}

          {!loading && filteredProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16"
            >
              <TagIcon className="h-10 w-10 text-gray-500 mb-4" />
              <p className="text-gray-400 text-lg">
                No projects in this category yet.
              </p>
            </motion.div>
          )}

          {!loading &&
            filteredProjects.map((project) => {
              const isLong = project.description.length > DESCRIPTION_LIMIT;
              const isExpanded = expandedIds.has(project.id);
              const hasLinks = Boolean(
                project.links?.github || project.links?.live
              );

              return (
                <motion.article
                  key={`${project.id}-${project.title}`}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-accent-500 hover:via-purple-500 hover:to-dark-violet-500 transition-all duration-500 h-full shadow-lg hover:shadow-[0_0_30px_rgba(114,9,183,0.15)]"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-accent-500 to-dark-violet-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500" />

                  <div className="relative h-full rounded-2xl overflow-hidden bg-[#0d0a14] border border-white/5 group-hover:border-transparent transition-colors flex flex-col">
                    {/* Thumb */}
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "/assets/projects/placeholder.jpg"; // Fallback
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/20 to-transparent opacity-90" />

                      {/* Title Row */}
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between z-10">
                        <div>
                          <Typography
                            variant="h6"
                            className="text-white font-bold tracking-tight text-xl leading-snug drop-shadow-md"
                          >
                            {project.title}
                          </Typography>
                          <span className="text-xs text-accent-300 font-bold bg-accent-500/10 px-2.5 py-1 rounded-md border border-accent-500/20 mt-1.5 inline-block backdrop-blur-sm tracking-wide">
                            {project.categories[0].toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {hasLinks ? (
                            <>
                              {project.links.github && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center rounded-full bg-black/60 border border-white/20 p-2 text-white hover:bg-accent-500 hover:border-accent-400 transition-all duration-300 shadow-lg backdrop-blur-sm hover:scale-110"
                                  aria-label="GitHub"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github size={18} />
                                </a>
                              )}
                              {project.links.live && (
                                <a
                                  href={project.links.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center rounded-full bg-black/60 border border-white/20 p-2 text-white hover:bg-accent-500 hover:border-accent-400 transition-all duration-300 shadow-lg backdrop-blur-sm hover:scale-110"
                                  aria-label="Live Demo"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={18} />
                                </a>
                              )}
                            </>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-gray-400"
                              title="This project's code and demo are private"
                            >
                              <Lock className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <button
                      className="text-left w-full flex-grow flex flex-col group/card-body outline-none"
                      onClick={() => setSelected(project)}
                    >
                      <div className="p-5 md:p-6 flex-grow flex flex-col">
                        <Typography
                          variant="body2"
                          className={[
                            "text-gray-300/80 leading-relaxed transition-all mb-4 font-light",
                            isLong && !isExpanded ? "line-clamp-3" : "",
                          ].join(" ")}
                        >
                          {project.description}
                        </Typography>

                        {isLong && (
                          <div className="mt-auto mb-4">
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpand(project.id);
                              }}
                              className="cursor-pointer text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </span>
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={`${project.id}-tag-${idx}`}
                              className="rounded-md border border-dark-violet-500/30 bg-dark-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-200"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs text-gray-400">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.article>
              );
            })}
        </motion.div>
      </div>

      {/* Modern Glass Modal / Details Panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <div
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0913] border border-white/10 shadow-2xl relative scrollbar-hide"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button - Floated */}
                <button
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 group"
                >
                  <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: Image Area */}
                  <div className="relative h-64 md:h-auto min-h-[300px]">
                    <img
                      src={selected.image}
                      alt={selected.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/1280x720?text=Project";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0913] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0913]" />

                    {/* Floating Categories */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {selected.categories.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Content Area */}
                  <div className="p-8 flex flex-col">
                    <h3 className="text-3xl font-extrabold text-white mb-2">
                      {selected.title}
                    </h3>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selected.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded bg-dark-violet-500/10 text-violet-300 border border-dark-violet-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="prose prose-invert max-w-none mb-8 text-gray-300/90 leading-relaxed font-light">
                      <p>{selected.description}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-4">
                        {selected.links?.live && (
                          <a
                            href={selected.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-gradient-to-r from-accent-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-accent-500/25 hover:scale-[1.02] transition-all duration-300"
                          >
                            <ExternalLink className="w-5 h-5" />
                            View Live
                          </a>
                        )}
                        {selected.links?.github && (
                          <a
                            href={selected.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                          >
                            <Github className="w-5 h-5" />
                            View Code
                          </a>
                        )}
                        {!selected.links?.live && !selected.links?.github && (
                          <div className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-center text-gray-400 text-sm">
                            <Lock className="w-4 h-4 mx-auto mb-2 opacity-50" />
                            This project is confidential.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
