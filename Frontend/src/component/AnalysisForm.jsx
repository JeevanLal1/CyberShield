import React, { useState } from "react";
import { Upload, Send } from "lucide-react";
import { motion } from "framer-motion";

const AnalysisForm = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze for cyberbullying content..."
          className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <div className="absolute right-4 bottom-4">
          <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Upload className="w-5 h-5" />
            <input type="file" className="hidden" accept=".txt" onChange={handleFileUpload} />
          </motion.label>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading || !text.trim()}
        className={`w-full py-3 px-6 flex items-center justify-center space-x-2
                   rounded-lg text-white font-medium
                   ${isLoading ? "bg-gray-400" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"}
                   transition-all duration-200 ease-in-out
                   disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Send className="w-5 h-5" />
        <span>{isLoading ? "Analyzing..." : "Analyze Text"}</span>
      </motion.button>
    </form>
  );
};

export default AnalysisForm;
