from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from preprocessor import preprocess_text
# Load the saved model and vectorizer
with open("cyberbully_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("tfidf_vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Initialize Flask app

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/')
def home():
    return "Cyberbullying Detection API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Invalid input"}), 400

        text = preprocess_text(data["text"])
        print(f"Received text: {text}")  # ✅ Debugging

        # Preprocess and predict
        text_vectorized = vectorizer.transform([text])
        prediction = model.predict(text_vectorized)[0]

        print(f"Flask Prediction Sent to Frontend: {prediction}")  # ✅ Debugging

        return jsonify({"prediction": int(prediction)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
