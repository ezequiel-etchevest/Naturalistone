from sklearn.linear_model import LinearRegression
import joblib
import numpy as np

def train_and_save_models():
    """
    Trains two models for predicting the number of tiles and slabs that can fit in a container
    based on the thickness of the tiles or slabs. Saves the trained models to disk.
    """
    # Thicknesses of the tiles and slabs in inches
    tile_thickness = np.array([3/4, 1/2, 1.25, 5/8]).reshape(-1, 1)
    slab_thickness = np.array([3/4, 1.25, 1/2]).reshape(-1, 1)

    # Number of tiles and slabs per container
    tile_quantity = np.array([5000, 7000, 4000, 6000])
    slab_quantity = np.array([120, 95, 132])

    # Train the models
    tile_model = LinearRegression()
    tile_model.fit(1/tile_thickness, tile_quantity)
    slab_model = LinearRegression()
    slab_model.fit(1/slab_thickness, slab_quantity)

    # Save the models to disk
    joblib.dump(tile_model, 'tile_model.pkl')
    joblib.dump(slab_model, 'slab_model.pkl')

def predict_quantity(thickness, product_type):
    """
    Predicts the number of tiles or slabs that can fit in a container based on the thickness
    of the tiles or slabs.

    Args:
    thickness: float. The thickness of the tiles or slabs in inches.
    product_type: str. Either 'tile' or 'slab'.

    Returns:
    float. The predicted number of tiles or slabs that can fit in a container.

    Raises:
    ValueError: If product_type is not 'tile' or 'slab'.
    """
    
    product_type = product_type.title()
    
    # Load the appropriate model
    if product_type == 'Tile':
        model = joblib.load('tile_model.pkl')
    elif product_type == 'Slab':
        model = joblib.load('slab_model.pkl')
    else:
        raise ValueError("Invalid product type. Expected 'tile' or 'slab'.")

    # Make the prediction
    thickness = np.array([thickness]).reshape(-1, 1)
    predicted_quantity = model.predict(1/thickness)

    # The prediction is an array, but we only made one prediction, so we take the first element
    return predicted_quantity[0]

# Example usage:
train_and_save_models()
thickness = 1  # For example, 1 inch
product_type = 'tile'  # Or 'slab'
predicted_quantity = predict_quantity(thickness, product_type)
print(f"The predicted quantity for a {product_type} with thickness {thickness} inch is: {predicted_quantity}")
