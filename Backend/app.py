from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import numpy as np
from preprocessor import preprocess_text

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load vectorizer (common for all models)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Load all models
models = {
    "logistic_regression": joblib.load("cyberbully_model.pkl"),
    "svm": joblib.load("svm_model.pkl"),
    "random_forest": joblib.load("random_forest_model.pkl"),
}

@app.route('/')
def home():
    return "Cyberbullying Detection API is running!"

@app.route('/dashboard', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate input
        if not data or "text" not in data or "model" not in data:
            return jsonify({"error": "Invalid input. Provide 'text' and 'model' fields."}), 400

        text = data["text"]
        selected_model = data["model"]
        text = preprocess_text(data["text"],selected_model)
        print(text)
        

        print(f"Received text: {text}, Model: {selected_model}")  # Debugging

        # Validate model selection
        if selected_model not in models:
            return jsonify({"error": "Invalid model selected. Choose from 'logistic_regression', 'svm', or 'random_forest'."}), 400

        model = models[selected_model]  # Load the selected model

        # Preprocess text
        text_vectorized = vectorizer.transform([text])

        # Make prediction
        prediction = model.predict(text_vectorized)
        if len(prediction) == 0:
            return jsonify({"error": "Model failed to make a prediction."}), 500
        
        prediction_int = int(prediction[0])  # Convert to integer (0 or 1)

        # Handle probability scores safely
        confidence_score = None
        if hasattr(model, "predict_proba"):  # Check if model supports probability
            confidence = model.predict_proba(text_vectorized)[0]  # Probability scores
            confidence_score = round(float(np.max(confidence)) * 100, 2)

        print(f"Flask Prediction: {prediction_int}, Confidence: {confidence_score}%")  # Debugging

        return jsonify({
            "prediction": prediction_int,  # 0 or 1
            "confidence": confidence_score,
            "model": selected_model
        })

    except Exception as e:
        print(f"Error: {str(e)}")  # Log errors for debugging
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
