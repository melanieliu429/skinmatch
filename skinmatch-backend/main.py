from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io

# Create FastAPI app
app = FastAPI()

# Enable CORS middleware to allow communication with frontend (running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend to communicate with backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Load your pre-trained skin disease classification model
model = load_model("skin_disease_classifier.h5")

# Helper function for preprocessing image
def preprocess_image(image: Image.Image) -> np.ndarray:
    image = image.resize((224, 224))  # Resize to model's expected input size
    image = np.array(image) / 255.0  # Normalize image values to [0, 1]
    image = np.expand_dims(image, axis=0)  # Add batch dimension (1, 224, 224, 3)
    return image

# Route to classify skin image
@app.post("/classify")
async def classify_skin(image: UploadFile = File(...)):
    # Read the image from the request
    img = Image.open(io.BytesIO(await image.read()))

    # Preprocess the image
    processed_image = preprocess_image(img)

    # Make the prediction using the loaded model
    prediction = model.predict(processed_image)
    predicted_label = np.argmax(prediction)  # Get the predicted class label

    # Return the prediction and some dummy product recommendations
    return JSONResponse({
        "skin_condition": str(predicted_label),
        "recommendations": ["Product A", "Product B"]  # Replace with actual recommendations
    })

# Optional root route for testing
@app.get("/")
def read_root():
    return {"message": "Welcome to the Skin Disease Classifier API"}
