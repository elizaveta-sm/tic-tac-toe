import React, { createContext, useState, useEffect } from "react";

export const BoardStateContext = createContext({});

const DEFAULT_STATE = {
    whoseTurn: 'X', // 'X' | 'O'
    gameField: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    scores: {
        X: 0,
        O: 0,
        ties: 0,
    },
};

const loadInitialState = () => {
    const savedState = localStorage.getItem("boardState");

    return savedState ? JSON.parse(savedState) : DEFAULT_STATE;
};

const BoardStateProvider = ({ children }) => {
    const [boardState, setBoardState] = useState(loadInitialState);

    useEffect(() => {
        localStorage.setItem("boardState", JSON.stringify(boardState));
    }, [boardState]);

    const setWhoseTurn = (whoseTurn) => 
        setBoardState(prev => ({ ...prev, whoseTurn }));
        
    const setGameField = (newField) => {
        const updatedField = newField.map(row => [...row]); 

        setBoardState(prev => ({
            ...prev,
            gameField: updatedField,
        }));
    }
        
    const updateScores = (newScores) =>
        setBoardState(prev => ({
            ...prev,
            scores: { ...prev.scores, ...newScores },
        }));

    const resetBoard = () => {
        localStorage.removeItem("boardState");
        setBoardState(DEFAULT_STATE);     
        setBoardState(prev => ({
            ...prev,
            gameField: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
        }));
    };

    const resetBoardField = () => {
        setGameField([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
        setWhoseTurn('X');
    };

    return (
        <BoardStateContext.Provider
            value={{
                boardState,
                setWhoseTurn,
                setGameField,
                updateScores,
                resetBoard,
                resetBoardField,
            }}
        >
            {children}
        </BoardStateContext.Provider>
    );
};

export default BoardStateProvider;