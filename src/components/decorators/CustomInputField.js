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
            marginBottom: '8px',
            marginRight: '8px',
            marginLeft: '8px',
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
            marginBottom: '8px',
            marginRight: '8px',
            marginLeft: '8px',
            border: 'solid 2px darkslategray',
            resize: 'vertical'
        }
    )
}

const InputControl = () => {
    return (
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        }
    )
}

const gridPlacement = (props) => {
    return (
        {
            gridArea: props.gridArea 
        }
    )
}


export default function CustomInputField( props ) {

    const { active } = useContext(ActivationContext);

    if (!props.textArea) {

        return (
            <div style= {gridPlacement(props)} >
                <div style = {InputControl()} >
                    <label 
                        htmlFor={props.name} 
                        style={{
                            marginLeft: '8px',
                            marginTop: '5px',
                        }}
                    > {props.label} 
                    </label> 
                    <input
                        name = {props.name}
                        size = {props.size || '25'}
                        label = {props.label}
                        style = {textInputStyles()}
                        disabled = {active}
                    />    
                </div>
            </div>
        )
    }
    return (
        <div style= {gridPlacement(props)} >
            <div style = {InputControl()} >
                <label 
                    htmlFor={props.name} 
                    style={{
                        marginLeft: '8px',
                        marginTop: '5px',
                    }}
                > {props.label} 
                </label> 
                <textarea
                    name = {props.name}
                    cols = "30"
                    rows = '5'
                    label = {props.label}
                    style = {textAreaStyles()}
                    disabled = {active}
                />    
            </div>
        </div>
    )
}

