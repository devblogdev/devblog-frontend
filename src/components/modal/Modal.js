import React from 'react'

const Modal = (props) => {

    const modalStyle = {
        color: 'black',
        display: "flex",
        flexDirection: 'column',
        margin: 0,
        // border: "solid 2px black",
        borderRadius: "5px",
        // position: 'absolute',
        visibility: props.displayModeModal
      };
    
    // const paragraphStyle = {
    //     margin: "0"
    // }

    return (
       <div
          style={modalStyle}
          id="modal"
        >
            {/* <p style={paragraphStyle}>
                Modal notification
            </p> */}
            {props.modalMessage}
       </div>
    )

}

export default Modal