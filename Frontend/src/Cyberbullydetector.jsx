import React, { useState } from "react";
import axios from "axios";

const CyberbullyDetector = () => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState("Logistic Regression");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { text, model });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="absolute top-4 right-4">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
        >
          <option>Logistic Regression</option>
          <option>SVM</option>
          <option>Random Forest</option>
        </select>
      </div>

      <div className="bg-gray-800 shadow-xl rounded-lg p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">
          🚀 Cyberbully Detector
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-lg"
          >
            Check for Cyberbullying
          </button>
        </form>

        {prediction !== null && (
          <div
            className={`mt-4 text-lg font-semibold text-center p-2 rounded-md ${
              prediction === 1
                ? "bg-red-500 text-white shadow-lg"
                : "bg-green-500 text-white shadow-lg"
            }`}
          >
            {prediction === 1 ? "🚨 Bully Message Detected!" : "✅ No Bully Content"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberbullyDetector;
