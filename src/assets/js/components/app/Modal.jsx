import React    from 'react'
import ReactDOM from 'react-dom'

import { DFContainer, DFButton, 
         DFInput, DFLabel }                 from '../../elements/library'

const ModalComponent = (props) => {
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-bg"></div>
      <div className="modal-wrapper">
        <div className="modal-header">
            <h3>{ props.header } </h3>
            <span className="close-modal-btn" onClick={props.cancel}>×</span>
        </div>
        <div className="modal-body">
          {props.children}
        </div>
        {!props.info ? <div className="modal-footer">
            <DFButton className="btn-cancel" onClick={props.cancel}>cancel</DFButton>
            <DFButton className="btn-continue" onClick={props.confirm} unactive={ props.unactive ? 1 : 0  }>confirm</DFButton>
        </div> : null }
      </div>
    </div>,
    document.body
  )
}

export default ModalComponent