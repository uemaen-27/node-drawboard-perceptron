class Perceptron {
    inputSize: number;
    outputSize: number;
    weights: number[][];
    biases: number[];

    constructor(inputSize: number, outputSize: number) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.weights = Array.from({ length: outputSize }, () =>
            Array.from({ length: inputSize }, () => Math.random() * 2 - 1)
        );
        this.biases = Array.from({ length: outputSize }, () => Math.random() * 2 - 1);
    }

    activation(x: number): number {
        return x >= 0 ? 1 : -1;
    }

    softmax(x: number[]): number[] {
        const max = Math.max(...x); // für numerische Stabilität
        const exps = x.map(value => Math.exp(value - max));
        const sumExps = exps.reduce((acc, value) => acc + value, 0);
        return exps.map(value => value / sumExps);
    }

    predict(inputs: number[]): number {
        const outputs = this.weights.map((weights, index) => {
            const sum = weights.reduce((acc, weight, i) => acc + weight * inputs[i], this.biases[index]);
            return this.activation(sum);
        });

        return outputs.indexOf(Math.max(...outputs));
    }

    train(inputs: number[], targets: number[], learningRate: number): void {
        targets.forEach((target, index) => {
            const sum = this.weights[index].reduce((acc, weight, i) => acc + weight * inputs[i], this.biases[index]);
            const prediction = this.activation(sum);
            const error = target - prediction;

            this.weights[index] = this.weights[index].map((weight, i) => weight + learningRate * error * inputs[i]);
            this.biases[index] += learningRate * error;
        });
    }

    getWeightsAndBias(): { weights: number[][]; biases: number[] } {
        return { weights: this.weights, biases: this.biases };
    }

    setWeightsAndBias(weights: number[][], biases: number[]): void {
        this.weights = weights;
        this.biases = biases;
    }
}

export default Perceptron;
