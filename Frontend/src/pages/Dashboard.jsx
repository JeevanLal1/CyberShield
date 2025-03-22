import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AnalysisForm from "../component/AnalysisForm";
import ResultDisplay from "../component/ResultDisplay";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedModel, setSelectedModel] = useState("logistic_regression"); // Default model

  const handleSubmit = async (text) => {
    setIsLoading(true);

    if (!text.trim()) {
      setResult({ prediction: null, confidence: 0, status: "❌ Please enter some text." });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/dashboard", {
        text,
        model: selectedModel, // Send selected model to backend
      });

      const { prediction, confidence, model } = response.data || {};

      if (typeof prediction !== "number" || typeof confidence !== "number" || isNaN(confidence)) {
        throw new Error("Invalid response from server");
      }

      setResult({
        prediction,
        confidence: confidence.toFixed(2),
        model, // Show which model was used
      });
    } catch (error) {
      console.error("Error predicting:", error);
      setResult({ prediction: null, confidence: 0, status: "Error analyzing text" });
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AI-Powered Cyberbullying Detection
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our advanced NLP system analyzes text to identify potential cyberbullying content,
          helping create safer online spaces.
        </p>
      </motion.div>

      {/* Model Selection */}
      <div className="mb-6 text-center">
        <label className="text-lg font-semibold text-gray-900 dark:text-white">Select Model:</label>
        <select
          className="ml-4 p-2 border rounded-lg dark:bg-gray-800 dark:text-white"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="logistic_regression">Logistic Regression</option>
          <option value="svm">SVM</option>
          <option value="random_forest">Random Forest</option>
        </select>
      </div>

      {/* Form and Result Section */}
      <div className="space-y-8">
        <AnalysisForm onSubmit={handleSubmit} isLoading={isLoading} />
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default Dashboard;
