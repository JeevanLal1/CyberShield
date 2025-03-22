import React from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ResultDisplay = ({ result }) => {
  if (!result) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-900 dark:text-white">No result available.</p>
      </div>
    );
  }

  // Ensure confidence is a valid number
  const confidence = parseFloat(result.confidence) || 0;
  const isBully = result.prediction === 1;

  // Explanation message
  const explanation = isBully
    ? "This message contains words or patterns commonly associated with cyberbullying."
    : "No harmful content detected. This message appears safe.";

  // Bar chart data (adjust values based on prediction)
  const data = isBully
  ? [
      { name: "Safe Content", value: parseFloat((100 - confidence).toFixed(2)), color: "#10B981" },
      { name: "Harmful Content", value: parseFloat(confidence.toFixed(2)), color: "#EF4444" },
    ]
  : [
      { name: "Safe Content", value: parseFloat(confidence.toFixed(2)), color: "#10B981" },
      { name: "Harmful Content", value: parseFloat((100 - confidence).toFixed(2)), color: "#EF4444" },
    ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex items-center justify-center mb-6">
        {isBully ? (
          <AlertTriangle className="w-12 h-12 text-red-500" />
        ) : (
          <Shield className="w-12 h-12 text-green-500" />
        )}
      </div>

      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        {isBully ? "🚨 Cyberbullying Detected!" : "✅ Safe Message"}
      </h2>

      <div className="mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Analysis Results
          </h3>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                isBully ? "bg-red-500" : "bg-green-500"
              }`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Confidence: {confidence.toFixed(2)}%
          </p>
        </div>

        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Detailed Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{explanation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultDisplay;
