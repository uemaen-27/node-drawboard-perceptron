import React, { useState, useRef } from 'react';
import DrawingBoard from './DrawingBoard';
import { saveAs } from 'file-saver';
import { useNavigate } from 'react-router-dom';
import { usePerceptron } from '../perceptron/PerceptrionContext';

const TrainPage: React.FC = () => {
    const [drawing, setDrawing] = useState<number[][] | null>(null);
    const [target, setTarget] = useState<number>(Math.floor(Math.random() * 10));
    const drawingBoardRef = useRef<{ reset: () => void }>(null);
    const { perceptron, setPerceptron } = usePerceptron();
    const navigate = useNavigate();

    const handleDraw = (board: number[][]) => {
        setDrawing(board);
    };

    const trainPerceptron = () => {
        if (!drawing) {
            console.error('Kein Zeichen vorhanden');
            return;
        }

        let currentPerceptron = perceptron;

        setTarget(Math.floor(Math.random() * 10));
        const flattenedDrawing = drawing.flat();

        const targetVector = Array(10).fill(-1);
        targetVector[target] = 1;

        currentPerceptron.train(flattenedDrawing, targetVector, 0.1);

        resetTarget();
    };

    const savePerceptronWeights = () => {
        const weightsAndBias = perceptron.getWeightsAndBias();
        const json = JSON.stringify(weightsAndBias);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, 'perceptron_weights.json');
    };

    const resetTarget = () => {
        setTarget(Math.floor(Math.random() * 10));
        drawingBoardRef.current?.reset();
    }

    return (
        <div>
            <h2>Trainingsseite</h2>
            <div>
                <h3>Zufällig generiertes Ziel:</h3>
                <p>{target}</p>
            </div>
            <DrawingBoard ref={drawingBoardRef} onDraw={handleDraw} />
            <button onClick={trainPerceptron}>Tranieren</button>
            <button onClick={savePerceptronWeights}>Gewichte Speichern</button>
            <button onClick={resetTarget}>Reset</button>
        </div>
    );
};

export default TrainPage;
