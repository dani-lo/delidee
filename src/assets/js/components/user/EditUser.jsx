import React, { PureComponent }     from 'react'
import { connect }                  from "react-redux"

import { DFContainer,
         DFLabel,
         DFButton,
         DFSubTitle,
         DFInput,
         DFInputsField, 
         DFBlock}            from '../../elements/library'
         
import MapComponent                 from '../map/Map.jsx'

import { uneditUser }               from '../../store/actions/appActions'
import { updateUser }               from '../../store/actions/accountActions'

import { isFilled }                 from '../../helper'

class EditUserComponent extends PureComponent {

  constructor (props) {
    super(props)

    const userCopy = Object.assign({}, this.props.user)

    this.state = {
      firstName: userCopy.firstName,
      secondName: userCopy.secondName,
      addressLineOne: userCopy.addressLineOne,
      addressLineTwo: userCopy.addressLineTwo,
      tel: userCopy.tel,
      latlon: userCopy.latlon,
    }
  }

  isFilled (field) {
    return isFilled(this.state, field)
  }
  
  render () {

    return <DFContainer>
        <DFBlock  className="margin-v-l">
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel 
              className = "flex-child  padding-top-m"
              required  = { 1 } 
              filled    = { this.isFilled('firstName') ? 1 : 0 }>Name</DFLabel>
            <DFInput.Txt  
              className = "flex-child"
              required  = { 1 } 
              filled    = { this.isFilled('firstName') ? 1 : 0 } 
              value     = { this.state.firstName } 
              onChange  = { (e) => this.setState({firstName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel className="flex-child  padding-top-m">Second Name</DFLabel>
            <DFInput.Txt 
              className = "flex-child"
              value     = { this.state.secondName } 
              onChange  = { (e) => this.setState({secondName: e.target.value})} 
            />
          </DFInputsField>
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel
              className = "flex-child  padding-top-m"
              required  = { 1 } 
              filled    = { this.isFilled('addressLineOne') ? 1 : 0 }>Address 1</DFLabel>
            <DFInput.Txt 
              className = "flex-child"
              required  = { 1 } 
              filled    = { this.isFilled('addressLineOne') ? 1 : 0 } 
              value     = { this.state.addressLineOne } 
              onChange  = { (e) => this.setState({addressLineOne: e.target.value})} />
          </DFInputsField>
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel className="flex-child  padding-top-m">Address 2</DFLabel>
            <DFInput.Txt 
              className = "flex-child"
              value     = { this.state.addressLineTwo } 
              onChange  = { (e) => this.setState({addressLineTwo: e.target.value})} />
          </DFInputsField>
          <DFInputsField txtfield className="flex-parent margin-v-m">
            <DFLabel className="flex-child  padding-top-m">Telephone</DFLabel>
            <DFInput.Txt 
              className = "flex-child"
              value     = { this.state.tel } 
              onChange  = { (e) => this.setState({tel: e.target.value})} />
          </DFInputsField>
        </DFBlock>
        <DFBlock  className="margin-v-l">
          <DFInputsField>
            <DFButton cancel onClick={ () => this.props.uneditUser() }>Cancel</DFButton>
            <DFButton confirm onClick={ () => this.props.onUserSave(this.state) }>Save Changes</DFButton>
          </DFInputsField>
      </DFBlock>
        <DFBlock  className="margin-v-l">
            <MapComponent 
              mapinst     = "Click to set your account delivery location"
              onSetLatlon = {latlon => this.setState({latlon: latlon}) }
              maptext     = { "Account Location" }
              editable    = { true }
            />
      </DFBlock>
      
    </DFContainer>
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
  onUserSave: (userData) => dispatch(updateUser(userData)),
  uneditUser: () => dispatch(uneditUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserComponent)