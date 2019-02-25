import React, { PureComponent }     from 'react'
import _                            from 'lodash'
import moment                       from 'moment'
import { connect }                  from 'react-redux'

import APP_CONFIG                   from '../config'

import { DFPageContainer, 
         DFContainer,
         DFButton,
         DFBlock,
         DFSectionTitle,
         DFSubTitle,
         DFItem,  
         DFIcon}                  from '../elements/library'

import { placeOrder, 
         userOrders, 
         setOrderMeta,
         changeOrderMeta, 
         undoChangeOrderMeta }      from '../store/actions/ordersActions'

import { showOrder, 
         confirm,
         hideOrder }                from '../store/actions/appActions'

import ShowUserComponent            from '../components/user/ShowUser.jsx'
import ViewOrderComponent           from '../components/order/ViewOrder.jsx'
import OrderMetaComponent           from '../components/order/Meta.jsx'
import ConfirmComponent             from '../components/widgets/Confirm.jsx'

import { validUser,
         orderTotal,
         Item,
         orderStatusClass,
         orderStatusColor,
         orderStatusContent }       from '../helper'

const currentShop       = APP_CONFIG.SHOP_ID
const confirmSubmission = 'Place Order?'

class CheckoutContainer extends PureComponent {
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
        meta      : currentOrder.meta ? currentOrder.meta : {metaData: Object.assign({}, user)},
        total     : orderTotal(this.props.orders.current.items),
        items     : currentOrder.items,
        comment   : currentOrder.comment
      }

    this.props.finaliseOrder(order)
    this.props.confirm(null)

    this.props.history.push(`/${ currentShop }/orders`)
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
      
    </DFContainer>
  }

  buildOrder () {
    const order = []

    this.props.orders.current.items.map(item => {

      if (item.quantity > 1) {
        for (let i = 0; i < item.quantity; i++) {
          const itemData = {
            pid: item.pid,
            name: item.name,
            price: item.price,
            options: item.options && item.options[i] ? [item.options[i]] : null
          }
          order.push(<Item data={ itemData } />)
        }
      } else {
        order.push(<Item data={ item } />)
      }
      
    })

    return order
  }

  renderCurrentOrder () {
    if (this.props.user && this.props.orders.current && this.props.orders.current.items && this.props.orders.current.items.length) {
      
      const order = []

      return <DFContainer>
        <DFSubTitle>Current Order</DFSubTitle>
        <DFBlock className="padding-bottom-xl">
          {
            this.buildOrder()
          }
          <DFSectionTitle>Order Total { orderTotal(this.props.orders.current.items) } THB</DFSectionTitle>
          <DFBlock actions>
            <DFButton
              className="margin-right-m"
              onClick={ () => this.props.confirm(confirmSubmission) }
            >
                Submit Order
            </DFButton>
            <DFButton
              onClick={ () =>  this.props.changeOrderMeta() }
            >
              Change Delivery
            </DFButton>
          </DFBlock>
          
        </DFBlock>
        <DFBlock  className="padding-top-xl">
        { this.userDelivery() }
        </DFBlock>
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
    
    const changeMetaModal = changeMeta ? <OrderMetaComponent 
      user      = { this.props.user }
      orders    = { this.props.orders }
      onConfirm = { (userMeta) => this.onCustomMeta(userMeta) }
      onCancel  = { () => this.onCancelMeta() }
    /> : null

    const confirmModal = this.props.app.confirm && this.props.app.confirm === confirmSubmission ? <ConfirmComponent
      onCancel  = { () => this.props.confirm(null) }
      onConfirm = { () => this.submitOrder() }
      text      = { confirmSubmission}
    /> : null

    return <DFPageContainer className="orders-page">
      { confirmModal }
      { changeMetaModal }
      { this.renderCurrentOrder()}
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
  hideOrder           : () => dispatch(hideOrder()),
  confirm             : (txt) => dispatch(confirm(txt))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)