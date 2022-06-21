import React from 'react'

const Modal = (props) => {

    const modalStyle = {
        color: 'black',
        display: "flex",
        flexDirection: 'column',
        margin: 0,
        borderRadius: "5px",
        visibility: props.displayModeModal
      };
    
    return (
       <div
          style={modalStyle}
          id="modal"
        >
          {props.modalMessage}
       </div>
    )

}

export default Modal