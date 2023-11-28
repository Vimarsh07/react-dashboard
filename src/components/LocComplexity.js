import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LocComplexity.css'; // CSS file for LOC Complexity

function LocComplexity() {
    const [locComplexityFile, setLocComplexityFile] = useState(null);
    const [locComplexityOutput, setLocComplexityOutput] = useState("");
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append('file', locComplexityFile);

        try {
            const response = await axios.post('http://localhost:5000/predict-loc-complexity', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLocComplexityOutput(`Predicted Lines of Code: ${response.data.predictedLOC}. Predicted Code Complexity: ${response.data.codeComplexity}`);
            setImageData(response.data.plotImage);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleBack = () => {
        navigate('/select-metric');
    };

    return (
        <div className="loc-complexity">
            <div className="card">
                <h2>LOC & Code Complexity Prediction</h2>
                <div className="instructions">
                    <p>1. Upload the file you want to measure for LOC & Code Complexity.</p>
                    <p>2. Click on "Upload & Predict".</p>
                    <p>3. Wait for the Output.</p>
                </div>
                <input type="file" onChange={e => setLocComplexityFile(e.target.files[0])} />
                <button onClick={handleUpload}>Upload & Predict</button>
                <div className="output">
                    {locComplexityOutput && <p>Output: {locComplexityOutput}</p>}
                    {imageData && <img src={`data:image/png;base64,${imageData}`} alt="Plot" />}
                </div>
                <button onClick={handleBack}>Back to Metric Selection</button>
            </div>
            
        </div>
    );
}

export default LocComplexity;
