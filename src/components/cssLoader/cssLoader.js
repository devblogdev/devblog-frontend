import React from 'react';
import './cssLoader.css';
export default function CssLoader(props) {
    return (
        <div className='css-loader'>
            <div className='loader-message'><h4>{props.message}</h4></div>
            <div className='dot-flashing'></div>
        </div>
    )
}