import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, Instagram } from 'lucide-react';
import Typography from '@mui/material/Typography';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-dark-violet-900 to-black pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Divider */}
        <div className="border-t border-dark-violet-800/50 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* ── Logo + Description + Socials ───────────────────────────────────────── */}
          <div className="space-y-6">
            <Typography variant="h3" className="font-extrabold">
              <span className="text-purple-400">Karim </span>
              <span className="text-white">Doueik</span>
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              Full-Stack Developer focused on crafting seamless web, mobile & desktop experiences with modern technologies.
            </Typography>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/karimd18"
                className="rounded-full p-2 bg-dark-violet-800/50 hover:bg-dark-violet-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/karim-doueik-6a9b30252/"
                className="rounded-full p-2 bg-dark-violet-800/50 hover:bg-dark-violet-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/karimdoueik"
                className="rounded-full p-2 bg-dark-violet-800/50 hover:bg-dark-violet-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-gray-300 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* ── Quick Links ───────────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-white font-semibold mb-4">
              Quick Links
            </Typography>
            <ul className="space-y-2">
              {[
                ['Home', '#hero'],
                ['About', '#about'],
                ['Projects', '#projects'],
                ['Journey', '#journey'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Typography
                    component="a"
                    href={href}
                    variant="body2"
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {label}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Info ─────────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-white font-semibold mb-4">
              Contact Info
            </Typography>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              <Typography variant="body2" className="text-gray-400">
                karimdoueik9@gmail.com
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              <Typography variant="body2" className="text-gray-400">
                Lebanon
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-400" />
              <Typography variant="body2" className="text-gray-400">
                +961 78 896 067
              </Typography>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-violet-800/50 mt-12 pt-8 text-center">
          <Typography variant="body2" className="text-gray-500">
            © {new Date().getFullYear()} Karim Doueik. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
