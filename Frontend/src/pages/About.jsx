import React from "react";
import { Shield, Brain, Users, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Advanced Protection",
    description:
      "Our system uses state-of-the-art AI models to detect and prevent cyberbullying in real-time.",
  },
  {
    icon: Brain,
    title: "Multiple AI Models",
    description:
      "Choose from various specialized models optimized for different types of content and contexts.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description:
      "Built with input from cyberbullying prevention experts and community moderators.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "All analysis is performed securely, with strict data protection and user privacy measures.",
  },
];

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About CyberShield
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're dedicated to creating safer online spaces through advanced AI-powered cyberbullying detection.
          Our mission is to protect users and promote positive digital interactions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <feature.icon size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900/20 rounded-2xl p-8 mb-16 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Technology & Approach
        </h2>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          
          <p className="text-gray-600 dark:text-gray-300">
            Our cyberbullying detection system leverages Natural Language Processing (NLP) and 
            Machine Learning to analyze and classify online text content. 
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Algorithm & Methodology
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <span className="font-medium text-gray-900 dark:text-white">Data Preprocessing:</span> 
                Tokenization, text normalization, stopword removal, and lemmatization for 
                better text representation.
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">Feature Extraction:</span> 
                Sentiment analysis and vectorization using TF-IDF (Term Frequency-Inverse Document Frequency)
                and word embeddings.
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">Model Training:</span> 
                Implementation of Logistic Regression ,SVM and Random Forest trained on cyberbullying datasets for 
                contextual understanding.
              </li>
              <li>
                <span className="font-medium text-gray-900 dark:text-white">Classification & Confidence Scoring:</span> 
                Machine learning classifiers predict whether the text is harmful or safe, providing a confidence score.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Key Features
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Real-time analysis of messages to detect cyberbullying threats.</li>
              <li>Confidence-based classification to indicate the severity of harmful content.</li>
              <li>Adaptive learning system that evolves with new data trends.</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;
