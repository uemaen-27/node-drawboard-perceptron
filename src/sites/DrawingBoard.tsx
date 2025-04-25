import React, { useState, useImperativeHandle, forwardRef } from 'react';

interface DrawingBoardProps {
    onDraw: (board: number[][]) => void;
}

const DrawingBoard = forwardRef<{ reset: () => void }, DrawingBoardProps>(({ onDraw }, ref) => {
    const [board, setBoard] = useState<number[][]>(
        Array.from({ length: 16 }, () => Array(16).fill(0))
    );
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const handleMouseDown = (x: number, y: number) => {
        setIsDrawing(true);
        draw(x, y);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseMove = (x: number, y: number) => {
        if (isDrawing) {
            draw(x, y);
        }
    };

    const draw = (x: number, y: number) => {
        const newBoard = board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
                if (rowIndex === x && cellIndex === y) {
                    return 1;
                }
                return cell;
            })
        );
        setBoard(newBoard);
        onDraw(newBoard);
    };

    useImperativeHandle(ref, () => ({
        reset() {
            const emptyBoard = Array.from({ length: 16 }, () => Array(16).fill(0));
            setBoard(emptyBoard);
            onDraw(emptyBoard);
        }
    }));

    return (
        <div
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: 'none' }}
        >
            {board.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, cellIndex) => (
                        <div
                            key={cellIndex}
                            onMouseDown={() => handleMouseDown(rowIndex, cellIndex)}
                            onMouseMove={() => handleMouseMove(rowIndex, cellIndex)}
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: cell ? 'black' : 'white',
                                border: '1px solid gray'
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
});

export default DrawingBoard;
