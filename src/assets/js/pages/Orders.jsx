import React, { PureComponent }     from 'react'
import _                            from 'lodash'
import moment                       from 'moment'
import { connect }                  from 'react-redux'

import APP_CONFIG                   from '../config'

import { DFPageContainer, 
         DFContainer,
         DFButton,
         DFSectionTitle,
         DFSubTitle,
         DFItem,
         DFPageTitle }              from '../elements/library'

import { placeOrder, 
         userOrders, 
         setOrderMeta,
         changeOrderMeta, 
         undoChangeOrderMeta }      from '../store/actions/ordersActions'

import { showOrder, 
         hideOrder }                from '../store/actions/appActions'

import ShowUserComponent            from '../components/user/ShowUser.jsx'
import ViewOrderComponent           from '../components/order/ViewOrder.jsx'
import OrderMetaComponent           from '../components/order/Meta.jsx'
import { itemOptions }              from '../components/order/util.jsx'

import { validUser,
         orderTotal,
         orderStatusClass,
         displayStatus }            from '../helper'


class OrdersContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    const user          = this.props.user 

    if (user && user._id) {
      this.props.getOrders(user._id) 
    }
  }

  submitOrder () {
    const user          = this.props.user 
    const currentOrder  = this.props.orders.current

    const order = {
        uid       : user._id,
        meta      : currentOrder.meta,
        total     : orderTotal(this.props.orders.current.items),
        items     : currentOrder.items,
        comment   : currentOrder.comment
      }

    this.props.finaliseOrder(order)
  }

  

  userDelivery () {
    if (!this.props.user || (this.props.orders && this.props.orders.current && this.props.orders.current.changeMeta)) {
      return null
    }
    let userName, secondName, addressLineOne, addressLineTwo, tel, latlon

    if (_.get(this.props.orders, 'current.meta.metaData')) {
      userName        = this.props.orders.current.meta.metaData.userName
      secondName      = this.props.orders.current.meta.metaData.secondName
      addressLineOne  = this.props.orders.current.meta.metaData.addressLineOne
      addressLineTwo  = this.props.orders.current.meta.metaData.addressLineTwo
      tel             = this.props.orders.current.meta.metaData.tel
      latlon          = this.props.orders.current.meta.metaData.latlon
    } else if (this.props.user) {
      userName        = this.props.user.userName
      secondName      = this.props.user.secondName
      addressLineOne  = this.props.user.addressLineOne
      addressLineTwo  = this.props.user.addressLineTwo
      tel             = this.props.user.tel
      latlon          = this.props.user.latlon
    }

    return <DFContainer>
      <DFSubTitle>Delivering to</DFSubTitle>
      <ShowUserComponent 
        latlon          = { latlon }
        maptext         = "Delivery Location"
        editable        = { false }
        override        = { true }
      />
      <DFButton
        onClick={ () =>  this.props.changeOrderMeta() }
      >
        Change Delivery Information
      </DFButton>
    </DFContainer>
  }

  renderCurrentOrder () {
    if (this.props.user && this.props.orders.current && this.props.orders.current.items && this.props.orders.current.items.length) {

      return <DFContainer>
            <DFSectionTitle>Current Order</DFSectionTitle>
            <DFContainer>
              {
                this.props.orders.current.items.map(item => {

                  return <div key={`item-order-${ item.pid }`}>
                    <DFItem>{ item.name } x { item.quantity }</DFItem>
                    <p>subtotal { item.price * item.quantity }</p>
                    { itemOptions(item.options) }
                  </div>
                })
              }
              <h4>total { orderTotal(this.props.orders.current.items) }</h4>
            </DFContainer>
            { this.userDelivery() }
          <DFContainer>
            <DFButton
              onClick={ () => this.submitOrder() }
            >
              Submit Order
            </DFButton>
        </DFContainer>
      </DFContainer>
    }
  }

  renderHistoryOrders () {
    

    if (this.props.orders.history && this.props.orders.history.length)  {

      const historical = this.props.orders.history.map((order) => {

        const created = moment(order.createdAt).format(APP_CONFIG.DATE_FORMAT)
        const status  = displayStatus(order.status)

        return  <DFContainer className={`order order-${ orderStatusClass(order) }`}>
          <DFItem>{ created }</DFItem>
          <DFItem className="low-case">{ status }</DFItem>
          <DFButton onClick={() => this.props.viewOrder(order._id)}>View Order</DFButton>
        </DFContainer>
      })

      return <DFContainer>
        <DFSubTitle>History</DFSubTitle>
        { historical }
      </DFContainer>
    }

    return null
  }

  

  renderNoHistory () {
    const noHistory = !this.props.orders.history || this.props.orders.history.length === 0 || !this.props.user._id

    if (this.props.user._id && this.props.orders.history === null) {
      return <p>Loading</p>
    } else if (noHistory) {
      return <DFContainer>
            <DFSectionTitle>No Orders to show</DFSectionTitle>
        </DFContainer>
    }
  }

  onAccountMeta () {

    if (this.props.user && validUser(this.props.user)) {

      this.props.setOrderMeta({
        metaData: this.props.user,
        metaType: 'ACCOUNT'
      })
    }
  }

  onCustomMeta (userMeta) {

    if (validUser(userMeta)) {
      this.props.setOrderMeta({
        metaData: userMeta,
        metaType: 'CUSTOM'
      })
    }
  }
  
  onCancelMeta () {
    return this.props.undoChangeOrderMeta()
  }

  render () {
    const changeMeta      = this.props.orders.current && this.props.orders.current.changeMeta
    const viewOrder       = this.props.app.showOrder && this.props.orders.history && this.props.orders.history.length
    
    const viewOrderModal  = viewOrder ? <ViewOrderComponent
      order   = { this.props.orders.history.find(o => o._id === this.props.app.showOrder) }
      onCancel= { () => this.props.hideOrder() }
    /> : null

    const changeMetaModal = changeMeta ? <OrderMetaComponent 
      user      = { this.props.user }
      orders    = { this.props.orders }
      onConfirm = { (userMeta) => this.onCustomMeta(userMeta) }
      onCancel  = { () => this.onCancelMeta() }
    /> : null

    return <DFPageContainer>
      { viewOrderModal }
      { changeMetaModal }
      { viewOrderModal ? null : this.renderCurrentOrder()}
      { this.renderHistoryOrders() }
      { this.renderNoHistory() }
    </DFPageContainer>
  }
}


const mapStateToProps = (state) => {
    return {
        orders: state.orders,
        user: state.user ,
        app: state.app
    }
}

const mapDispatchToProps = dispatch => ({ 
  finaliseOrder       : (orderData) => dispatch(placeOrder(orderData)),
  getOrders           : (uid) => dispatch(userOrders(uid)),
  setOrderMeta        : (userMeta) => dispatch(setOrderMeta(userMeta)),
  changeOrderMeta     : () => dispatch(changeOrderMeta()),
  undoChangeOrderMeta : () => dispatch(undoChangeOrderMeta()),
  viewOrder           : (orderId) => dispatch(showOrder(orderId)),
  hideOrder           : () => dispatch(hideOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)