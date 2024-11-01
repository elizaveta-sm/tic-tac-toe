import React, { createContext, useState, useEffect } from "react";

export const GameStateContext = createContext({});

const DEFAULT_STATE = {
    opponent: null, // 'robot' | 'player'
    playerMark: 'X', // 'X' | 'O'
    page: 'home', // Default to the 'home' page
};

const getInitialState = () => {
    const savedState = localStorage.getItem("gameState");

    return savedState
        ? JSON.parse(savedState)
        : DEFAULT_STATE;
};

const GameStateProvider = ({ children }) => {
    const [gameState, setGameState] = useState(getInitialState);

    useEffect(() => {
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }, [gameState]);

    const setOpponent = (opponent) => setGameState((prev) => ({ ...prev, opponent }));
    const setPlayerMark = (mark) => setGameState((prev) => ({ ...prev, playerMark: mark }));
    const setPage = (page) => setGameState((prev) => ({ ...prev, page }));
    const resetGame = () => setGameState(DEFAULT_STATE);

    return (
        <GameStateContext.Provider
            value={{
                gameState,
                setOpponent,
                setPlayerMark,
                setPage,
                resetGame,
            }}
        >
            {children}
        </GameStateContext.Provider>
    );
};

export default GameStateProvider;