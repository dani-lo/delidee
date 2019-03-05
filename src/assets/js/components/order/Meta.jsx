import React, { PureComponent }             from 'react'

import { DFContainer, 
         DFSectionTitle,
         DFItem,
         DFInputsField, DFBlock,
         DFInput, DFLabel }                 from '../../elements/library'

import ModalComponent                       from '../../components/widgets/Modal.jsx'
import MapComponent                         from '../map/Map.jsx'

import { isFilled }                         from '../../helper'

class OrderMetaComponent extends PureComponent {
  constructor (props) {
    super(props)
  
    let userDataSource 

    if (props.orders && props.orders.current && props.orders.current.meta && props.orders.current.meta.metaData) {
      userDataSource = props.orders.current.meta.metaData
    } else if (props.user) {
      userDataSource = props.user
    }

    const { userName, firstName, secondName, addressLineOne, addressLineTwo, latlon, tel } = userDataSource

    this.state = {
      userName        : userName        || null,
      firstName       : firstName       || null,
      secondName      : secondName      || null,
      addressLineOne  : addressLineOne  || null,
      addressLineTwo  : addressLineTwo  || null,
      latlon          : latlon          || null,
      tel             : tel             || null
    }
  }

  isFilled (field) {
    return isFilled(this.state, field)
  }
 
  isActive (field) {
    return this.isFilled('firstName') && this.isFilled('addressLineOne')
  }

  buildMetaForm () {
    
    return (<DFContainer>
      <DFSectionTitle>Order Delivery Details</DFSectionTitle>
      <DFItem>Just for this order, your account address will not change</DFItem>
      <DFBlock>
        <DFBlock>
          <DFInputsField className="padding-v-s">
            <DFLabel 
              className="padding-v-s"
              small
              required={ 1 } 
              filled={ this.isFilled('firstName') ? 1 : 0}>Name</DFLabel>
            <DFInput.Txt 
              required={ 1 } 
              filled={ this.isFilled('firstName') ? 1 : 0 }
              value={ this.state.firstName } 
              onChange={ (e) => this.setState({firstName: e.target.value})} />
          </DFInputsField>
          <DFInputsField  className="padding-v-s">
            <DFLabel   className="padding-v-s" small>Surname</DFLabel>
            <DFInput.Txt value={ this.state.secondName } onChange={ (e) => this.setState({secondName: e.target.value})} />
          </DFInputsField>
          <DFInputsField  className="padding-v-s">
            <DFLabel 
              className="padding-v-s"
              small
              required={ 1 } 
              filled={ this.isFilled('addressLineOne') ? 1 : 0 }>Address Line 1</DFLabel>
            <DFInput.Txt 
              required={ 1 } 
              filled={ this.isFilled('addressLineOne') ? 1 : 0 }
              value={ this.state.addressLineOne } 
              onChange={ (e) => this.setState({addressLineOne: e.target.value})} />
          </DFInputsField>
          <DFInputsField  className="padding-v-s">
            <DFLabel   className="padding-v-s" small>Address Line 2</DFLabel>
            <DFInput.Txt value={ this.state.addressLineTwo } onChange={ (e) => this.setState({addressLineTwo: e.target.value})} />
          </DFInputsField>
          <DFInputsField  className="padding-v-s">
            <DFLabel   className="padding-v-s" small>Telephone</DFLabel>
            <DFInput.Txt value={ this.state.tel } onChange={ (e) => this.setState({tel: e.target.value})} />
          </DFInputsField>
        </DFBlock>
        <DFBlock   className="margin-top-l">
            <MapComponent 
              mapinst     = "Click to set this order delivery location"
              unactive    = { !this.isActive() }
              editable    = { true }
              maptext     = { "Delivery Location" }
              onSetLatlon = {latlong => this.setState({latlon: {lat: latlong[0], lon: latlong[1]}}) } 
            />
        </DFBlock>
      </DFBlock>
    </DFContainer>)
  }

  render () {
    return <ModalComponent
          unactive  = { !this.isActive() }
          className = "modal"
          cancel    = { () => this.props.onCancel() } 
          confirm   = { () => this.props.onConfirm(Object.assign({}, this.state)) }
        >
      {  this.buildMetaForm() }
    </ModalComponent>
  }
}

export default OrderMetaComponent