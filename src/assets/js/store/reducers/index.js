import { combineReducers }  from 'redux'

import menuReducer          from './menuReducer'
import appReducer           from './appReducer'
import accountReducer       from './accountReducer'
import ordersReducer        from './ordersReducer'
import shopReducer          from './shopReducer' 

export default combineReducers({
    app:  appReducer,
    menu: menuReducer,
    user: accountReducer,
    orders: ordersReducer,
    shop: shopReducer
})