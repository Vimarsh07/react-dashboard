import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MetricSelection.css'; // Make sure you have this CSS file

const MetricSelection = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleSelectMetric = (metricPath) => {
        navigate(metricPath);
    };

    const handleLogout = () => {
        onLogout(); // This will call the logout function passed from App.js
        navigate('/login');
    };

    return (
        <div className="metric-selection-container">
            <h2>Select a Metric</h2>
            <button onClick={() => handleSelectMetric('/software-cost')}>Software Cost Prediction</button>
            <button onClick={() => handleSelectMetric('/loc-complexity')}>LOC & Code Complexity Prediction</button>
            <button onClick={() => handleSelectMetric('/defect-rate')}>Defect Rate & Cost Prediction</button>
            <p className="logout-link" onClick={handleLogout}>Logout</p>
        </div>
    );
};

export default MetricSelection;
