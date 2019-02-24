import React, { PureComponent }             from 'react'
import { connect }                          from 'react-redux'

import { addUser,postLogin }                from '../../store/actions/accountActions'
import { DFContainer, DFButton, 
         DFInput, DFLabel, DFBlock,
         DFInputsField, 
         DFSubTitle}                    from '../../elements/library'
import MapComponent                         from '../map/Map.jsx'

import { isFilled }                         from '../../helper'

class RegistrationComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      userName        : null,
      firstName       : null,
      secondName      : null,
      addressLineOne  : null,
      addressLineTwo  : null,
      latlon          : null,
      tel             : null
    }
  }

  submitRegistration () {
    if (!this.state.userName || !this.state.firstName ||  !this.state.addressLineOne  || !this.state.latlon) {
      const missingStr = `${ !this.state.userName ? 'Email' : '' } ${ !this.state.addressLineOne ? 'Address Line 1' : '' } ${ !this.state.firstName ? 'First Name' : '' } ${ !this.state.latlon ? 'Map Location' : ''} `
      
      alert('Missing Data: ' + missingStr)

      return false
    }

    this.props.submitRegistration(this.state)
  }

  inflateFromProps () {
    if (this.props.user) {

    }
  }

  isFilled (field) {
    return isFilled(this.state, field)
  }


  render () {
    
    if (this.props.user && this.props.user.userName && !this.props.user._id) {
      this.props.login(this.props.user.userName)
    }
    return (<DFContainer>
      <DFSubTitle>Create Account</DFSubTitle>
      <DFBlock  className="margin-v-l">
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel
              className="flex-child  padding-top-l"
              required  = { 1 } 
              filled    = { this.isFilled('userName') ? 1 : 0 }>Email</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              required  = { 1 } 
              filled    = { this.isFilled('userName') ? 1 : 0 }
              value     = { this.state.userName } 
              onChange  = { (e) => this.setState({userName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-m">
            <DFLabel 
              className="flex-child  padding-top-m"
              required  = { 1 } 
              filled    = { this.isFilled('firstName') ? 1 : 0 }>Name</DFLabel>
            <DFInput.Txt  
              className="flex-child"
              required  = { 1 } 
              filled    = { this.isFilled('firstName') ? 1 : 0 } 
              value     = { this.state.firstName } 
              onChange  = { (e) => this.setState({firstName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-m">
            <DFLabel className="flex-child  padding-top-m">Second Name</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              value     = { this.state.secondName } 
              onChange  = { (e) => this.setState({secondName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-m">
            <DFLabel
              className="flex-child  padding-top-m"
              required  = { 1 } 
              filled    = { this.isFilled('addressLineOne') ? 1 : 0 }>Address Line 1</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              required  = { 1 } 
              filled    = { this.isFilled('addressLineOne') ? 1 : 0 } 
              value     = { this.state.addressLineOne } 
              onChange  = { (e) => this.setState({addressLineOne: e.target.value})} />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-m">
            <DFLabel className="flex-child  padding-top-m">Address Line 2</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              value     = { this.state.addressLineTwo } 
              onChange  = { (e) => this.setState({addressLineTwo: e.target.value})} />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-m">
            <DFLabel  className="flex-child  padding-top-m">Telephone</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              value     = { this.state.tel } 
              onChange  = { (e) => this.setState({tel: e.target.value})} />
          </DFInputsField>
        </DFBlock>
        <DFBlock  className="margin-v-l">
          <MapComponent 
            mapinst     = "Click to set your account delivery location"
            onSetLatlon = {latlon => this.setState({latlon: {lat: latlon[0], lon: latlon[1]}}) }
            maptext     = { "Account Location" }
            editable    = { true }
          />   
        </DFBlock>
        <DFBlock  className="margin-v-l">
          <DFInputsField>
            <DFButton
              active={ this.userName !== null ? 1 : 0 }
              onClick={ () => this.submitRegistration() }
            >Submit Registration</DFButton>
          </DFInputsField>
        </DFBlock>
    </DFContainer>)
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({ 
  submitRegistration : (userData) => dispatch(addUser(userData)),
  login: (username) => dispatch(postLogin(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent)