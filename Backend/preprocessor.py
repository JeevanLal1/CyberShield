import nltk
nltk.download('punkt')
nltk.download('punkt_tab')
from nltk.tokenize import word_tokenize

def preprocess_text(text):
    # Lowercase and tokenize
    tokens = word_tokenize(text.lower())

    # Remove stopwords and punctuation, then lemmatize
    lemmatized = [
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in stop_words and word not in string.punctuation
    ]
    return " ".join(lemmatized)