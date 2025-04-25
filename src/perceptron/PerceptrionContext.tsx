import React, { createContext, useContext, useState, ReactNode } from 'react';
import Perceptron from './Perceptron';

interface PerceptronContextProps {
    perceptron: Perceptron;
    setPerceptron: (perceptron: Perceptron) => void;
}

const PerceptronContext = createContext<PerceptronContextProps | undefined>(undefined);

export const usePerceptron = () => {
    const context = useContext(PerceptronContext);
    if (!context) {
        throw new Error('usePerceptron must be used within a PerceptronProvider');
    }
    return context;
};

interface PerceptronProviderProps {
    children: ReactNode;
}

export const PerceptronProvider: React.FC<PerceptronProviderProps> = ({ children }) => {
    const [perceptron, setPerceptron] = useState<Perceptron>(new Perceptron(16 * 16, 10));

    return (
        <PerceptronContext.Provider value={{ perceptron, setPerceptron }}>
            {children}
        </PerceptronContext.Provider>
    );
};
