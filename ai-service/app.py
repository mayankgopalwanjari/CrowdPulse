from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/predict_queue', methods=['POST'])
def predict_queue():
    data = request.json
    current_length = data.get("currentQueueLength", 100)
    service_rate = data.get("serviceRate", 10) # pax per minute
    
    # An overly simplified prediction model for hackathon purposes
    # Real implementation would use historical venue data & density maps
    predicted_wait = current_length / (service_rate + 0.1)
    
    # Influx prediction
    trend_influx = random.choice([True, False])
    if trend_influx:
       predicted_wait *= 1.2
       
    return jsonify({
        "predictedWaitTimeMins": int(predicted_wait),
        "anomalyDetected": predicted_wait > 30,
        "confidenceScore": 0.82
    })

@app.route('/density_risk', methods=['POST'])
def density_risk():
    # Model stub for analyzing CCV/WiFi mesh density maps
    return jsonify({"riskScore": random.randint(10, 95), "bottleneckZone": "Concourse 2"})

if __name__ == '__main__':
    app.run(port=5000)
