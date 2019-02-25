import { ACTIONS }  from '../constants'
import { fetch }    from 'whatwg-fetch'

const postHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

function shopNewOrdersPolled (response) {
  return {
        type    : ACTIONS.NEW_ORDERS_POLLED,
        payload : response
    }
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


function shopError (msg) {
    return {
        type    : ACTIONS.SHOP_ERROR,
        payload : msg
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
            console.log(response)
            if (response && response.msg === 'ok') {
                dispatch(shopOrdersFetched(response))
            } else {
                dispatch(shopError('Error Fetching Orders!'))
            }
            
        })
        .catch((err) => {
            dispatch(shopError('Error Fetching Orders!'))
        })
    }
}

export function orderStatus(oid, status, token) {
    const endpoint      = '/api/shop/order-status/' + oid

    const postOptions   = {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(Object.assign({}, {token: token, oid: oid, status: status}))
    }

    return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            if (response && response.msg === 'ok') {
                dispatch(shopStatusUpdated(response))
            } else {
                dispatch(shopError('Error Fetching Orders!'))
            }
            
        })
        .catch((err) => {
            dispatch(shopError('Error Fetching Orders!'))
        })
    }
}

export function pollNewOrders (token) {
  const endpoint      = '/api/shop/new-orders'
  
  const postOptions   = {
      method: 'POST',
      headers: postHeaders,
      body: JSON.stringify(Object.assign({}, {token: token}))
  }

  return (dispatch) => {
        fetch(endpoint, postOptions)
        .then((response) => response.json())
        .then((response) => {
            if (response && response.msg === 'ok') {
                dispatch(shopNewOrdersPolled(response))
            } else {
                dispatch(shopError('Error Fetching New Orders!'))
            }

            
            
        })
        .catch((err) => {
            dispatch(shopError('Error Fetching New Orders!'))
        })
    }
}

export function archiveOrder() {
    
}