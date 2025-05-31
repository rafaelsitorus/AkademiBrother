from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

# Load the model
model_path = os.path.join(os.path.dirname(__file__), '../app/model/fraud_model.joblib')
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features
        input_data = [
            float(data['patientAge']),
            float(data['claimAmount']),
            len(str(data['procedureCode'])),  # Length of procedure code
            float(data['previousClaims']),
            float(data['daysSinceLastClaim'])
        ]
        
        # Make prediction
        prediction = model.predict([input_data])
        
        # Return prediction
        return jsonify({'fraudulent': bool(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)