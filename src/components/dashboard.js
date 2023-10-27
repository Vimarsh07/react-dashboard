import React, { useState } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
    const [softwareCostFile, setSoftwareCostFile] = useState(null);
    const [locComplexityFile, setLocComplexityFile] = useState(null);
    const [defectRateFile, setDefectRateFile] = useState(null);

    const [softwareCostOutput, setSoftwareCostOutput] = useState("");
    const [locComplexityOutput, setLocComplexityOutput] = useState("");
    const [defectRateOutput, setDefectRateOutput] = useState("");

    const handleUpload = async (modelType) => {
        let formData = new FormData();
        let file;
        let endpoint;
        
        switch(modelType) {
            case 'softwareCost':
                file = softwareCostFile;
                endpoint = 'http://localhost:5000/predict-software-cost';
                break;
            case 'locComplexity':
                file = locComplexityFile;
                endpoint = 'http://localhost:5000/predict-loc-complexity';
                break;
            case 'defectRate':
                file = defectRateFile;
                endpoint = 'http://localhost:5000/predict-defect-rate';
                break;
            default:
                return;
        }

        formData.append('file', file);

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            switch(modelType) {
                case 'softwareCost':
                    setSoftwareCostOutput(response.data.prediction);
                    break;
                case 'locComplexity':
                    setLocComplexityOutput(response.data.prediction);
                    break;
                case 'defectRate':
                    setDefectRateOutput(`Predicted Defect Rate: ${response.data.defectRate}. Predicted Cost to Solve Defects: $${response.data.costToSolve}`);
                    break;
                default:
                    return;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="dashboard">
            <div>
                <h2>Software Cost Prediction</h2>
                <input type="file" onChange={e => setSoftwareCostFile(e.target.files[0])} />
                <button onClick={() => handleUpload('softwareCost')}>Upload & Predict</button>
                <div>Output: {softwareCostOutput}</div>
            </div>

            <div>
                <h2>LOC & Code Complexity Prediction</h2>
                <input type="file" onChange={e => setLocComplexityFile(e.target.files[0])} />
                <button onClick={() => handleUpload('locComplexity')}>Upload & Predict</button>
                <div>Output: {locComplexityOutput}</div>
            </div>

            <div>
                <h2>Defect Rate & Cost Prediction</h2>
                <input type="file" onChange={e => setDefectRateFile(e.target.files[0])} />
                <button onClick={() => handleUpload('defectRate')}>Upload & Predict</button>
                <div>Output: {defectRateOutput}</div>
            </div>
        </div>
    );
}

export default Dashboard;
