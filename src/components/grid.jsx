import React, { useContext, useEffect, useRef, useState } from 'react';
import '../styles/grid.styles.css';
import { GameStateContext } from '../context/game-state-provider';
import { BoardStateContext } from '../context/board-state-provider';
import { ModalStateContext } from '../context/modal-state-provider';
import Modal from './modal';

const MATRIX = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const Grid = () => {
    const { boardState, setWhoseTurn, setGameField, updateScores } = useContext(BoardStateContext);
    const { whoseTurn, gameField, scores } = boardState;

    const { modalState, setIsOpen, setRoundWinner, setGrayButtonContent, setYellowButtonContent, setWasScoreUpdated } = useContext(ModalStateContext);
    const { isOpen, wasScoreUpdated } = modalState;

    const getCellValue = (num) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (MATRIX[i][j] === num) {
                    return gameField[i][j];
                }
            }
        }
    }

    const moveMadeHandler = (e) => {
        const cellId = +e.target.id;
        let newGameField = [...gameField];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (MATRIX[i][j] === cellId && newGameField[i][j] === '') {
                    newGameField[i][j] = whoseTurn;
                    setGameField(newGameField);
                    setWhoseTurn(whoseTurn === 'X' ? 'O' : 'X');
                    return;
                }
            }
        }
    }

    const checkWin = (playerToCheck) => {

        for (let combination of WINNING_COMBINATIONS) {

            if (combination.every(el => {
                const row = Math.floor(el / 3);
                const col = el % 3;
                return gameField[row][col] === playerToCheck;
            })) {
                return true;
            }
        }

        return false;
    };

    const checkTie = () => {
        return gameField.flat().every(cell => cell !== '');
    }

    useEffect(() => {
        console.table(gameField);

        const playerToCheck = whoseTurn === 'X' ? 'O' : 'X';

        console.log("was score updated? ", wasScoreUpdated)

        if (checkWin(playerToCheck) && !wasScoreUpdated) {

            console.log("updating scores...")
            updateScores({
                [playerToCheck]: scores[playerToCheck] + 1
            });

            setWasScoreUpdated(true);

            setRoundWinner(playerToCheck);
            setIsOpen(true);
            setGrayButtonContent('quit');
            setYellowButtonContent('next');
            
        } else if (checkTie() && !wasScoreUpdated) {
            console.log("updating scores...")

            console.log("scores: ", scores)

            updateScores({
                ties: scores.ties + 1,
            });

            setWasScoreUpdated(true);

            setRoundWinner('tie');
            setIsOpen(true);
            setGrayButtonContent('quit');
            setYellowButtonContent('next');
        }

    }, [gameField, whoseTurn])

    return (
        <section id='grid'>

            { MATRIX.map(row => 
                row.map(el => 
                    <div
                        id={el}
                        key={el}
                        className={`cell ${getCellValue(el)}`}
                        onClick={moveMadeHandler}
                    >
                        {getCellValue(el)}
                    </div>
                )
            ) }

            { isOpen && <Modal /> }
        </section>
    )
};

export default Grid;