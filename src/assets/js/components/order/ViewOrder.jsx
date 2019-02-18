import React, { PureComponent }             from 'react'
import moment                               from 'moment'
import { DFContainer, 
         DFSubTitle,
         DFSectionTitle,
         DFItem }                           from '../../elements/library'

import ModalComponent                       from '../../components/app/Modal.jsx'
import MapComponent                         from '../map/Map.jsx'
import { itemOptions }                      from './util.jsx'

import { displayStatus,
         orderTotal}                        from '../../helper'

const DATE_FORMAT = 'MMMM Do YYYY, h:mm:ss a'

const ViewOrderComponent = (props) => {
  let firstName, secondName, addressLineOne, addressLineTwo, latlon, tel, comment, status, when

  const meta = props.order.meta && props.order.meta.metaData ? props.order.meta.metaData : {}

  firstName       = meta.firstName
  secondName      = meta.secondName
  addressLineOne  = meta.addressLineOne
  addressLineTwo  = meta.addressLineTwo
  tel             = meta.tel
  latlon          = meta.latlon
  status          = props.order.status
  comment         = props.order.comment
  when            = moment(props.order.createdAt)
  
  const orderItems = []

  props.order.items.map(item => {
    orderItems.push(<DFContainer>
        <div key={`item-order-${ item.pid }`}>
          <DFItem>{ item.name } x { item.quantity }</DFItem>
          <p>{ item.price }</p>
          { item.options ? itemOptions(item.options) : null }
        </div> 
      </DFContainer>)
  })

  return <ModalComponent
          className = "modal"
          cancel    = { () => props.onCancel() } 
          info  
        >
    <DFContainer>
      <DFSectionTitle>{ when.format(DATE_FORMAT) }</DFSectionTitle>
      <DFSubTitle>{ displayStatus(status) }</DFSubTitle>
      <DFSubTitle>Order Items</DFSubTitle>
      { orderItems }
      <DFSubTitle>Your Comments</DFSubTitle>
      <p>{ comment && comment.length ? comment : 'None' }</p>
      <DFSubTitle>Delivery Information</DFSubTitle>
      <p>{ firstName }</p>
      <p>{ secondName }</p>
      <p>{ addressLineOne }</p>
      <p>{ addressLineTwo }</p>
      <p>{ tel }</p>
      <MapComponent 
        latlon          = { latlon }
        maptext         = { "Delivery Location" }
        editable        = { false }
      />
    </DFContainer>
  </ModalComponent>
}

export default ViewOrderComponent