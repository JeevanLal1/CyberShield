import nltk
import re
import pickle
import numpy as np
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Download required NLTK data
nltk.download("stopwords")
nltk.download("wordnet")
nltk.download("punkt")

# Initialize stopwords and lemmatizer
stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

def preprocess_text(text, model):
    """Preprocess text for traditional ML models (Not used for LSTM)."""

    # Convert NumPy array to string if necessary
    if isinstance(text, np.ndarray):
        text = str(text[0])  # Convert array to string if needed

    if not isinstance(text, str):
        raise ValueError("Input text must be a string")  # Prevent further errors

    # Only apply text cleaning for ML models (LSTM uses raw text)
    text = re.sub(r"[^a-z\s]", "", text.lower())  # Remove special characters and lowercase
    text = text.strip()
    tokens = word_tokenize(text)  # Tokenize text
    lemmatized = [
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in stop_words  # Remove stopwords
    ]
    return " ".join(lemmatized)  # Return cleaned text for ML models
