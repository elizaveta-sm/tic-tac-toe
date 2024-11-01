import React, { createContext, useState, useEffect } from "react";

export const ModalStateContext = createContext({});

const DEFAULT_STATE = {
    isOpen: false, // true | false
    roundWinner: null, // 'X' | 'O' | 'tie'
    grayButtonContent: null, // 'quit' | 'cancel'
    yellowButtonContent: null, // 'next' | 'restart'
    wasScoreUpdated: false, // 'true' | 'false'
};

const loadInitialState = () => {
    const savedState = localStorage.getItem("modalState");

    return savedState
        ? JSON.parse(savedState)
        : DEFAULT_STATE;
};

const ModalStateProvider = ({ children }) => {
    const [modalState, setModalState] = useState(loadInitialState);

    useEffect(() => {
        localStorage.setItem("modalState", JSON.stringify(modalState));
    }, [modalState]);

    const setIsOpen = (isOpen) =>
        setModalState(prev => ({...prev, isOpen}));
        
    const setRoundWinner = (roundWinner) => 
        setModalState(prev => ({ ...prev, roundWinner }));

    const setGrayButtonContent = (grayButtonContent) => 
        setModalState(prev => ({ ...prev, grayButtonContent }));

    const setYellowButtonContent = (yellowButtonContent) => 
        setModalState(prev => ({ ...prev, yellowButtonContent }));

    const setWasScoreUpdated = (wasScoreUpdated) => 
        setModalState(prev => ({ ...prev, wasScoreUpdated }));

    const resetModalState = () => 
        setModalState(DEFAULT_STATE);

    return (
        <ModalStateContext.Provider
            value={{
                modalState,
                setIsOpen,
                setRoundWinner,
                setGrayButtonContent,
                setYellowButtonContent,
                setWasScoreUpdated,
                resetModalState,
            }}
        >
            {children}
        </ModalStateContext.Provider>
    );
};

export default ModalStateProvider;