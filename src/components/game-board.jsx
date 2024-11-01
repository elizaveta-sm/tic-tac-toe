import React, { useContext } from 'react';
import Grid from './grid';
import '../styles/game-field.styles.css';

import { GameStateContext } from '../context/game-state-provider';
import { BoardStateContext } from '../context/board-state-provider';
import { ModalStateContext } from '../context/modal-state-provider';

const GameBoard = () => {
    const { gameState, resetGame } = useContext(GameStateContext);
    const { boardState, resetBoard } = useContext(BoardStateContext);
    const { resetModalState, setIsOpen, setGrayButtonContent, setYellowButtonContent } = useContext(ModalStateContext);
    const { whoseTurn, scores } = boardState;
    const { playerMark, opponent } = gameState;

    const restartHandler = () => {
        setIsOpen(true);
        setGrayButtonContent('cancel');
        setYellowButtonContent('restart');
    }

    const goHomeHandler = () => {
        resetBoard();
        resetGame();
        resetModalState();
    }

    return (
        <section id="game-field">
            <div className='options'>
                <button id='home-button' onClick={goHomeHandler}>Home</button>
                <div id='turn-display'>{whoseTurn} Turn</div>
                <button id='restart-game' onClick={restartHandler}>Restart</button>
            </div>

            <Grid />

            <div className='score'>
                <div id='X-player'>
                    <p>X ({playerMark === 'X' ? 'You' : opponent})</p>
                    <h3>{scores.X}</h3>
                </div>

                <div id='ties'>
                    <p>Ties</p>
                    <h3>{scores.ties}</h3>
                </div>

                <div id='O-player'>
                    <p>O ({playerMark === 'O' ? 'You' : opponent})</p>
                    <h3>{scores.O}</h3>
                </div>
            </div>

        </section>
    )
}

export default GameBoard;