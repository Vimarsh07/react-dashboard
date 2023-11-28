import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/dashboard';
import Login from './components/Login'; // Import the Login component

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to keep track of login status

    return (
        <div className="App">
            {isLoggedIn ? (
                <>
                    <h1>ML Model Dashboard</h1>
                    <Dashboard />
                </>
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )}
        </div>
    );
}

export default App;
