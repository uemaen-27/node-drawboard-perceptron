import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PerceptronProvider } from './perceptron/PerceptrionContext';
import PredictPage from './sites/PredictPage';
import TrainPage from './sites/TrainPage';

const App: React.FC = () => {
    return (
        <PerceptronProvider>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Vorhersageseite</Link>
                        </li>
                        <li>
                            <Link to="/train">Trainingsseite</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<PredictPage />} />
                    <Route path="/train" element={<TrainPage />} />
                    <Route path="/predict" element={<PredictPage />} />
                </Routes>
            </Router>
        </PerceptronProvider>
    );
};

export default App;
