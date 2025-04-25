import React, { useState } from 'react';
import DrawingBoard from './DrawingBoard';
import { useNavigate } from 'react-router-dom';
import { usePerceptron } from '../perceptron/PerceptrionContext';
import Perceptron from '../perceptron/Perceptron';

const PredictPage: React.FC = () => {
    const [drawing, setDrawing] = useState<number[][] | null>(null);
    const [prediction, setPrediction] = useState<number | null>(null);
    const { perceptron, setPerceptron } = usePerceptron();
    const navigate = useNavigate();

    const handleDraw = (board: number[][]) => {
        setDrawing(board);
    };

    const handlePredict = () => {
        if (!drawing || !perceptron) {
            console.error('Kein Zeichen vorhanden oder Perzeptron nicht geladen');
            return;
        }

        const flattenedDrawing = drawing.flat();

        const predictionResult = perceptron.predict(flattenedDrawing);
        setPrediction(predictionResult);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result;
                if (text) {
                    const data = JSON.parse(text as string);
                    const { weights, biases } = data;
                    const loadedPerceptron = new Perceptron(16 * 16, 10);
                    loadedPerceptron.setWeightsAndBias(weights, biases);
                    setPerceptron(loadedPerceptron);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h2>Vorhersageseite</h2>
            <input type="file" accept=".json" onChange={handleFileUpload} />
            <DrawingBoard onDraw={handleDraw} />
            <button onClick={handlePredict}>Vorhersage durchführen</button>
            {prediction !== null && (
                <div>
                    <h3>Vorhersage:</h3>
                    <p>{prediction}</p>
                </div>
            )}
            <button onClick={() => navigate('/train')}>Zur Trainingsseite</button>
        </div>
    );
};

export default PredictPage;
