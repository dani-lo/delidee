import { ACTIONS }  from '../constants'

const orderDefault = {
  items: [],
  comment: null,
  meta: null,
  latlon: null
}

export default function ordersReducer (state = { current: orderDefault, history: null }, action) {
  
  let curr

  switch (action.type) {

    case ACTIONS.ORDER_PLACED:
      const newOrder  = action.payload.data
      const history   = state.history ? state.history.slice() : []

      history.unshift(newOrder)

      return Object.assign({}, state, { current: orderDefault, history: history })

    case ACTIONS.ITEM_ADDED:

      curr        = Object.assign({}, state.current)
      const item  = action.payload
      
      return Object.assign({}, state, {current: Object.assign({}, curr, {items: curr.items.concat(item)})})

    case ACTIONS.ITEM_REMOVED:
      curr = Object.assign({}, state.current, {items: []})

      const pid     = action.payload

      for (let item of state.current.items) {
        if (item.pid !== pid) {
          curr.items.push(item)
        }
      }

      return Object.assign({}, state, {current: curr})
    
    case ACTIONS.ORDERS_FOUND:
      const ordersHistory = action.payload || []
      
      return Object.assign({}, state, {history: ordersHistory.reverse()})

    case ACTIONS.SET_ORDER_META :

      curr        = Object.assign({}, state.current)

      const meta  = action.payload

      curr.changeMeta = false
      curr.meta       =  action.payload

      return Object.assign({}, state, { current: curr })

    case ACTIONS.CHANGE_ORDER_META :
      curr  = Object.assign({}, state.current)
      curr.changeMeta = true

      return Object.assign({}, state, { current: curr })

    case ACTIONS.UNDO_CHANGE_ORDER_META :
      curr  = Object.assign({}, state.current)
      curr.changeMeta = false

      return Object.assign({}, state, { current: curr })

    default :

      return state
  }
}