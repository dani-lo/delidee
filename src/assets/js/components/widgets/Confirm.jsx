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
        >
      <DFContainer>
        
        <DFInputsField>
          <DFButton cancel onClick={ () => {
            this.props.onCancel()
          } }>cancel</DFButton>
          <DFButton confirm onClick={ () => {
            this.props.onConfirm()
           } }>confirm</DFButton>
        </DFInputsField>
      </DFContainer>
    </ModalComponent>
  }
}

export default ConfirmComponent



//{ this.props.text ? <DFSubTitle>{ this.props.text }</DFSubTitle> : null}