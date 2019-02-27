import React, { PureComponent, Fragment }   from 'react'
import { connect }                          from 'react-redux'
import _                                    from 'lodash'
import moment                               from 'moment'
import { withRouter }                       from "react-router-dom"

import { DFPageContainer, 
         DFContainer,
         DFItem,
         DFIcon,
         DFButton,
         DFSectionTitle,
         DFPageTitle, 
         DFSubTitle}                        from '../elements/library'

import PlayerComponent                      from '../components/widgets/Player.jsx'

import { shopToken,
         displayStatus,
         orderStatusContent,
         orderStatusColor,
         ORDER_STATUS,
         orderStatusClass,
         getAppGlobal,
         setAppGlobal,
         Item,
         startShopAlert,
         stopShopAlert,
         orderTotal }                       from '../helper'

import APP_CONFIG                           from '../config'

import { shopOrders, 
         pollNewOrders }                    from '../store/actions/shopActions'


const currentShop = APP_CONFIG.SHOP_ID

class GoToOrderComponent extends PureComponent{
  constructor (props) {
    super(props)
  }

  render () {
    return  <DFButton onClick={() => this.props.history.push(`/${ currentShop }/shop-order/${ this.props.oid }`) }>View &gt;</DFButton>
  }
}

const GoToOrderButton =  withRouter(GoToOrderComponent)

class ShopContainer extends PureComponent {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const token = shopToken()

    if (!this.props.shop.orders || !this.props.shop.orders.length) {
      this.props.shopOrders(token)
    }

    this.poll()
  }

  componentWillUnmount () {
    this.unpoll()
  }

  unpoll () {
    let pollInterval = getAppGlobal('POLL_INTERVAL')

    if (pollInterval) {
      setAppGlobal('POLL_INTERVAL', null)
      clearInterval(pollInterval)
    }
  }

  poll () {
    const token = shopToken()

    let pollInterval = getAppGlobal('POLL_INTERVAL')

    if (!pollInterval) {
      pollInterval = setInterval(() => {

        this.props.pollNewOrders(token)
      }, 60000)

      setAppGlobal('POLL_INTERVAL', pollInterval)
    }
  }

  renderOrder (order) {
    const created       = moment(order.createdAt).format(APP_CONFIG.DATE_FORMAT)
    const status        = displayStatus(order.status ? order.status : '')
    const statusContent = orderStatusContent(order.status)
    const { firstName, secondName, userName } = _.get(order, 'meta.metaData', {})
    
    return  <DFContainer className={`margin-v-m order client-order order-${ orderStatusClass(order) }`} style={{'border-color': `${orderStatusColor(order.status)}`}}>
      <DFIcon className={ `order-status ${ statusContent.icon }`} status={ order.status } />
      <DFSubTitle className="padding-bottom-m">{ `${ firstName ? firstName : '' } ${ secondName ? secondName : '' } (${ userName })` }<span className="padding-left-l">{ created }</span></DFSubTitle>
      <DFItem className="low-case">{ status }</DFItem>

      <GoToOrderButton oid={ order._id } />
    </DFContainer>
  }

  renderOrders () {
    if (this.props.shop.hasNew || this.props.shop.shoperror) {
      startShopAlert()
    } else {
      stopShopAlert()
    }
    
    if (this.props.shop.orders && this.props.shop.orders.length)  {
      const grouped = _.groupBy(this.props.shop.orders, 'status')

      let newOrders, startedOrders, otherOrders 

      if (grouped[ORDER_STATUS.NEW]) {
        newOrders = grouped[ORDER_STATUS.NEW].map((order) => {

          return this.renderOrder(order)
        })
      } else {
        newOrders = null
      }
      
      if (grouped[ORDER_STATUS.STARTED]) {
        startedOrders = grouped[ORDER_STATUS.STARTED].map((order) => {

          return this.renderOrder(order)
        })
      } else {
        startedOrders = null
      }

      otherOrders = this.props.shop.orders.map((order) => {
        if (order.status === ORDER_STATUS.NEW || order.status === ORDER_STATUS.STARTED) {
          return null
        }
        return this.renderOrder(order)
      })

      return <DFContainer>
        { !newOrders && !startedOrders && !otherOrders ? 
           <DFSubTitle className="padding-v-l margin-v-xl">No Orders To Show</DFSubTitle> : null}
        { newOrders ? 
          <Fragment>
            <DFSubTitle className="padding-v-l margin-v-xl">New Orders</DFSubTitle>
            { newOrders }
          </Fragment> : null }
          { startedOrders ? 
          <Fragment>
            <DFSubTitle className="padding-v-l margin-v-xl">Started Orders</DFSubTitle>
            { startedOrders }
          </Fragment> : null }
          { otherOrders ? 
          <Fragment>
            <DFSubTitle className="padding-v-l margin-v-xl">Other Orders</DFSubTitle>
            { otherOrders }
          </Fragment> : null }
      </DFContainer>
    }

    return null
  
  }
  render () {
    let errorDisplay = false

    if (this.props.shop.shoperror) {
      errorDisplay = true 
    }

    return (<DFPageContainer className="shop-page">
      { errorDisplay ? <div className="app-error"><p>ERROR</p></div> : null }
      <PlayerComponent />
        { this.renderOrders() }
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
  pollNewOrders : (token) => dispatch(pollNewOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)