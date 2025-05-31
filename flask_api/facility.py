from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model once at startup
try:
    model = joblib.load('../app/model/facility_needs_model.joblib')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {str(e)}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features from request
        medical_history_count = float(data['medicalHistoryCount'])
        doctor_count = float(data['doctorCount'])
        facility_count = float(data['facilityCount'])
        
        # Create a DataFrame for prediction
        input_data = pd.DataFrame({
            'MedicalHistoryCount': [medical_history_count],
            'DoctorCount': [doctor_count],
            'FacilityCount': [facility_count]
        })
        
        # Make prediction
        if model is not None:
            prediction = model.predict(input_data)[0]
            # Round to nearest integer
            prediction = round(prediction)
            return jsonify({'score': prediction})
        else:
            return jsonify({'error': 'Model not loaded'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)