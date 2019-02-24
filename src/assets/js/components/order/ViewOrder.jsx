import React, { PureComponent }             from 'react'
import moment                               from 'moment'
import { DFContainer, 
         DFSubTitle,
         DFBlock,
         DFSectionTitle,
         DFIcon,
         DFItem }                           from '../../elements/library'

import ModalComponent                       from '../../components/widgets/Modal.jsx'
import MapComponent                         from '../map/Map.jsx'

import { displayStatus,
         orderStatusContent,
         Item,
         User,
         orderTotal}                        from '../../helper'

const DATE_FORMAT = 'MMMM Do YYYY, h:mm:ss a'

const ViewOrderComponent = (props) => {
  let latlon, comment, status, when

  const meta = props.order.meta && props.order.meta.metaData ? props.order.meta.metaData : {}

  latlon          = meta.latlon
  status          = props.order.status
  comment         = props.order.comment
  when            = moment(props.order.createdAt)
  
  const orderItems    = []
  const statusContent = orderStatusContent(status)

  props.order.items.map(item => {
    orderItems.push(<Item data={item} />)
  })

  

  return <ModalComponent
          className = "modal"
          cancel    = { () => props.onCancel() } 
          info  
        >
    <DFContainer>
      <DFSubTitle>{ when.format(DATE_FORMAT) }</DFSubTitle>
      <DFItem className="padding-l" status={ status }>{ statusContent.txt }</DFItem>
      <DFBlock>
        <DFBlock>
          <DFSectionTitle>Order Items</DFSectionTitle>
          { orderItems }
          <DFSectionTitle>Your Comments</DFSectionTitle>
          <p>{ comment && comment.length ? comment : 'None' }</p>    
        </DFBlock>
        <DFBlock>
          <DFSectionTitle>Delivery Information</DFSectionTitle>
          <User data={ meta } />
          <MapComponent 
            mapinst         = " "
            latlon          = { latlon }
            maptext         = { "Delivery Location" }
            editable        = { false }
          />
        </DFBlock>
      </DFBlock>
    </DFContainer>
  </ModalComponent>
}

export default ViewOrderComponent