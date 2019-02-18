import React, { PureComponent }             from 'react'
import { connect }                          from 'react-redux'
import _                                    from 'lodash'
import moment                               from 'moment'
import { withRouter }                       from "react-router-dom"

import { DFPageContainer, 
         DFContainer,
         DFItem,
         DFButton,
         DFPageTitle }                      from '../elements/library'

import { shopToken,
         displayStatus,
         ORDER_STATUS,
         orderStatusClass,
         orderTotal, }                      from '../helper'
import APP_CONFIG                           from '../config'
import { shopOrders, 
         orderStatus, 
         archiveOrder }                     from '../store/actions/shopActions'

class GoToOrderComponent extends PureComponent{
  constructor (props) {
    super(props)
  }

  render () {
    return  <DFButton onClick={() => this.props.history.push('/shop-order/' + this.props.oid) }>View</DFButton>
  }
}

const GoToOrderButton =  withRouter(GoToOrderComponent)

class ShopContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const token = shopToken()

    this.props.shopOrders(token)
  }

  renderOrders () {
    if (this.props.shop.orders && this.props.shop.orders.length)  {

      const userOrders = this.props.shop.orders.map((order) => {

        const created = moment(order.createdAt).format(APP_CONFIG.DATE_FORMAT)
        const status  = displayStatus(order.status)

        return  <DFContainer className={`order order-${ orderStatusClass(order) }`}>
          <DFItem>{ created }</DFItem>
          <DFItem className="low-case">{ status }</DFItem>

          <GoToOrderButton oid={ order._id } />
          
          <DFContainer className="order-status-actions">
            <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.STARTED)}>Start</DFButton>
            <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.DELIVERED)}>Delivered</DFButton>
            <DFButton onClick={() => this.props.orderStatus(order._id, ORDER_STATUS.FAILED)}>Failed</DFButton>
          </DFContainer>
        </DFContainer>
      })

      return <DFContainer>
        { userOrders }
      </DFContainer>
    }

    return null
  
  }
  render () {

    return (<DFPageContainer className="shop-container">
      <DFPageTitle>Shop Area</DFPageTitle>
      <DFPageContainer>
        { this.renderOrders() }
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
  shopOrders  : (token) => dispatch(shopOrders(token)),
  orderStatus  : (oid, status) => dispatch(orderStatus(oid, status)),
  archiveOrder : (oid) => dispatch(archiveOrder(oid, status))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)