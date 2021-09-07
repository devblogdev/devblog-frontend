import React, { useState, createContext } from 'react'


export const ActivationContext = createContext() 

export const ActivationProvider = ({ children }) => {

    const [active, setActive] = useState(true)
    const [preview, setPreview] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const activate = () => {
        setActive(false)
    }

    const deactivate = () => {
        setActive(true)
    }


    const restoreProfileImage = (file) => {
        setPreview(file)
    }

    const showProfileImage = () => {
        setIsFilePicked(true)
    }

    return (
        <ActivationContext.Provider value ={
            { 
                active, 
                activate, 
                deactivate, 
                preview, 
                setPreview, 
                restoreProfileImage,
                isFilePicked,
                setIsFilePicked,
                showProfileImage 
            }
        } >
            { children }
        </ActivationContext.Provider>
    );
}

