import { ACTIONS }  from '../constants'
import { fetch }    from 'whatwg-fetch'
import { notify }   from './appActions'

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


export function setOrderMeta (orderMeta) {
   return {
        type    : ACTIONS.SET_ORDER_META,
        payload : orderMeta
    }
}

export function changeOrderMeta (orderMeta) { 
   return {
        type    : ACTIONS.CHANGE_ORDER_META,
        payload : null
    }
}

export function undoChangeOrderMeta () {
   return {
        type    : ACTIONS.UNDO_CHANGE_ORDER_META,
        payload : null
    }
}

function userOrdersFound (response) {
    return {
        type    : ACTIONS.ORDERS_FOUND,
        payload : response
    }
}

function orderPlaced (response) {
    return {
        type    : ACTIONS.ORDER_PLACED,
        payload : response
    }
}

export function addItem(item) {

    return {
        type    : ACTIONS.ITEM_ADDED,
        payload : item
    }
}

export function removeItem(itemPid, itemIndex) {

    return {
        type    : ACTIONS.ITEM_REMOVED,
        payload : { pid: itemPid, index: itemIndex }
    }
}

export function userOrders (uid) {
    const endpoint      = '/api/orders/' + uid

    return (dispatch) => {
        fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
            dispatch(userOrdersFound(response.data))
        })
    }
}

export function placeOrder (order) {
    const endpoint      = '/api/orders/'
    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(order)
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            dispatch(orderPlaced(response))
            dispatch(notify('Order Placed Successfully', 'success'))

        })
        .catch((err) => {
            dispatch(notify('Order Could Not be Placed', 'error'))
        })
    }
}

