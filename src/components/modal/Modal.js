import React from 'react';
const Modal = (props) => {
    return (
       <div id="modal"style={{ display: props.displayModeModal }} >
          {props.modalMessage}
       </div>
    )
}
export default Modal;