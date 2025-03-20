import React from "react";
import { Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Detect Cyberbullying</span>
                  <span className="block text-indigo-600 dark:text-indigo-400">
                    Instantly with AI
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Protect yourself and others from online harassment with our
                  advanced AI-powered detection system.
                </p>
              </motion.div>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    Try Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </div>

             
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
