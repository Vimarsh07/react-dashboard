// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Dashboard from './components/dashboard';
// import Login from './components/Login';
// import Register from './components/Register';

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
//                     <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
//                     <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                     <Route path="/" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import MetricSelection from './components/MetricSelection';
// import SoftwareCost from './components/SoftwareCost'; // Import SoftwareCost component
// import LocComplexity from './components/LocComplexity'; // Import LocComplexity component
// import DefectRate from './components/DefectRate'; // Import DefectRate component

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     <Route path="/login" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
//                     <Route path="/register" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Register />} />
//                     <Route path="/select-metric" element={isLoggedIn ? <MetricSelection /> : <Navigate to="/login" />} />
//                     <Route path="/software-cost" element={isLoggedIn ? <SoftwareCost /> : <Navigate to="/login" />} />
//                     <Route path="/loc-complexity" element={isLoggedIn ? <LocComplexity /> : <Navigate to="/login" />} />
//                     <Route path="/defect-rate" element={isLoggedIn ? <DefectRate /> : <Navigate to="/login" />} />
//                     <Route path="/" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;


// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import MetricSelection from './components/MetricSelection';
// import SoftwareCost from './components/SoftwareCost'; // Import SoftwareCost component
// import LocComplexity from './components/LocComplexity'; // Import LocComplexity component
// import DefectRate from './components/DefectRate'; // Import DefectRate component

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//         setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//         setIsLoggedIn(false);
//     };

//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     <Route path="/login" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Login onLogin={handleLogin} />} />
//                     <Route path="/register" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Register />} />
//                     <Route path="/select-metric" element={isLoggedIn ? <MetricSelection onLogout={handleLogout} /> : <Navigate to="/login" />} />
//                     <Route path="/software-cost" element={isLoggedIn ? <SoftwareCost /> : <Navigate to="/login" />} />
//                     <Route path="/loc-complexity" element={isLoggedIn ? <LocComplexity /> : <Navigate to="/login" />} />
//                     <Route path="/defect-rate" element={isLoggedIn ? <DefectRate /> : <Navigate to="/login" />} />
//                     <Route path="/" element={<Navigate to="/login" />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import MetricSelection from './components/MetricSelection';
import SoftwareCost from './components/SoftwareCost'; // Import SoftwareCost component
import LocComplexity from './components/LocComplexity'; // Import LocComplexity component
import DefectRate from './components/DefectRate'; // Import DefectRate component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Login onLogin={handleLogin} />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/select-metric" /> : <Register />} />
                    <Route path="/select-metric" element={isLoggedIn ? <MetricSelection onLogout={handleLogout} /> : <Navigate to="/login" />} />
                    <Route path="/software-cost" element={isLoggedIn ? <SoftwareCost /> : <Navigate to="/login" />} />
                    <Route path="/loc-complexity" element={isLoggedIn ? <LocComplexity /> : <Navigate to="/login" />} />
                    <Route path="/defect-rate" element={isLoggedIn ? <DefectRate /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
