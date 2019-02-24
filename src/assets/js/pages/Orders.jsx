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
         DFIcon}                    from '../elements/library'

import { userOrders }               from '../store/actions/ordersActions'

import { showOrder, 
         confirm,
         hideOrder }                from '../store/actions/appActions'

import ViewOrderComponent           from '../components/order/ViewOrder.jsx'

import { validUser,
         orderStatusClass,
         orderStatusColor,
         orderStatusContent }       from '../helper'

const confirmSubmission = 'Place Order?'

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

  renderHistoryOrders () {

    if (this.props.orders.history && this.props.orders.history.length)  {

      const historical = this.props.orders.history.map((order) => {

        const created       = moment(order.createdAt).format(APP_CONFIG.DATE_FORMAT)
        const statusContent = orderStatusContent(order.status)

        return  <DFContainer className={`margin-v-m order client-order order-${ orderStatusClass(order) }`} style={{'border-color': `${orderStatusColor(order.status)}`}}>
          <DFIcon className={ `order-status ${ statusContent.icon }`} status={ order.status } />
          <DFSectionTitle>
            { created }
          </DFSectionTitle>
          <p className="low-case">{ statusContent.txt }</p>
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
  
  onCancelMeta () {
    return this.props.undoChangeOrderMeta()
  }

  render () {
    const viewOrder       = this.props.app.showOrder && this.props.orders.history && this.props.orders.history.length
    
    const viewOrderModal  = viewOrder ? <ViewOrderComponent
      order   = { this.props.orders.history.find(o => o._id === this.props.app.showOrder) }
      onCancel= { () => this.props.hideOrder() }
    /> : null

    return <DFPageContainer className="orders-page">
      { viewOrderModal }
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
  getOrders           : (uid) => dispatch(userOrders(uid)),
  viewOrder           : (orderId) => dispatch(showOrder(orderId)),
  hideOrder           : () => dispatch(hideOrder())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer)