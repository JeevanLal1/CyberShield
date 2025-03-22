import nltk
import re
from nltk.stem import WordNetLemmatizer
nltk.download('punkt')
nltk.download('punkt_tab')
from nltk.corpus import stopwords
nltk.download('stopwords')
from nltk.tokenize import word_tokenize


stop_words=stopwords.words('english')
lemmatizer=WordNetLemmatizer()
def preprocess_text(text):
    text = re.sub(r'[^a-z\s]', '', text)
    text = text.strip()
    tokens = word_tokenize(text.lower())
    lemmatized = [
        lemmatizer.lemmatize(word)
        for word in tokens
        if word not in stop_words 
    ]
    return " ".join(lemmatized)