import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DefectRate.css'; // CSS file for Defect Rate

function DefectRate() {
    const [defectRateFile, setDefectRateFile] = useState(null);
    const [defectRateOutput, setDefectRateOutput] = useState("");
    const [imageData, setImageData] = useState(null);

    const navigate = useNavigate();

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append('file', defectRateFile);

        try {
            const response = await axios.post('http://localhost:5000/predict-defect-rate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setDefectRateOutput(`Predicted Defect Rate: ${response.data.defectRate}. Predicted Cost to Solve Defects: $${response.data.costToSolve}`);
            setImageData(response.data.plotImage);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleBack = () => {
        navigate('/select-metric');
    };

    return (
        <div className="defect-rate">
            <div className="card">
                <h2>Defect Rate & Cost Prediction</h2>
                <div className="instructions">
                    <p>1. Upload the file you want to measure for Defect Rate & Cost.</p>
                    <p>2. Click on "Upload & Predict".</p>
                    <p>3. Wait for the Output.</p>
                </div>
                <input type="file" onChange={e => setDefectRateFile(e.target.files[0])} />
                <button onClick={handleUpload}>Upload & Predict</button>
                <div className="output">
                    {defectRateOutput && <p>Output: {defectRateOutput}</p>}
                    {imageData && <img src={`data:image/png;base64,${imageData}`} alt="Plot" />}
                </div>
                <button onClick={handleBack}>Back to Metric Selection</button>
            </div>
            
        </div>
    );
}

export default DefectRate;
