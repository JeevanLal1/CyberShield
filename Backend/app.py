from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

#Load TF-IDF Vectorizer (for ML models)
with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Load Tokenizer (for LSTM model)
with open("tokenizer.pickle", "rb") as f:
    tokenizer = pickle.load(f)

# Load ML and LSTM Models
models = {
    "logistic_regression": joblib.load("logistic_regression.pkl"),
    "svm": joblib.load("svm_model.pkl"),
    "random_forest": joblib.load("random_forest_model.pkl"),
    "lstm": load_model("lstm_model.h5"),  # Load LSTM model
}

# Define sequence length (same as training)
MAX_SEQUENCE_LENGTH = 100  

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

        # Validate model selection
        if selected_model not in models:
            return jsonify({"error": "Invalid model selected"}), 400

        # Ensure text is always a string
        if not isinstance(text, str):
            text = str(text)

        if selected_model == "lstm":
            #  Tokenize and pad text for LSTM (NO STOPWORD REMOVAL OR LEMMATIZATION)
            sequence = tokenizer.texts_to_sequences([text])
            padded_sequence = pad_sequences(sequence, maxlen=MAX_SEQUENCE_LENGTH)

            # Predict using LSTM
            model = models[selected_model]
            prediction = model.predict(padded_sequence)

            # Convert to binary output (0 = non-toxic, 1 = cyberbullying)
            prediction_int = int(prediction[0][0] > 0.5)
            confidence_score = round(float(prediction[0][0]) * 100, 2)  # Convert to percentage

        else:
            # Preprocess and vectorize text for ML models
            from preprocessor import preprocess_text
            text = preprocess_text(text, selected_model)
            text_vectorized = vectorizer.transform([text])

            model = models[selected_model]
            prediction = model.predict(text_vectorized)
            prediction_int = int(prediction[0])

            # Handle probability scores (if model supports it)
            confidence_score = None
            if hasattr(model, "predict_proba"):
                confidence = model.predict_proba(text_vectorized)[0]
                confidence_score = round(float(np.max(confidence)) * 100, 2)

        return jsonify({
            "prediction": prediction_int,
            "confidence": confidence_score,
            "model": selected_model
        })

    except Exception as e:
        print(f"Error: {str(e)}")  # Log errors
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
