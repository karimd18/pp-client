import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const FORM_SUBMIT_EMAIL = "karimdoueik9@gmail.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_SUBMIT_EMAIL)}`;
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,      // reply-to address
          subject: formData.subject,  // email subject
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

      setNotification({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setNotification({
        type: "error",
        message: err?.message || "Failed to send message. Please try again in a moment.",
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
      className="w-full min-h-screen bg-gradient-to-b from-dark-violet-900 to-black py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* ====== GLOBAL OVER-NAVBAR TOAST (top-right) VIA PORTAL ====== */}
      <ToastPortal>
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              // Global fixed top-right with safe-area support
              style={{
                position: "fixed",
                top: "max(env(safe-area-inset-top, 0px), 14px)",
                right: "max(env(safe-area-inset-right, 0px), 14px)",
              }}
              className="z-[9999] w-[92vw] max-w-md"
              role="status"
              aria-live="polite"
            >
              <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
                <div className="relative overflow-hidden rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10">
                  {/* soft glow accents */}
                  <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-3xl" />

                  <div className="relative flex items-start gap-3 px-4 py-4">
                    {/* Icon bubble */}
                    <div
                      className={`shrink-0 grid place-items-center h-10 w-10 rounded-xl ${
                        notification.type === "success"
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                          : "bg-gradient-to-br from-rose-500 to-rose-700"
                      } text-white`}
                      aria-hidden
                    >
                      {notification.type === "success" ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 8v5m0 3h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21 18L12 3 3 18h18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/90 font-semibold">
                        {notification.type === "success" ? "Success" : "Something went wrong"}
                      </p>
                      <p className="text-sm text-gray-300 mt-0.5">{notification.message}</p>
                    </div>

                    {/* Close */}
                    <button
                      onClick={() => setNotification(null)}
                      className="ml-2 rounded-lg p-2 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
                      aria-label="Dismiss notification"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Loader bar: violet → dark */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: NOTIF_DURATION_MS / 1000, ease: "linear" }}
                    className="h-1 bg-gradient-to-r from-violet-500 to-black"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ToastPortal>
      {/* ====== /GLOBAL TOAST ====== */}

      {/* Section Header */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center mb-16"
      >
        <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4" variants={itemVariants}>
          Get In <span className="heading-gradient">Touch</span>
        </motion.h2>
        <motion.p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg" variants={itemVariants}>
          Have a project in mind or want to collaborate? Feel free to reach out!
        </motion.p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Info + Socials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                  <p className="text-gray-300">karimdoueik9@gmail.com</p>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Phone</h4>
                  <p className="text-gray-300">+961 78 896 067</p>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-1">Location</h4>
                  <p className="text-gray-300">Lebanon</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold text-white mb-4">Connect With Me</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/karimd18"
                aria-label="GitHub"
                className="bg-dark-violet-800/50 hover:bg-dark-violet-700/70 p-3 rounded-lg transition-colors duration-300"
              >
                {/* GitHub Icon */}
                <svg
                  className="h-6 w-6 text-dark-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.582 9.5 21.27 9.5 21.007V19.345C6.708 19.99 6.142 18.127 6.142 18.127C5.694 16.983 5.028 16.67 5.028 16.67C4.103 16.034 5.097 16.047 5.097 16.047C6.122 16.119 6.666 17.1 6.666 17.1C7.584 18.669 9.093 18.175 9.541 17.919C9.633 17.262 9.895 16.769 10.196 16.471C7.945 16.171 5.584 15.311 5.584 11.473C5.584 10.385 6.001 9.487 6.686 8.787C6.58 8.537 6.216 7.541 6.786 6.162C6.786 6.162 7.65 5.897 9.499 7.197C10.301 6.976 11.15 6.866 11.999 6.864C12.848 6.866 13.697 6.976 14.499 7.197C16.348 5.897 17.212 6.162 17.212 6.162C17.782 7.541 17.418 8.537 17.312 8.787C17.997 9.487 18.414 10.385 18.414 11.473C18.414 15.321 16.049 16.17 13.791 16.467C14.176 16.836 14.539 17.57 14.539 18.703V21.007C14.539 21.271 14.699 21.585 15.208 21.488C19.179 20.165 22.044 16.418 22.044 12C22.044 6.477 17.567 2 12.044 2H12Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/karim-doueik-6a9b30252/"
                aria-label="LinkedIn"
                className="bg-dark-violet-800/50 hover:bg-dark-violet-700/70 p-3 rounded-lg transition-colors duration-300"
              >
                {/* LinkedIn Icon */}
                <svg
                  className="h-6 w-6 text-dark-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.94 5C6.94 5.99 6.19 6.79 5.25 6.79C4.31 6.79 3.56 5.99 3.56 5C3.56 4.01 4.31 3.21 5.25 3.21C6.19 3.21 6.94 4.01 6.94 5ZM7 8.51H3.5V21H7V8.51ZM13.32 8.51H9.87V21H13.32V14.36C13.32 10.82 18.25 10.54 18.25 14.36V21H21.75V13.19C21.75 6.9 14.37 7.14 13.32 10.16V8.51Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/karimdoueik"
                aria-label="Instagram"
                className="bg-dark-violet-800/50 hover:bg-dark-violet-700/70 p-3 rounded-lg transition-colors duration-300"
              >
                {/* Instagram Icon */}
                <svg
                  className="h-6 w-6 text-dark-violet-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div variants={itemVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-violet-900/30 border border-dark-violet-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-violet-900/30 border border-dark-violet-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your Email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-violet-900/30 border border-dark-violet-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-dark-violet-900/30 border border-dark-violet-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                placeholder="Your Message"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg transition-all duration-300 ${
                submitting ? "opacity-60 cursor-not-allowed" : "hover:shadow-2xl"
              }`}
            >
              <Send className="mr-2 h-5 w-5" />
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
