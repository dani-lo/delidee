import React, { PureComponent }     from 'react'
import _                            from 'lodash'
import moment                       from 'moment'
import { withRouter }               from "react-router-dom"
import { connect }                  from 'react-redux'

import APP_CONFIG                   from '../config'
import { DFPageContainer, 
         DFContainer,
         DFButton,
         DFBlock,
         DFSectionTitle,
         DFSubTitle,
         DFLabel,
         DFInputsField,
         DFInput}                  from '../elements/library'
import { placeOrder, 
         userOrders, 
         setOrderMeta,
         changeOrderMeta, 
         removeItem,
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
         shopToken,
         orderStatusClass,
         orderStatusColor,
         orderStatusContent }       from '../helper'

const AppLink     =  withRouter(( props ) => {
  const {history, text, page } = props

  return <a 
    href="#" 
    onClick={() => history.push(`/${ currentShop }/${ page }`) } 
  >{ text }</a>
})

const currentShop       = APP_CONFIG.SHOP_ID
const confirmSubmission = 'Place Order?'

class CheckoutContainer extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    const user          = this.props.user 

    if (user && user._id) {
      this.props.getOrders(user._id) 

      window.scrollTo(0, 0)
    }
  }

  submitOrder () {
    const user          = this.props.user 
    const currentOrder  = this.props.orders.current
    const comment       = this.state.comment || ''

    const order = {
        uid       : user._id,
        meta      : currentOrder.meta ? currentOrder.meta : {metaData: Object.assign({}, user)},
        total     : orderTotal(this.props.orders.current.items),
        items     : currentOrder.items,
        comment   : comment
      }

    this.props.finaliseOrder(order)
    this.props.confirm(null)

    this.props.history.push(`/${ currentShop }/orders`)
  }

  userDelivery () {
    if (!this.props.user || !this.props.user._id || (this.props.orders && this.props.orders.current && this.props.orders.current.changeMeta)) {
      return <DFContainer>
      <DFSubTitle>No Delivery Information</DFSubTitle>
      <p>You need to login or register an account to place this order</p>
      <p><AppLink page="account" text="Got to registration" /></p>
    </DFContainer>
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

    this.props.orders.current.items.map((item) => {

      if (item.quantity > 1) {
        for (let i = 0; i < item.quantity; i++) {
          const itemData = {
            pid: item.pid,
            name: item.name,
            price: item.price,
            options: item.options && item.options[i] ? [item.options[i]] : null
          }
          order.push(
            <div className="checkout-order-item margin-bottom-l">
              <Item data={ itemData } />
              <DFButton 
                cancel
                onClick = { () => this.props.removeOrderItem(item.pid, i) }
              >Delete from order</DFButton>
            </div>)
        }
      } else {
        order.push(  <div className="checkout-order-item margin-bottom-l">
              <Item data={ item } />
              <DFButton 
                cancel
                onClick = { () => this.props.removeOrderItem(item.pid) }
              >Delete from order</DFButton>
            </div>)
      }
      //this.props.removeOrderItem(pid, i)
      
    })

    return order
  }

  renderCurrentOrder () {
    if (this.props.orders.current && this.props.orders.current.items && this.props.orders.current.items.length) {
      
      const order = []

      return <DFContainer>
        <DFSubTitle>Current Order</DFSubTitle>
        <DFContainer className="padding-bottom-xl">
          {
            this.buildOrder()
          }
          <DFSectionTitle>Order Total { orderTotal(this.props.orders.current.items) } THB</DFSectionTitle>
          { this.props.user && this.props.user._id ? 
          <DFContainer>
            <DFInputsField>
              <DFLabel className="padding-v-l">Comments</DFLabel>
              <DFInput.TxtArea 
                rows="4"
                value={ this.state.comment }
                onChange={(e) => this.setState({comment: e.target.value})}
                placeholder="order comments"
              />
            </DFInputsField>
          <DFBlock actions  className="padding-top-xl">
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
          </DFContainer> : null }
          
        </DFContainer> 
        <DFBlock  className="padding-top-l">
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
    const token = shopToken()

    if (token) {
      this.props.history.push(`/${ currentShop }/shop`)

      return null
    }
    
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
  confirm             : (txt) => dispatch(confirm(txt)),
  removeOrderItem     : (pid, i) => dispatch(removeItem(pid, i))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer)