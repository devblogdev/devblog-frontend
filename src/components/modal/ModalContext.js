import React, { useState, createContext, useCallback } from 'react'

export const ModalContext = createContext() 

export const ModalProvider = ({ children }) => {

    const [displayModeModal, setDisplayModeModal] = useState("none")
    const [modalMessage, setModalMessage] = useState([])

    const retrieveModalState = useCallback ((messageArray=[], time=3000) => {
        const message = messageArray?.map((message,index) => {
          return <li key={index}>{message}</li>
        })
        setModalMessage(message)
        setDisplayModeModal("flex")
        setTimeout(() => { 
            setDisplayModeModal('none');
            setModalMessage([]);
        }, time)
    },[])

    return (
        <ModalContext.Provider value ={
            { 
                displayModeModal,
                modalMessage,
                retrieveModalState
            }
        } >
            { children }
        </ModalContext.Provider>
    );
}