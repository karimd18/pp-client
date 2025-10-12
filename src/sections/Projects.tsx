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
  { id: "mobile", label: "Mobile Apps", icon: <Smartphone className="h-4 w-4" /> },
  { id: "AI", label: "AI Projects", icon: <Brain className="h-4 w-4" /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
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
        (p) => filter === "all" || p.categories.includes(filter as ProjectCategory)
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
      className="w-full min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(127,63,191,0.18),transparent),linear-gradient(to_bottom,#0a0712,#000)] py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Filters */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-10 md:mb-14"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3"
            variants={itemVariants}
          >
            My{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-300/90 max-w-3xl mx-auto mb-8"
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
                  whileHover={{ y: -1.5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={[
                    "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                    "backdrop-blur",
                    isActive
                      ? "text-white shadow-lg shadow-violet-900/30 bg-gradient-to-r from-violet-700/70 to-fuchsia-700/70"
                      : "text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10",
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Skeletons */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`sk-${i}`}
                variants={itemVariants}
                className="h-80 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
              />
            ))}

          {!loading && filteredProjects.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16"
            >
              <TagIcon className="h-8 w-8 text-gray-400 mb-3" />
              <p className="text-gray-300">No projects in this category yet.</p>
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
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-violet-800/40 via-fuchsia-700/20 to-transparent hover:from-violet-700/70 hover:via-fuchsia-700/40 hover:to-violet-900/10 transition-colors"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden bg-[#0d0a14]/90 border border-white/10">
                    {/* Thumb */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.02 }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://via.placeholder.com/800x450?text=Project+Image";
                        }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-transparent to-transparent opacity-90" />
                      {/* Title Row */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <Typography variant="h6" className="text-white font-semibold truncate">
                          {project.title}
                        </Typography>

                        <div className="flex items-center gap-2">
                          {hasLinks ? (
                            <>
                              {project.links.github && (
                                <a
                                  href={project.links.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center rounded-full bg-black/60 border border-white/10 p-2 text-white hover:bg-white/10 transition"
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
                                  className="inline-flex items-center justify-center rounded-full bg-black/60 border border-white/10 p-2 text-white hover:bg-white/10 transition"
                                  aria-label="Live Demo"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={18} />
                                </a>
                              )}
                            </>
                          ) : (
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-xs text-violet-200"
                              title="This project's code and demo are private"
                            >
                              <Lock className="h-3.5 w-3.5" />
                              Confidential
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <button
                      className="text-left w-full"
                      onClick={() => setSelected(project)}
                    >
                      <div className="p-5 md:p-6">
                        <Typography
                          variant="body2"
                          className={[
                            "text-gray-300/90 transition-all",
                            isLong && !isExpanded ? "line-clamp-3" : "",
                          ].join(" ")}
                        >
                          {project.description}
                        </Typography>

                        {isLong && (
                          <div className="mt-2">
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpand(project.id);
                              }}
                              className="cursor-pointer text-sm text-violet-300 hover:text-violet-200"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </span>
                          </div>
                        )}

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span
                              key={`${project.id}-tag-${idx}`}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.article>
              );
            })}
        </motion.div>
      </div>

      {/* Modal / Details Card — mobile bottom sheet + desktop centered */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* Outer gradient ring (responsive) */}
              <div className="relative w-full sm:max-w-3xl sm:rounded-2xl rounded-t-2xl sm:p-[1px] bg-gradient-to-br from-violet-700/60 via-fuchsia-700/40 to-transparent">
                {/* Card */}
                <div
                  className={[
                    // Structure
                    "flex max-h-[90vh] sm:max-h-[85vh] flex-col overflow-hidden",
                    // Surface
                    "bg-[#0c0913] border border-white/10",
                    // Radius
                    "rounded-t-2xl sm:rounded-2xl",
                  ].join(" ")}
                >
                  {/* Sticky drag handle on mobile */}
                  <div className="sm:hidden flex items-center justify-center pt-2">
                    <div className="h-1.5 w-12 rounded-full bg-white/15" />
                  </div>

                  {/* Header (sticky) */}
                  <div className="sticky top-0 z-10 flex items-start gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-[#0c0913]/95 backdrop-blur">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-2xl font-bold text-white">
                        {selected.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-gray-400">
                        {selected.categories.join(" • ")}
                      </p>
                    </div>
                    <button
                      aria-label="Close"
                      onClick={() => setSelected(null)}
                      className="shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 sm:p-2.5 text-white hover:bg-white/10 active:scale-95"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>

                  {/* Scrollable content */}
                  <div className="overflow-y-auto">
                    {/* Media (responsive aspect) */}
                    <div className="relative w-full aspect-video sm:aspect-[16/9]">
                      <img
                        src={selected.image}
                        alt={selected.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://via.placeholder.com/1280x720?text=Project";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0913] via-transparent to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="px-4 sm:px-6 py-4 sm:py-6">
                      <p className="text-sm sm:text-base text-gray-200/90 leading-relaxed">
                        {selected.description}
                      </p>

                      {selected.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selected.tags.map((t, i) => (
                            <span
                              key={`sel-tag-${i}`}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions / Links or Confidential */}
                      {(() => {
                        const hasSelectedLinks = Boolean(
                          selected.links?.github || selected.links?.live
                        );
                        return hasSelectedLinks ? (
                          <div className="mt-6 flex flex-wrap gap-3">
                            {selected.links?.github && (
                              <a
                                href={selected.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
                              >
                                <Github className="h-4 w-4" />
                                View Code
                              </a>
                            )}
                            {selected.links?.live && (
                              <a
                                href={selected.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10"
                              >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-violet-200">
                            <Lock className="h-4 w-4" />
                            <span>Code is confidential / under NDA</span>
                          </div>
                        );
                      })()}
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