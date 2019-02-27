import React, { PureComponent }             from 'react'
import { connect }                          from 'react-redux'

import { addUser,postLogin }                from '../../store/actions/accountActions'
import { DFContainer, DFButton, 
         DFInput, DFLabel, DFBlock,
         DFInputsField, DFError, DFNote,
         DFSubTitle}                        from '../../elements/library'
import MapComponent                         from '../map/Map.jsx'

import { fetch }                            from 'whatwg-fetch'


import { isFilled, validateEmail }          from '../../helper'

class RegistrationComponent extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      validUname      : true,
      existing        : false,
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

    if (this.state.existing) {
      alert('This username is not available')

      return false
    }

    if (!this.state.validUname) {
      alert('This email is not valid')

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

  checkExisting (val) {
    fetch('/api/user/existing/' + val)
      .then((response) => response.json())
      .then((response) => {

        if (response.msg && response.msg === 'ok') {
          this.setState({existing: false})
        } else if (response.msg === 'user exists' || !response.msg) {
          this.setState({existing: true})
        }
      })
  }

  validateUsername (val) {
    const valid = validateEmail(val)

    this.setState({validUname: valid})
  }



  render () {
    
    if (this.props.user && this.props.user.userName && !this.props.user._id) {
      this.props.login(this.props.user.userName)
    }

    //onBlur    = { (e) => this.checkExisting(e.target.value) }

    return (<DFContainer>
      <DFSubTitle>Create Account</DFSubTitle>
      <DFBlock  className="margin-v-l">
          <div className="margin-v-l padded-border">
            <DFError active={ this.state.existing } className="padding-v-s no-margin right-align">This username is no available</DFError>
            <DFError active={ !this.state.validUname } className="padding-v-s no-margin right-align">Please enter a valid email</DFError>
            
            <DFInputsField txtfield className="flex-parent">
              
              <DFLabel
                className="flex-child  padding-top-l"
                required  = { 1 } 
                filled    = { this.isFilled('userName') ? 1 : 0 }>Email</DFLabel>
              <DFInput.Txt 
                className="flex-child"
                required  = { 1 } 
                filled    = { this.isFilled('userName') ? 1 : 0 }
                value     = { this.state.userName } 
                onChange  = { (e) => this.setState({userName: e.target.value, existing: false, validUname: true})} 
                onBlur    = { (e) => this.validateUsername(e.target.value) }
              />
            </DFInputsField>
            <DFNote className="padding-m margin-bottom-xl">We will only use your email to identify your account</DFNote>
          </div>
          <DFInputsField txtfield  className="flex-parent margin-v-l">
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
          <DFInputsField txtfield  className="flex-parent margin-v-l">
            <DFLabel className="flex-child  padding-top-m">Second Name</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              value     = { this.state.secondName } 
              onChange  = { (e) => this.setState({secondName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-l">
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
          <DFInputsField txtfield  className="flex-parent margin-v-l">
            <DFLabel className="flex-child  padding-top-m">Address Line 2</DFLabel>
            <DFInput.Txt 
              className="flex-child"
              value     = { this.state.addressLineTwo } 
              onChange  = { (e) => this.setState({addressLineTwo: e.target.value})} />
          </DFInputsField>
          <DFInputsField txtfield  className="flex-parent margin-v-l">
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