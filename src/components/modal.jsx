import React, { useContext, useEffect, useState } from 'react';
import { ModalStateContext } from '../context/modal-state-provider';
import '../styles/modal.styles.css';
import { GameStateContext } from '../context/game-state-provider';
import { BoardStateContext } from '../context/board-state-provider';

const Modal = () => {
    const { resetGame, gameState } = useContext(GameStateContext);
    const { resetBoard, resetBoardField } = useContext(BoardStateContext);
    const { modalState, setIsOpen, resetModalState } = useContext(ModalStateContext);
    const { roundWinner, grayButtonContent, yellowButtonContent } = modalState;
    const { playerMark } = gameState;
    const [hasContent, setHasContent] = useState(false);

    const winnerDisplay = 
        roundWinner === 'tie' ? "It's a tie" :
        roundWinner === 'X' ? "X takes the round" :
        roundWinner === 'O' ? "O takes the round" :
        '';
    
    const areYouWinner = playerMark === roundWinner; 

    const grayButtonDisplay = 
        grayButtonContent === 'quit' ? 'Quit' :
        grayButtonContent === 'cancel' ? 'No, cancel' :
        '';

    const yellowButtonDisplay = 
        yellowButtonContent === 'next' ? 'Next round' :
        yellowButtonContent === 'restart' ? 'Yes, restart' :
        '';

    const checkWhetherHasContent = () => {
        return grayButtonDisplay !== '' && yellowButtonDisplay !== '';
    };

    useEffect(() => {
        if (checkWhetherHasContent()) {
            setHasContent(true);
        } else {
            setHasContent(false);
            setIsOpen(false);
        }

    }, [grayButtonDisplay, yellowButtonDisplay, setIsOpen]);

    const buttonHandler = (e) => {
        console.log(e.target.id);
        const buttonAction = e.target.id;

        if (buttonAction === 'quit') {
            resetBoard();
            resetGame();
        } else if (buttonAction === 'next') {
            resetBoardField();
        } else if (buttonAction === 'cancel') {
            setIsOpen(false);
        } else if (buttonAction === 'restart') {
            resetBoard();
        }

        resetModalState();
    }

    return (
        <section id='result-modal'>
                <div className='overlay'>

                    { hasContent && (
                        <div id="modal-content">

                            { winnerDisplay !== '' && (
                                <>
                                    { areYouWinner && <p id='you-won'>You won!</p>}
                                
                                    <h2 className='winner-display' id={roundWinner}>
                                        { winnerDisplay }
                                    </h2>
                                </>
                            ) }

                            { winnerDisplay === '' && (
                                <h2 className='winner-display' id='restart-game'> 
                                    Restart Game?
                                </h2>
                            )}

                            <div className="options">
                                <button 
                                    id={grayButtonContent} 
                                    onClick={buttonHandler}
                                >
                                    {grayButtonDisplay}
                                </button>

                                <button 
                                    id={yellowButtonContent} 
                                    onClick={buttonHandler}
                                >
                                    {yellowButtonDisplay}
                                </button>
                            </div>
                        </div>
                    ) }
                </div>
            </section>
    )
}

export default Modal