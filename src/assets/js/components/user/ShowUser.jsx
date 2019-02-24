import React, { Fragment }          from 'react'
import _                            from 'lodash'
import { connect }                  from "react-redux"

import { DFContainer,
         DFSubTitle,
         DFButton,
         DFInputsField,
         DFItem, 
         DFBlock}                   from '../../elements/library'

import MapComponent                 from '../map/Map.jsx'

import { User }                     from '../../helper'

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

    return <Fragment>
        <DFBlock className="margin-v-l">
          <User data={ userSource } />
        </DFBlock>
        <DFBlock  className="margin-v-l">
          <MapComponent 
            mapinst   = " "
            latlon    = { latlon }
            maptext   = { props.maptext }
            editable  = { props.editable }
          />
        </DFBlock>
    </Fragment> 
  }

  return null
}

const mapStateToProps = (state) => {
    return {
        user  : state.user,
        orders: state.orders
    }
}

export default connect(mapStateToProps, null)(ShowUserComponent)