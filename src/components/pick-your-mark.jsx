import React, { useContext } from 'react';
import '../styles/pick-your-mark.styles.css';
import { GameStateContext } from '../context/game-state-provider';

const PickYourMark = () => {
    const { setPlayerMark } = useContext(GameStateContext);

    const pickMarkHandler = (e) => {
        const chosenMark = e.target.checked ? 'O' : 'X';
        setPlayerMark(chosenMark);
    }

    return (
        <section id='pick-your-mark-container'>
            <p className="sub-header" id='pick-your-mark'>Pick your mark</p>

            <div className="slide-toggle">
                <input 
                    id="mark" 
                    type="checkbox" 
                    name="mark" 
                    onChange={pickMarkHandler}
                />
                <label htmlFor="mark">
                    <div 
                        className="mark-switch"
                        data-unchecked="X"
                        data-checked="O"
                    ></div>
                </label>
            </div>

            <p id='x-goes-first'>X goes first</p>
        </section>
    )
}

export default PickYourMark