import React, { useContext, useState } from 'react';
import PickYourMark from './pick-your-mark';
import { GameStateContext } from '../context/game-state-provider';
import '../styles/game-start.styles.css';

const HomePage = () => {
    const { setOpponent, setPage } = useContext(GameStateContext);

    const startGameHandler = (e) => {
        if (e.target.id === 'vs-player') {
            setOpponent('player');
            setPage('board');
        }
    }

    return (
        <section id="game-start-screen">
            <h1 id='game-title'>Tic Tac Toe Game</h1>

            <PickYourMark />

            <h2>Start a New Game</h2>
            <div id="game-start-options">
                <button id='vs-robot' onClick={startGameHandler}>VS Robot</button>
                <button id='vs-player' onClick={startGameHandler}>VS Player</button>
            </div>
        </section>
    )
}

export default HomePage;