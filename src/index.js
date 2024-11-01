import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './styles/main.css';
import GameStateProvider from './context/game-state-provider';
import BoardStateProvider from './context/board-state-provider';
import ModalStateProvider from './context/modal-state-provider';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <GameStateProvider>
            <BoardStateProvider>
                <ModalStateProvider>
                    <App />
                </ModalStateProvider>
            </BoardStateProvider>
        </GameStateProvider>
    </React.StrictMode>,
);