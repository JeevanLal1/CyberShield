import React from "react";

const ModelSelector = ({ model, setModel }) => {
  return (
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
  );
};

export default ModelSelector;
