import { ACTIONS }  from '../constants'

const shopDefault = {
  orders: null
}

export default function shopReducer (state = shopDefault, action) {
  

  switch (action.type) {

    case ACTIONS.SHOP_ORDERS_FETCHED :

      return Object.assign({}, { orders: action.payload.data }) 

    case ACTIONS.ORDER_STATUS_UPDATED :
      console.log(action.payload.data)
      console.log(state)
      const shopOrders  = state.orders.slice()
      const order       = shopOrders.find(o => o._id === action.payload.data._id)
      const index       = shopOrders.indexOf(order)

      shopOrders[index].status = action.payload.data.status 

      return Object.assign({}, { orders: shopOrders }) 

    default :

      return state
  }
}