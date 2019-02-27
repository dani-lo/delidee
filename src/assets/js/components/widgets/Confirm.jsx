import React, { PureComponent } from 'react'

import ModalComponent           from '../../components/widgets/Modal.jsx'

import { DFSubTitle,
         DFInput,
         DFContainer,
         DFSelect,
         DFButton,
         DFInputsField,
         DFLabel}                from '../../elements/library'

class ConfirmComponent extends PureComponent {

  constructor (props) {
    super(props)
  }

  render () {
    return <ModalComponent
          bare
          confirmation
          text = { this.props.text || null }
        >
      <DFContainer>
        <DFInputsField>
          {!this.props.nocancel ? 
          <DFButton cancel onClick={ () => {
            this.props.onCancel()
          } }><i class="far fa-times-circle margin-right-s"></i> cancel</DFButton> : null }
          <DFButton confirm onClick={ () => {
            this.props.onConfirm()
           } }><i class="far fa-check-circle margin-right-s"></i> ok</DFButton>
        </DFInputsField>
      </DFContainer>
    </ModalComponent>
  }
}

export default ConfirmComponent



//{ this.props.text ? <DFSubTitle>{ this.props.text }</DFSubTitle> : null}