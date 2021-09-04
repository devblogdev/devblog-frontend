import React, { useState, createContext } from 'react'


export const ActivationContext = createContext() 

export const ActivationProvider = ({ children }) => {

    const [active, setActive] = useState(true)

    const activate = () => {
        setActive(false)
    }

    const deactivate = () => {
        setActive(true)
    }

    return (
        <ActivationContext.Provider value ={{ active, activate, deactivate }} >
            { children }
        </ActivationContext.Provider>
    );
}

