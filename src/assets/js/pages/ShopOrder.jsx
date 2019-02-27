import React, { PureComponent, Fragment }     from 'react'
import { connect }                            from 'react-redux'
import _                                      from 'lodash'
import moment                                 from 'moment'
import { withRouter }                         from "react-router-dom"

import { DFPageContainer, 
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
         orderStatusColor,
         orderTotal }                         from '../helper'

import APP_CONFIG                             from '../config'

import { shopOrders, 
         orderStatus, 
         archiveOrder }                       from '../store/actions/shopActions'

import { confirm }                            from '../store/actions/appActions'

import ItemOptions                            from '../components/order/ItemOptions.jsx'
import MapComponent                           from '../components/map/Map.jsx'
import PlayerComponent                        from '../components/widgets/Player.jsx'
import ConfirmComponent                       from '../components/widgets/Confirm.jsx'

const currentShop = APP_CONFIG.SHOP_ID

const confirmation = {
  started   : 'Confirm Start Order',
  delivered : 'Confirm Order Delivery',
  failed    : 'Confirm Failed Order'
}

const GoToShopButton =  withRouter(({ history }) => (
  <DFButton onClick={() => history.push(`/${ currentShop }/shop`) }>&lt; Back</DFButton>
))

class ShopOrderContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    if (!this.props.shop.orders || !this.props.shop.orders.length) {
      const token   = shopToken()
      this.props.shopOrders(token)
    }
  }

  renderOrder (orderId) {
    const token   = shopToken()

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
      orderItems.push(<DFContainer className="view-order-shop-item">
          <div key={`item-order-${ item.pid }`}>
            <DFSectionTitle className="padding-bottom-m">{ item.name } x { item.quantity }</DFSectionTitle>
            { item.options ? <ItemOptions options= {item.options} /> : null }
          </div> 
        </DFContainer>)
    })
    
  
    return  <DFContainer className={`order shop-order order-${ orderStatusClass(order) }`} style={{'border-color': `${orderStatusColor(order.status)}`}}>
      <PlayerComponent />
      <div className="order-status-actions padding-l">
        { order.status === ORDER_STATUS.NEW ? 
          <DFButton onClick={ () => this.props.confirm(confirmation.started) }>Start</DFButton> 
          : null }
        { order.status === ORDER_STATUS.STARTED ? 
          <Fragment>
            <DFButton onClick={ () => this.props.confirm(confirmation.delivered) } className="margin-right-xl">Delivered</DFButton>
            <DFButton onClick={ () => this.props.confirm(confirmation.failed) }>Failed</DFButton>
          </Fragment>
        : null }
      </div>
      <DFSectionTitle>{ when }</DFSectionTitle>
      <div  className="padding-v-l">{ orderItems }</div>
      <DFSubTitle className="padding-v-l">User Comments</DFSubTitle>
      <p>{ comment && comment.length ? comment : 'None' }</p>
      <DFSubTitle className="padding-v-l">Delivery Information</DFSubTitle>
      <p>{ firstName }</p>
      <p>{ secondName }</p>
      <p>{ addressLineOne }</p>
      <p>{ addressLineTwo }</p>
      <p>{ tel }</p>
      <MapComponent 
        latlon          = { latlon }
        maptext         = { "Delivery Location" }
        editable        = { false }
        mapinst         = "Order Location"
      />
    </DFContainer>
  }

  onConfirm (id, status, token) {
    this.props.orderStatus(id, status, token)
    this.props.confirm(null)
  }

  render () {
    const orderId = _.get(this.props, 'match.params.orderId', null)
    const token   = shopToken()

    const getConfirmationModal = (appConfirm) => {
 
      switch (appConfirm) {
        case confirmation.started :

          return <ConfirmComponent  
            onCancel  = { () => this.props.confirm(null) }
            onConfirm = { () => this.onConfirm(orderId, ORDER_STATUS.STARTED, token) }
            text      = { confirmation.started}
          />
        case confirmation.delivered :

          return <ConfirmComponent
            onCancel  = { () => this.props.confirm(null) }
            onConfirm = { () => this.onConfirm(orderId, ORDER_STATUS.DELIVERED, token) }
            text      = { confirmation.delivered}
          />
        case confirmation.failed :

          return <ConfirmComponent
            onCancel  = { () => this.props.confirm(null) }
            onConfirm = { () => this.onConfirm(order._id, ORDER_STATUS.FAILED, token) }
            text      = { confirmation.failed}
          />
        default :
          return null
      }
    }

    const confirmModal = getConfirmationModal(this.props.app.confirm)

    return (<DFPageContainer className="shop-page">
      <DFContainer className="margin-v-xl">
      <GoToShopButton />
      { confirmModal }
      </DFContainer>
      <DFContainer>
        { this.renderOrder(orderId) }
      </DFContainer>
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
  shopOrders    : (token) => dispatch(shopOrders(token)),
  orderStatus   : (oid, status, token) => dispatch(orderStatus(oid, status, token)),
  archiveOrder  : (oid) => dispatch(archiveOrder(oid, status)),
  confirm       : (txt) => dispatch(confirm(txt))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopOrderContainer)