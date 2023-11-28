// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './SoftwareCost.css'; // You'll need to create a corresponding CSS file

// function SoftwareCost() {
//     const [softwareCostFile, setSoftwareCostFile] = useState(null);
//     const [softwareCostOutput, setSoftwareCostOutput] = useState("");
//     const navigate = useNavigate();

//     const handleUpload = async () => {
//         let formData = new FormData();
//         formData.append('file', softwareCostFile);

//         try {
//             const response = await axios.post('http://localhost:5000/predict-software-cost', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setSoftwareCostOutput(response.data.prediction);
//         } catch (error) {
//             console.error("Error uploading file:", error);
//         }
//     };

//     const handleBack = () => {
//         navigate('/select-metric');
//     };

//     return (
//         <div className="software-cost">
//             <h2>Software Cost Prediction</h2>
//             <input type="file" onChange={e => setSoftwareCostFile(e.target.files[0])} />
//             <button onClick={handleUpload}>Upload & Predict</button>
//             <div className="output">
//                 {softwareCostOutput && <p>Output: {softwareCostOutput}</p>}
//             </div>
//             <button onClick={handleBack}>Back to Metric Selection</button>
//         </div>
//     );
// }

// export default SoftwareCost;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SoftwareCost.css';

function SoftwareCost() {
    const [softwareCostFile, setSoftwareCostFile] = useState(null);
    const [softwareCostOutput, setSoftwareCostOutput] = useState("");
    const navigate = useNavigate();

    const handleUpload = async () => {
        let formData = new FormData();
        formData.append('file', softwareCostFile);

        try {
            const response = await axios.post('http://localhost:5000/predict-software-cost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSoftwareCostOutput(`Predicted Software Cost: $${response.data.softwareCost}`);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleBack = () => {
        navigate('/select-metric');
    };

    return (
        <div className="software-cost">
            <div className="card">
            <h2>Software Cost Prediction</h2>
            <div className="instructions">
                <p>1. Upload the file you want to measure the software metric of.</p>
                <p>2. Click on "Upload & Predict".</p>
                <p>3. Wait for the Output.</p>
            </div>
            <input type="file" onChange={e => setSoftwareCostFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload & Predict</button>
            <div className="output">
                {softwareCostOutput && <p>Output: {softwareCostOutput}</p>}
            </div>
            <button onClick={handleBack}>Back to Metric Selection</button>
        </div>
        </div>
    );
}

export default SoftwareCost;
