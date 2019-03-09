import React    from 'react'
import ReactDOM from 'react-dom'

import { DFButton, DFSubTitle } from '../../elements/library'
         
const ModalComponent = (props) => {
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-bg"></div>
      <div className={ `center-space modal-wrapper ${ props.confirmation ? 'confirmation-modal' : ''} ${ props.vertical ? 'vertical' : ''}` }>
        {!props.bare ? <div className="modal-header">
            <h3>{ props.header } </h3>
            <span className="close-modal-btn" onClick={props.cancel}>×</span>
        </div> : null }
        <div className="modal-body">
          { props.confirmation ? props.text ? <DFSubTitle>{props.text}</DFSubTitle> : <DFSubTitle>Please Confirm</DFSubTitle>  : null }
          {props.children}
        </div>
        {!props.bare && !props.info ? 
        <div className="modal-footer">
            <DFButton cancel onClick={props.cancel}><i className="far fa-times-circle margin-right-s"></i> cancel</DFButton>
            <DFButton confirm onClick={props.confirm} unactive={ props.unactive }><i className="far fa-check-circle margin-right-s"></i> ok</DFButton>
        </div> : null }

        { props.info ? <div className="modal-footer">
          <DFButton style={ {display: 'none' }}></DFButton>
          <DFButton onClick={props.cancel}>close</DFButton>
        </div> : null
         }
      </div>
    </div>,
    document.body
  )
}

export default ModalComponent