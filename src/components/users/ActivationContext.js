import React, { useState, createContext } from 'react'


export const ActivationContext = createContext() 

export const ActivationProvider = ({ children }) => {

    const [active, setActive] = useState(true)
    const [preview, setPreview] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    // used in ProfileForm.js to activate the input fields and the image buttons in the user profile form when clicking on 'Edit' button
    const activate = () => {
        setActive(false)
    }

     // used in ProfileForm.js to eactivate the input fields and the image buttons in the user profile form when clicking on 'Cancel' button
    const deactivate = () => {
        setActive(true)
    }

    // loads the selected file in ProfileImageService.js
    const restoreProfileImage = (file) => {
        setPreview(file)
    }

    // shows the selected file on the screen in ProfileImageService.js
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
                showProfileImage,
                isFilePicked,
                setIsFilePicked,
            }
        } >
            { children }
        </ActivationContext.Provider>
    );
}

