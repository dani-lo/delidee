const ls = require('local-storage')
 
const ORDER_STATUS = {
  NEW       : 'NEW', 
  STARTED   : 'STARTED', 
  DELIVERED : 'DELIVERED',
  REJECTED  : 'REJECTED',
  FAILED    :  'FAILED'
}

const isFilled = (state = {}, field) => {
  return state[field] !== null && state[field] !== ''
}

const shopToken = (token = null) => {
  if (token !== null && isValidToken(token)) {

    return ls('token', token)
  }

  return ls('token')
}

const isValidToken = (token) => {
  return typeof(token) === 'number' && String(token).length === 13
}

const orderStatusClass = (o) => {
  return o.status.toLowerCase()
}

const displayStatus = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW: 
      return 'This order has been submitted and is waiting for restaurant staff to accept it'
    case ORDER_STATUS.STARTED: 
      return 'This order has been accepted by staff and is being prepared'
    case ORDER_STATUS.OUT: 
      return 'This order has been prepared and is on its way to your location'
    case ORDER_STATUS.DELIVERED: 
      return 'This order has been delivered'
    case ORDER_STATUS.FAILED: 
      return 'This order has been prepared and shipped but we could not deliver it to you'
  }
}

const validUser = (user) => {
  return user.userName    &&
      user.firstName      &&
      user.addressLineOne &&
      user.latlon         
}

const orderTotal = (items) => {
  return  items.reduce((prev, cur) => prev + parseInt(cur.price * cur.quantity), 0)
}

export {
  isFilled,
  ORDER_STATUS,
  shopToken,
  validUser,
  orderStatusClass,
  displayStatus,
  orderTotal
}