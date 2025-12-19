import React from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black pt-20 pb-10 relative overflow-hidden">
      {/* Dynamic Background Elements - Flowing from Sections above */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-dark-violet-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* ── Logo + Description + Socials ───────────────────────────────────────── */}
          <div className="space-y-6">
            <Typography variant="h3" className="font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Karim{" "}
              </span>
              <span className="text-white">Doueik</span>
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-400 leading-relaxed font-light"
            >
              Full-Stack Developer focused on crafting seamless web, mobile &
              desktop experiences with modern technologies.
            </Typography>

            <div className="flex items-center gap-3">
              {[
                {
                  icon: <Github size={20} />,
                  href: "https://github.com/karimd18",
                  label: "GitHub",
                },
                {
                  icon: <Linkedin size={20} />,
                  href: "https://www.linkedin.com/in/karim-doueik-6a9b30252/",
                  label: "LinkedIn",
                },
                {
                  icon: <Instagram size={20} />,
                  href: "https://www.instagram.com/karimdoueik",
                  label: "Instagram",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-accent-500 hover:border-accent-500 shadow-lg hover:shadow-accent-500/25 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ───────────────────────────────────────────────────────────── */}
          <div className="space-y-6">
            <Typography
              variant="h6"
              className="text-white font-bold tracking-wide uppercase text-sm"
            >
              Quick Links
            </Typography>
            <ul className="space-y-3">
              {[
                ["Home", "#hero"],
                ["About", "#about"],
                ["Projects", "#projects"],
                ["Journey", "#journey"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-gray-400 hover:text-accent-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-accent-400 transition-colors" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ─────────────────────────────────────────────────────────── */}
          <div className="space-y-6">
            <Typography
              variant="h6"
              className="text-white font-bold tracking-wide uppercase text-sm"
            >
              Contact Info
            </Typography>
            <div className="space-y-4">
              <a
                href="mailto:karimdoueik9@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-500/50 transition-colors">
                  <Mail className="h-5 w-5 text-gray-300 group-hover:text-accent-400 transition-colors" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-400 group-hover:text-white transition-colors"
                >
                  karimdoueik9@gmail.com
                </Typography>
              </a>

              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-500/50 transition-colors">
                  <MapPin className="h-5 w-5 text-gray-300 group-hover:text-accent-400 transition-colors" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-400 group-hover:text-white transition-colors"
                >
                  Lebanon
                </Typography>
              </div>

              <a
                href="tel:+96178896067"
                className="flex items-center gap-3 group"
              >
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent-500/50 transition-colors">
                  <Phone className="h-5 w-5 text-gray-300 group-hover:text-accent-400 transition-colors" />
                </div>
                <Typography
                  variant="body2"
                  className="text-gray-400 group-hover:text-white transition-colors"
                >
                  +961 78 896 067
                </Typography>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 text-center border-t border-white/5">
          <Typography variant="body2" className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Karim Doueik. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
