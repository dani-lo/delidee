import { ACTIONS }  from '../constants'
import { fetch }    from 'whatwg-fetch'

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function shopStatusUpdated (response) {
    return {
        type    : ACTIONS.ORDER_STATUS_UPDATED,
        payload : response
    }
}

function shopOrdersFetched (response) {
    return {
        type    : ACTIONS.SHOP_ORDERS_FETCHED,
        payload : response
    }
}

export function shopOrder (oid) {
  return {
        type    : ACTIONS.SHOP_ORDER_VIEW,
        payload : orderMeta
    }
}

export function shopOrders (token) {

    const endpoint      = '/api/shop/orders'
    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(Object.assign({}, {token: token}))
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            dispatch(shopOrdersFetched(response))
        })
    }
}

export function orderStatus(oid, status, token) {
    const endpoint      = '/api/shop/order-status/' + oid

    console.log((Object.assign({}, {token: token, oid: oid, status: status})))
    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(Object.assign({}, {token: token, oid: oid, status: status}))
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            dispatch(shopStatusUpdated(response))
        })
    }
}

export function archiveOrder() {
    
}