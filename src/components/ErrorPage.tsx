import React from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, ArrowLeft, AlertTriangle } from 'lucide-react';
import Typography from '@mui/material/Typography';

interface ErrorPageProps {
  errorCode?: string;
  errorMessage?: string;
  showBackButton?: boolean;
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = '404',
  errorMessage = 'Page Not Found',
  showBackButton = true,
  onRetry,
}) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-violet-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-dark-violet-500/5 rounded-full blur-2xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-purple-400/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl space-y-6">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-xl rounded-full" />
            <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 rounded-full">
              <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Error Code */}
        <Typography
          component="h1"
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent leading-none"
        >
          {errorCode}
        </Typography>

        {/* Error Message */}
        <div className="px-4">
          <Typography variant="h4" className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mb-2">
            {errorMessage}
          </Typography>
          <Typography variant="body1" className="text-gray-300 max-w-md mx-auto leading-relaxed">
            {errorCode === '404'
              ? "The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL."
              : 'Something went wrong. Please try again or contact support if the problem persists.'}
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={handleGoHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/25 hover:shadow-xl transition"
          >
            <Home className="h-5 w-5" />
            <span>Go Home</span>
          </motion.button>

          {showBackButton && (
            <motion.button
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-violet-800/50 border border-dark-violet-500/50 text-white font-semibold rounded-full hover:bg-dark-violet-700/60 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </motion.button>
          )}

          {onRetry && (
            <motion.button
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-violet-800/50 border border-dark-violet-500/50 text-white font-semibold rounded-full hover:bg-dark-violet-700/60 transition"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </motion.button>
          )}
        </div>

        {/* Additional Help */}
        <div className="pt-6 border-t border-dark-violet-800/50">
          <Typography variant="body2" className="text-gray-400 mb-2">
            Need help? Contact me directly:
          </Typography>
          <a
            href="mailto:karimdoueik9@gmail.com"
            className="text-purple-400 hover:text-purple-300 transition break-all"
          >
            karimdoueik9@gmail.com
          </a>
        </div>
      </div>

      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(157, 78, 221, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
};

export default ErrorPage;
