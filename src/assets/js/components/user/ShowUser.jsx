import React, { PureComponent }     from 'react'
import _                            from 'lodash'
import { connect }                  from "react-redux"

import { DFContainer,
         DFSubTitle,
         DFButton,
         DFInputsField,
         DFItem }                   from '../../elements/library'
         
import MapComponent                 from '../map/Map.jsx'

const ShowUserComponent = (props) => {

  if (props) {
    const user = props.user 
    const meta = _.get(props.orders, 'current.meta.metaData', null)

    let userSource

    if (meta && props.override) {
      userSource = meta
    } else {
      userSource = user
    }

    const userName        = userSource.userName
    const firstName       = userSource.firstName
    const secondName      = userSource.secondName
    const addressLineOne  = userSource.addressLineOne
    const addressLineTwo  = userSource.addressLineTwo
    const tel             = userSource.tel

    const latlon          = props.latlon || userSource.latlon

    return <DFContainer>
      <DFSubTitle>{ userName }</DFSubTitle>
      <DFContainer>
        <DFItem>{ firstName }</DFItem>
        { secondName ? <DFItem>{ secondName }</DFItem> : null }
        <DFItem>{ addressLineOne }</DFItem>
        { addressLineTwo ? <DFItem>{ addressLineTwo }</DFItem> : null }
        <DFItem>{ tel }</DFItem>
      </DFContainer>
      <DFContainer>
        <MapComponent 
          latlon    = { latlon }
          maptext   = { props.maptext }
          editable  = { props.editable }
        />
      </DFContainer>
    </DFContainer> 
  }

  return null
}

const mapStateToProps = (state) => {
    return {
        user  : state.user,
        orders: state.orders
    }
}

//const mapDispatchToProps = dispatch => ({onUserEdit: (userData) => dispatch(editUser(userData))})

export default connect(mapStateToProps, null)(ShowUserComponent)