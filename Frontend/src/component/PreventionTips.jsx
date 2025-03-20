import React from "react";
import { Shield, MessageSquare, Users, Lock } from "lucide-react";
import { motion } from "framer-motion";

const PreventionTips = () => {
  const tips = [
    {
      icon: <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Stay Safe Online",
      description:
        "Be cautious about sharing personal information and use privacy settings on social media.",
    },
    {
      icon: (
        <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      ),
      title: "Think Before Posting",
      description:
        "Consider how your words might affect others and avoid harmful language.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Report Harassment",
      description:
        "Don't hesitate to report cyberbullying to platform moderators or authorities.",
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Secure Your Accounts",
      description:
        "Use strong passwords and enable two-factor authentication when possible.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Cyberbullying Prevention Tips
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Protect yourself and others with these essential guidelines
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group bg-white dark:bg-gray-800 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-indigo-50 dark:bg-indigo-900 ring-4 ring-white dark:ring-gray-800">
                    {tip.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {tip.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventionTips;
