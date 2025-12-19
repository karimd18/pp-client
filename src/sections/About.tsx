import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typography from "@mui/material/Typography";
import { Code, Server, Cpu, Database } from "lucide-react";
const cvFile = "/KarimDoueikCV.pdf";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="h-5 w-5 text-blue-400" />,
    skills: [
      { name: "React", level: 90, color: "from-blue-500 to-cyan-500" },
      { name: "Typescript", level: 80, color: "from-green-500 to-teal-500" },
      { name: "Next.js", level: 65, color: "from-gray-700 to-gray-900" },
      { name: "React Native", level: 60, color: "from-red-500 to-pink-500" },
      { name: "Flutter", level: 55, color: "from-blue-600 to-blue-800" },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-5 w-5 text-green-400" />,
    skills: [
      { name: "Laravel", level: 95, color: "from-green-700 to-green-900" },
      { name: "ASP.NET", level: 90, color: "from-red-600 to-red-800" },
      { name: "Spring Boot", level: 80, color: "from-green-600 to-green-800" },
      { name: "Quarkus", level: 80, color: "from-gray-600 to-gray-800" },
      {
        name: "Node & Express JS",
        level: 65,
        color: "from-purple-600 to-purple-800",
      },
    ],
  },
  {
    title: "Artificial Intelligence",
    icon: <Cpu className="h-5 w-5 text-indigo-400" />,
    skills: [
      {
        name: "Prompt Engineering",
        level: 90,
        color: "from-indigo-500 to-indigo-700",
      },
      {
        name: "TensorFlow & Keras",
        level: 60,
        color: "from-blue-400 to-cyan-600",
      },
      { name: "PyTorch", level: 55, color: "from-orange-500 to-orange-700" },
      { name: "Scikit-Learn", level: 50, color: "from-teal-500 to-teal-700" },
      { name: "OpenCV & PIL", level: 45, color: "from-amber-600 to-amber-800" },
    ],
  },
  {
    title: "Database & DevOps",
    icon: <Database className="h-5 w-5 text-yellow-400" />,
    skills: [
      { name: "PostgreSQL", level: 70, color: "from-blue-600 to-blue-800" },
      { name: "MongoDB", level: 40, color: "from-green-500 to-green-700" },
      { name: "Docker", level: 35, color: "from-cyan-500 to-cyan-700" },
      { name: "AWS", level: 30, color: "from-yellow-600 to-yellow-800" },
      { name: "CI/CD", level: 20, color: "from-gray-600 to-gray-800" },
    ],
  },
];

const handleDownload = () => {
  const link = document.createElement("a");
  link.href = cvFile;
  link.setAttribute("download", "Karim_Doueik_CV.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <section
      id="about"
      className="
        relative
        w-full
        min-h-screen
        bg-black
        py-20 md:py-28
        overflow-hidden
      "
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-dark-violet-900/20 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start"
        >
          {/* Left Column: About Text */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative inline-block">
              <Typography
                component="h2"
                variant="h3"
                className="text-white font-extrabold tracking-tight text-4xl md:text-5xl"
              >
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-500">
                  Me
                </span>
              </Typography>
              <div className="absolute -bottom-2 left-0 w-1/2 h-1.5 bg-gradient-to-r from-accent-500 to-purple-600 rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg">
              <Typography
                variant="body1"
                className="text-gray-300/90 leading-relaxed font-light"
              >
                I’m a builder at heart—turning bold ideas into end-to-end
                digital experiences.
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-300/90 leading-relaxed font-light"
              >
                From intuitive web interfaces to cross-platform apps and
                AI-powered services, I craft solutions for real-world needs.
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-300/90 leading-relaxed font-light"
              >
                I thrive on collaboration and iteration, focusing on
                performance, reliability, and seamless user experiences.
              </Typography>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="
                  inline-flex
                  items-center
                  px-8
                  py-3.5
                  bg-gradient-to-r from-accent-600 to-dark-violet-600
                  text-white font-bold tracking-wide
                  rounded-full
                  shadow-[0_0_20px_rgba(247,37,133,0.4)]
                  hover:shadow-[0_0_30px_rgba(247,37,133,0.6)]
                  transition-all duration-300
                  group
                  text-sm md:text-base
                "
              >
                <span>Get In Touch</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </motion.a>

              <motion.a
                onClick={handleDownload}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="
                  inline-flex
                  items-center
                  px-8
                  py-3.5
                  cursor-pointer
                  border border-white/10
                  bg-white/5
                  backdrop-blur-sm
                  rounded-full
                  text-white font-medium
                  hover:bg-white/10 hover:border-accent-500/30
                  transition-all duration-300
                  group
                  text-sm md:text-base
                "
              >
                <span>Download CV</span>
                <span className="ml-2 group-hover:translate-y-1 transition-transform">
                  &darr;
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Skills Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-end gap-4 mb-2">
              <Typography
                component="h3"
                variant="h4"
                className="text-white font-bold tracking-tight"
              >
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-accent-400">
                  Skills
                </span>
              </Typography>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="
                    relative
                    overflow-hidden
                    bg-[#0d0a14]/60
                    backdrop-blur-md
                    border border-white/5
                    rounded-2xl
                    p-6
                    shadow-lg
                    hover:border-accent-500/30
                    hover:shadow-[0_0_20px_rgba(114,9,183,0.15)]
                    transition-all
                    duration-300
                    group
                  "
                >
                  {/* Subtle gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-white/5 rounded-xl text-accent-300 group-hover:text-accent-400 group-hover:bg-accent-500/10 transition-colors">
                      {React.cloneElement(
                        category.icon as React.ReactElement<any>,
                        {
                          className: "h-6 w-6",
                        }
                      )}
                    </div>
                    <Typography
                      variant="subtitle1"
                      className="text-white font-bold text-lg tracking-wide group-hover:text-accent-100 transition-colors"
                    >
                      {category.title}
                    </Typography>
                  </div>

                  <div className="relative z-10 space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group/skill">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 group-hover/skill:text-accent-300 transition-colors">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-[0_0_10px_currentColor]`}
                            variants={barVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            custom={skill.level}
                            style={{ opacity: 0.9 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
