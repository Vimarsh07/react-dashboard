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

    
    const [locComplexityImage, setLocComplexityImage] = useState("");
    const [defectRateImage, setDefectRateImage] = useState("");

    const [activeSlide, setActiveSlide] = useState(0); // Carousel state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
        };

        formData.append('file', file);

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            switch(modelType) {
                case 'softwareCost':
                    setSoftwareCostOutput(`Predicted Software Cost: $${response.data.softwareCost}`);
                    
                    break;
                case 'locComplexity':
                    setLocComplexityOutput(`Predicted Lines of Code: ${response.data.predictedLOC}. Predicted Code Complexity: ${response.data.codeComplexity}`);
                    setLocComplexityImage(`data:image/png;base64,${response.data.plotImage}`);
                    break;
                case 'defectRate':
                    setDefectRateOutput(`Predicted Defect Rate: ${response.data.defectRate}. Predicted Cost to Solve Defects: $${response.data.costToSolve}`);
                    setDefectRateImage(`data:image/png;base64,${response.data.plotImage}`);
                    break;
                default:
                    return;
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const slides = [
        {
            title: "Software Cost Prediction",
            fileSetter: setSoftwareCostFile,
            uploadHandler: () => handleUpload('softwareCost'),
            output: softwareCostOutput
            
        },
        {
            title: "LOC & Code Complexity Prediction",
            fileSetter: setLocComplexityFile,
            uploadHandler: () => handleUpload('locComplexity'),
            output: locComplexityOutput,
            image: locComplexityImage
        },
        {
            title: "Defect Rate & Cost Prediction",
            fileSetter: setDefectRateFile,
            uploadHandler: () => handleUpload('defectRate'),
            output: defectRateOutput,
            image: defectRateImage
        }
    ];

    return (
        <div className="dashboard">
            <div className="carousel">
                <div className={`slide ${activeSlide === 0 ? "active" : ""}`}>
                    <h2>{slides[activeSlide].title}</h2>
                    <input type="file" onChange={e => slides[activeSlide].fileSetter(e.target.files[0])} />
                    <button onClick={() => { 
                        slides[activeSlide].uploadHandler();
                        setIsModalOpen(true);
                    }}>
                        Upload & Predict
                    </button>
                </div>
            </div>
            {isModalOpen && <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                    <p>Output: {slides[activeSlide].output}</p>
                    {slides[activeSlide].image && <img src={slides[activeSlide].image} alt="Prediction Plot" />}
                </div>
            </div>}
            <div className="carousel-controls">
                <button className="prev" onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}>Previous</button>
                <button className="next" onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}>Next</button>
            </div>
        </div>
    );
}

export default Dashboard;
