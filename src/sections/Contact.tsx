import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const FORM_SUBMIT_EMAIL = "karimdoueik9@gmail.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(
  FORM_SUBMIT_EMAIL
)}`;
const NOTIF_DURATION_MS = 5000;

/** Portal so the toast renders above everything (navbar, sections, overflows). */
const ToastPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email, // reply-to address
          subject: formData.subject, // email subject
          message: formData.message,
          _template: "table",
          _subject: formData.subject,
          _captcha: "false",
        }),
      });

      if (!res.ok) {
        const maybeJson = await res.json().catch(() => null);
        const msg =
          (maybeJson && (maybeJson.message || maybeJson.error)) ||
          `Failed to send message (status ${res.status})`;
        throw new Error(msg);
      }

      setNotification({
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setNotification({
        type: "error",
        message:
          err?.message ||
          "Failed to send message. Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Auto-hide notification
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), NOTIF_DURATION_MS);
    return () => clearTimeout(t);
  }, [notification]);

  return (
    <section
      id="contact"
      ref={ref}
      className="w-full min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-dark-violet-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ====== GLOBAL OVER-NAVBAR TOAST (top-right) VIA PORTAL ====== */}
      <ToastPortal>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              style={{
                position: "fixed",
                top: "max(env(safe-area-inset-top, 0px), 24px)",
                right: "max(env(safe-area-inset-right, 0px), 24px)",
              }}
              className="z-[9999] w-[90vw] max-w-sm"
              role="status"
              aria-live="polite"
            >
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-accent-500/40 to-purple-600/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <div className="relative overflow-hidden rounded-2xl bg-[#0c0913]/95 backdrop-blur-xl border border-white/10 px-4 py-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 grid place-items-center h-10 w-10 rounded-full ${
                        notification.type === "success"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20"
                          : "bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/20"
                      } text-white`}
                    >
                      {notification.type === "success" ? (
                        <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
                      ) : (
                        <Mail className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm font-bold text-white mb-0.5">
                        {notification.type === "success"
                          ? "Message Sent!"
                          : "Error"}
                      </p>
                      <p className="text-xs text-gray-300 leading-relaxed font-medium">
                        {notification.message}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotification(null)}
                      className="text-gray-500 hover:text-white transition-colors p-1"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ToastPortal>

      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center mb-16 relative z-10"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          variants={itemVariants}
        >
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-500">
            Touch
          </span>
        </motion.h2>
        <motion.p
          className="text-gray-300/80 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          variants={itemVariants}
        >
          Have a project in mind or want to collaborate? I'm always open to
          discussing new ideas and opportunities.
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        {/* Left Column: Contact Info + Socials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "karimdoueik9@gmail.com",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Phone",
                  value: "+961 78 896 067",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  value: "Lebanon",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white/5 border border-white/10 p-4 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1 pointer-events-none">
                      {item.label}
                    </h4>
                    <p className="text-lg font-semibold text-white tracking-wide">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-white mb-6">
              Connect With Me
            </h4>
            <div className="flex gap-4">
              {[
                {
                  href: "https://github.com/karimd18",
                  label: "GitHub",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.582 9.5 21.27 9.5 21.007V19.345C6.708 19.99 6.142 18.127 6.142 18.127C5.694 16.983 5.028 16.67 5.028 16.67C4.103 16.034 5.097 16.047 5.097 16.047C6.122 16.119 6.666 17.1 6.666 17.1C7.584 18.669 9.093 18.175 9.541 17.919C9.633 17.262 9.895 16.769 10.196 16.471C7.945 16.171 5.584 15.311 5.584 11.473C5.584 10.385 6.001 9.487 6.686 8.787C6.58 8.537 6.216 7.541 6.786 6.162C6.786 6.162 7.65 5.897 9.499 7.197C10.301 6.976 11.15 6.866 11.999 6.864C12.848 6.866 13.697 6.976 14.499 7.197C16.348 5.897 17.212 6.162 17.212 6.162C17.782 7.541 17.418 8.537 17.312 8.787C17.997 9.487 18.414 10.385 18.414 11.473C18.414 15.321 16.049 16.17 13.791 16.467C14.176 16.836 14.539 17.57 14.539 18.703V21.007C14.539 21.271 14.699 21.585 15.208 21.488C19.179 20.165 22.044 16.418 22.044 12C22.044 6.477 17.567 2 12.044 2H12Z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/karim-doueik-6a9b30252/",
                  label: "LinkedIn",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.94 5C6.94 5.99 6.19 6.79 5.25 6.79C4.31 6.79 3.56 5.99 3.56 5C3.56 4.01 4.31 3.21 5.25 3.21C6.19 3.21 6.94 4.01 6.94 5ZM7 8.51H3.5V21H7V8.51ZM13.32 8.51H9.87V21H13.32V14.36C13.32 10.82 18.25 10.54 18.25 14.36V21H21.75V13.19C21.75 6.9 14.37 7.14 13.32 10.16V8.51Z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/karimdoueik",
                  label: "Instagram",
                  icon: (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                    p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 
                    hover:text-white hover:bg-white/10 hover:scale-110 hover:-translate-y-1
                    transition-all duration-300
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-dark-violet-600/20 to-accent-600/20 rounded-3xl blur-2xl -z-10" />

          <div className="bg-[#0d0a14]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-8">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl 
                      focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50 
                      text-white placeholder-gray-500 transition-all duration-300
                    "
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="
                      w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl 
                      focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50 
                      text-white placeholder-gray-500 transition-all duration-300
                    "
                    placeholder="Email Address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="
                    w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl 
                    focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50 
                    text-white placeholder-gray-500 transition-all duration-300
                  "
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="
                    w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl 
                    focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/50 
                    text-white placeholder-gray-500 transition-all duration-300 resize-none
                  "
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`
                  w-full inline-flex items-center justify-center px-8 py-4 
                  bg-gradient-to-r from-accent-600 to-dark-violet-600 
                  text-white font-bold tracking-wide rounded-xl shadow-lg 
                  transform transition-all duration-300 
                  ${
                    submitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:shadow-accent-500/25 hover:scale-[1.02] active:scale-[0.98]"
                  }
                `}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </span>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
