import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
import os

# Path to the dataset directory
data_dir = 'skin_diseases_stuff/files'  # Update this to your actual path
image_size = (224, 224)  # Resize images to this size for training
batch_size = 32

# Create an ImageDataGenerator for loading and augmenting images
datagen = ImageDataGenerator(
    rescale=1.0/255,          # Rescale pixel values to [0, 1]
    validation_split=0.2,     # Split 20% of data for validation
    horizontal_flip=True,     # Data augmentation
    zoom_range=0.2            # Random zoom augmentation
)

# Load training and validation data from the 'files' directory
train_generator = datagen.flow_from_directory(
    data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training'  # Training data
)

validation_generator = datagen.flow_from_directory(
    data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation'  # Validation data
)

# Define the CNN model architecture
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=image_size + (3,)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(512, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(train_generator.num_classes, activation='softmax')  # Output layer
])

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(
    train_generator,
    validation_data=validation_generator,
    epochs=10  # Increase the number of epochs for better training
)

# Save the trained model as an .h5 file
model.save('skin_disease_classifier.h5')
print("Model saved as skin_disease_classifier.h5")
