import React, { useContext } from 'react'
import { ActivationContext } from '../users/ActivationContext'

const textInputStyles = () => {
    return (
        {
            padding: '18px 14px',
            fontSize: '16px',
            fontFamily: 'inherit',
            background: 'rgb(245, 245, 245)',
            border: 'solid 2px darkslategray',
            marginTop: '5px',
            width: '100%',
            boxSizing: 'border-box',
        }
    )
}

const textAreaStyles = () => {
    return (
        {
            padding: '18px 14px',
            fontSize: '16px',
            fontFamily: 'inherit',
            background: 'rgb(245, 245, 245)',
            marginTop: '5px',
            border: 'solid 2px darkslategray',
            resize: 'vertical',
            width: '100%',
            boxSizing: 'border-box',
        }
    )
}

const InputControl = (maxWidth) => {
    return (
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: maxWidth,
            marginBottom: '16px',
            marginRight: '8px',
            marginLeft: '8px',
        }
    )
}

const gridPlacement = (gridArea) => {
    return (
        {
            gridArea: gridArea,
        }
    )
}


export default function CustomInputField( props ) {
    const { name, label, defaultValue, maxWidth, gridArea, inputRef } = props
    const { active } = useContext(ActivationContext);

    if (!props.textArea) {

        return (
            <div style= {gridPlacement(gridArea)} >
                <div style = {InputControl(maxWidth)} >
                    <label 
                        htmlFor={name} 
                        style={{
                            marginLeft: '8px',
                            marginTop: '5px',
                        }}
                    > {props.label} 
                    </label> 
                    <input
                        name = {name}
                        label = {label}
                        style = {textInputStyles()}
                        defaultValue = {defaultValue || ""} 
                        ref = {inputRef}
                        disabled = {active}
                        maxLength = '70'
                    />    
                </div>
            </div>
        )
    }
    return (
        <div style= {gridPlacement(gridArea)} >
            <div style = {InputControl(maxWidth)} >
                <label 
                    htmlFor={name} 
                    style={{
                        marginLeft: '8px',
                        marginTop: '5px',
                    }}
                > {props.label} 
                </label> 
                <textarea
                    name = {name}
                    cols = "30"
                    rows = '5'
                    label = {label}
                    style = {textAreaStyles()}
                    defaultValue = {defaultValue || ""}
                    ref={inputRef}
                    disabled = {active}
                    maxLength = '1000'
                />    
            </div>
        </div>
    )
}

