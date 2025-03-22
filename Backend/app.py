from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from preprocessor import preprocess_text

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load vectorizer (common for all models)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Load all models
models = {
    "logistic_regression": pickle.load(open("cyberbully_model.pkl", "rb")),
    "svm": pickle.load(open("cyberbully_model_svm.pkl", "rb")),
    "random_forest": pickle.load(open("random_forest_model.pkl", "rb")),
}

@app.route('/')
def home():
    return "Cyberbullying Detection API is running!"

@app.route('/dashboard', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Check if input text and model are provided
        if not data or "text" not in data or "model" not in data:
            return jsonify({"error": "Invalid input"}), 400

        text = preprocess_text(data["text"])
        print(text)
        selected_model = data["model"]

        print(f"Received text: {text}, Model: {selected_model}")  #  Debugging

        # Validate model choice
        if selected_model not in models:
            return jsonify({"error": "Invalid model selected"}), 400
        
        model = models[selected_model]  # Load the selected model


        # Preprocess and predict
        text_vectorized = vectorizer.transform([text])
        prediction = model.predict(text_vectorized)[0]  # 0 = Safe, 1 = Cyberbullying
        confidence = model.predict_proba(text_vectorized)[0]  # Probability scores

        # Extract confidence score for the predicted class
        confidence_score = round(float(np.max(confidence)) * 100, 2)

        print(f"Flask Prediction: {prediction}, Confidence: {confidence_score}%")  #  Debugging

        return jsonify({
            "prediction": int(prediction),  # 0 or 1
            "confidence": confidence_score,
            "model": selected_model
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
