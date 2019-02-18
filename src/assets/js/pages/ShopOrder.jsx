import React, { PureComponent }               from 'react'
import { connect }                            from 'react-redux'
import _                                      from 'lodash'
import moment                                 from 'moment'
import { withRouter }                         from "react-router-dom"

import {DFPageContainer, 
         DFContainer,
         DFSectionTitle,
         DFSubTitle,
         DFItem,
         DFButton,
         DFPageTitle }                        from '../elements/library'

import { shopToken,
         displayStatus,
         DATE_FORMAT,
         ORDER_STATUS,
         orderStatusClass,
         orderTotal, }                        from '../helper'
import APP_CONFIG                             from '../config'
import { shopOrders, 
         orderStatus, 
         archiveOrder }                       from '../store/actions/shopActions'

import { itemOptions }                        from '../components/order/util.jsx'
import MapComponent                           from '../components/map/Map.jsx'

const GoToShopButton =  withRouter(({ history }) => (
  <DFButton onClick={() => history.push('/shop') }>Back</DFButton>
))

class ShopOrderContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  renderOrder (orderId) {
    const token   = shopToken()
    console.log(token)
    if (!this.props.shop.orders || !this.props.shop.orders.length) {
      return null
    }

    const order       = this.props.shop.orders.find(o => o._id === orderId)
    const orderItems  = []
    
    const meta = order.meta && order.meta.metaData ? order.meta.metaData : {}

    const firstName       = meta.firstName
    const secondName      = meta.secondName
    const addressLineOne  = meta.addressLineOne
    const addressLineTwo  = meta.addressLineTwo
    const tel             = meta.tel
    const latlon          = meta.latlon
    const status          = order.status
    const comment         = order.comment
    const when            = moment(order.createdAt).format(APP_CONFIG.DATE_FORMAT)
    
    order.items.map(item => {
      orderItems.push(<DFContainer>
          <div key={`item-order-${ item.pid }`}>
            <DFItem>{ item.name } x { item.quantity }</DFItem>
            <p>{ item.price }</p>
            { item.options ? itemOptions(item.options) : null }
          </div> 
        </DFContainer>)
    })
    
    return  <DFContainer className={`order order-${ orderStatusClass(order) }`}>
      <DFContainer className="order-status-actions">
        <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.STARTED, token)}>Start</DFButton>
        <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.DELIVERED, token)}>Delivered</DFButton>
        <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.FAILED, token)}>Failed</DFButton>
      </DFContainer>
      <DFSectionTitle>{ when }</DFSectionTitle>
      <DFSubTitle>{ displayStatus(status) }</DFSubTitle>
      <DFSubTitle>Order Items</DFSubTitle>
      { orderItems }
      <DFSubTitle>User Comments</DFSubTitle>
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
  }

  render () {
    const orderId = _.get(this.props, 'match.params.orderId', null)
    console.log('RENDER!')
    return (<DFPageContainer className="shop-container">
      <GoToShopButton />
      <DFPageContainer>
        { this.renderOrder(orderId) }
      </DFPageContainer>
    </DFPageContainer>)
  }
}

const mapStateToProps = (state) => {
    return {
        shop: state.shop,
        app : state.app
    }
}

const mapDispatchToProps = dispatch => ({
  shopOrders  : () => dispatch(shopOrders()),
  orderStatus  : (oid, status, token) => dispatch(orderStatus(oid, status, token)),
  archiveOrder : (oid) => dispatch(archiveOrder(oid, status))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopOrderContainer)