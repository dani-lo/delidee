import React, { PureComponent }             from 'react'

import { DFContainer, DFButton, 
         DFInput, DFLabel }                 from '../../elements/library'

import ModalComponent                       from '../../components/app/Modal.jsx'
import MapComponent                         from '../map/Map.jsx'

import { isFilled }                         from '../../helper'

class OrderMetaComponent extends PureComponent {
  constructor (props) {
    super(props)
    let userName, firstName, secondName, addressLineOne, addressLineTwo, latlon, tel

    if (props.orders && props.orders.current && props.orders.current.meta && props.orders.current.meta.metaData) {
      userName          = props.orders.current.meta.metaData.userName
      firstName         = props.orders.current.meta.metaData.firstName
      secondName        = props.orders.current.meta.metaData.secondName
      addressLineOne    = props.orders.current.meta.metaData.addressLineOne
      addressLineTwo    = props.orders.current.meta.metaData.addressLineTwo
      latlon            = props.orders.current.meta.metaData.latlon
      tel               = props.orders.current.meta.metaData.tel
    } else if (props.user) {
      userName          = props.user.userName
      firstName         = props.user.firstName
      secondName        = props.user.secondName
      addressLineOne    = props.user.addressLineOne
      addressLineTwo    = props.user.addressLineTwo
      latlon            = props.user.latlon
      tel               = props.user.tel
    }

    this.state = {
      userName        : userName || null,
      firstName       : firstName || null,
      secondName      : secondName || null,
      addressLineOne  : addressLineOne || null,
      addressLineTwo  : addressLineTwo || null,
      latlon          : latlon || null,
      tel             : tel || null
    }
  }

  isFilled (field) {
    return isFilled(this.state, field)
  }
 
  isActive (field) {
    console.log('is active', this.isFilled('firstName') && this.isFilled('addressLineOne'))
    return this.isFilled('firstName') && this.isFilled('addressLineOne')
  }

  buildMetaForm () {
    
    return (<div className='delifast-view delifast-registration'>
      <h2>Order Delivery Details</h2>
      <h3>Just for this order, your account address will not change</h3>
      <DFContainer>
        <DFLabel 
          required={ 1 } 
          filled={ this.isFilled('firstName') ? 1 : 0}>Name</DFLabel>
        <DFInput.Txt 
          required={ 1 } 
          filled={ this.isFilled('firstName') ? 1 : 0 }
          value={ this.state.firstName } 
          onChange={ (e) => this.setState({firstName: e.target.value})} />
      </DFContainer>
      <DFContainer>
        <DFLabel>Surname</DFLabel>
        <DFInput.Txt value={ this.state.secondName } onChange={ (e) => this.setState({secondName: e.target.value})} />
      </DFContainer>
       <DFContainer>
        <DFLabel 
          required={ 1 } 
          filled={ this.isFilled('addressLineOne') ? 1 : 0 }>Address Line 1</DFLabel>
        <DFInput.Txt 
          required={ 1 } 
          filled={ this.isFilled('addressLineOne') ? 1 : 0 }
          value={ this.state.addressLineOne } 
          onChange={ (e) => this.setState({addressLineOne: e.target.value})} />
      </DFContainer>
       <DFContainer>
        <DFLabel>Address Line 2</DFLabel>
        <DFInput.Txt value={ this.state.addressLineTwo } onChange={ (e) => this.setState({addressLineTwo: e.target.value})} />
      </DFContainer>
      <DFContainer>
        <DFLabel>Telephone</DFLabel>
        <DFInput.Txt value={ this.state.tel } onChange={ (e) => this.setState({tel: e.target.value})} />
      </DFContainer>
      <DFContainer>
        <DFLabel required={ 1 }>Your address for delivery</DFLabel>
        <MapComponent 
          unactive    = { !this.isActive() }
          editable    = { true }
          maptext     = { "Delivery Location" }
          onSetLatlon = {latlong => this.setState({latlon: {lat: latlong[0], lon: latlong[1]}}) } 
        />
      </DFContainer>
    </div>)
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