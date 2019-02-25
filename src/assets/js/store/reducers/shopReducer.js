import { ACTIONS }      from '../constants'
import { ORDER_STATUS}  from '../../helper'

const shopDefault = {
  orders: null,
  hasNew: false,
  shoperror: false
}

const hasNewOrder = (orders) => {
  if (!orders) {
    return false
  }

  const existing = orders.find(o => o.status === ORDER_STATUS.NEW)

  return !!existing
}

export default function shopReducer (state = shopDefault, action) {
  
  let hasNew

  switch (action.type) {
    
    case ACTIONS.SHOP_ERROR :
      const msg = action.payload

      if (msg && msg !== null) {
        return Object.assign({}, state, {shoperror: msg}) 
      }
      
      return Object.assign({}, state, {shoperror: false}) 

    case ACTIONS.SHOP_ORDERS_FETCHED :

      const orders = action.payload.data

      hasNew = hasNewOrder(orders)

      return Object.assign({}, { orders:  orders && orders.length ? orders.reverse() : [] }, {hasNew: hasNew, shoperror: false}) 

    case ACTIONS.ORDER_STATUS_UPDATED :
      
      const shopOrders  = state.orders.slice()
      const order       = shopOrders.find(o => o._id === action.payload.data._id)
      const index       = shopOrders.indexOf(order)

      shopOrders[index].status = action.payload.data.status 

      hasNew = hasNewOrder(shopOrders) 

      return Object.assign({}, { orders: shopOrders }, {hasNew: hasNew, shoperror: false}) 

    case ACTIONS.NEW_ORDERS_POLLED :

      const polledOrders  = action.payload.data
      const stateOrders   = state.orders ? state.orders.slice() : []

      if (polledOrders && polledOrders.length) {
   
        polledOrders.map(o => {

          const existing = stateOrders.find(stateOrder => o._id === stateOrder._id)

          if (!existing) {

            stateOrders.unshift(o)
          }
        })

        if (stateOrders && stateOrders.length) {

          hasNew = hasNewOrder(stateOrders)  

          return Object.assign({}, { orders: stateOrders }, {hasNew: hasNew, shoperror: false})  
        }
      }

      return Object.assign({}, state, {hasNew: false, shoperror: false}) 
    default :

      return state
  }
}