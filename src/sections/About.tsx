import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Typography from "@mui/material/Typography";
import { Code, Server, Cpu, Database } from "lucide-react";
import cvFile from "../../public/KarimDoueikCV.pdf";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  return (
    <section
      id="about"
      className="
        w-full
        min-h-screen
        bg-gradient-to-b from-dark-violet-900 to-black
        py-16 md:py-20
      "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start"
        >
          {/* Left Column: About Text */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative inline-block">
              <Typography
                component="h2"
                variant="h4"
                className="text-white font-extrabold"
              >
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Me
                </span>
              </Typography>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <Typography
                variant="h6"
                className="text-gray-300 leading-relaxed"
              >
                I’m a builder at heart—turning bold ideas into end-to-end
                digital experiences.
              </Typography>

              <Typography
                variant="h6"
                className="text-gray-300 leading-relaxed"
              >
                From intuitive web interfaces to cross-platform apps and
                AI-powered services, I craft solutions for real-world needs.
              </Typography>

              <Typography
                variant="h6"
                className="text-gray-300 leading-relaxed"
              >
                I thrive on collaboration and iteration, focusing on
                performance, reliability, and seamless user experiences.
              </Typography>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex
                  items-center
                  px-5
                  py-2.5
                  bg-gradient-to-r from-purple-500 to-pink-500
                  text-white font-medium
                  rounded-lg
                  text-sm
                  shadow-lg
                  transition duration-300
                  group
                "
              >
                <span>Get In Touch</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </motion.a>

              <motion.a
                onClick={handleDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex
                  items-center
                  px-5
                  cursor-pointer
                  py-2.5
                  border border-dark-violet-500
                  rounded-lg
                  text-white
                  hover:bg-dark-violet-800/30
                  transition duration-300
                  group
                "
              >
                <span>Download CV</span>
                <span className="ml-2 group-hover:translate-y-0.5 transition-transform">
                  &darr;
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column: Skills Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative inline-block mb-4">
              <Typography
                component="h3"
                variant="h5"
                className="text-dark-violet-300 font-semibold"
              >
                My <span className="heading-gradient">Skills</span>
              </Typography>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="
                    bg-dark-violet-900/50
                    backdrop-blur-sm
                    border border-dark-violet-700
                    rounded-xl
                    p-6
                    shadow-md
                    hover:shadow-purple-500/20
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-dark-violet-800 rounded-lg flex items-center justify-center">
                      {category.icon}
                    </div>
                    <Typography
                      variant="subtitle1"
                      className="text-white font-bold"
                    >
                      {category.title}
                    </Typography>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        variants={itemVariants}
                        className="group"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-xs text-dark-violet-300 group-hover:text-white transition-colors">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-dark-violet-800/70 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            variants={barVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            custom={skill.level}
                          />
                        </div>
                      </motion.div>
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
