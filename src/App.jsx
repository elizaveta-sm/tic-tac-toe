import React, { useContext } from 'react';
import HomePage from './components/home-page';
import GameBoard from './components/game-board';
import { GameStateContext } from './context/game-state-provider';

const App = () => {
    const { gameState } = useContext(GameStateContext);
    const currentPage = gameState.page;

    return (
        <div id='App'>
            { currentPage === 'home' ? (
                <HomePage />
            ) : (
                <GameBoard />
            )}
        </div>
    );
};

export default App;