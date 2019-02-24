import React, { Fragment }  from 'react'

import ls                   from 'local-storage'
import NoSleep              from 'nosleep.js'

import { DFItem,
         DFSubTitle }       from './elements/library'
import ItemOptions          from './components/order/ItemOptions.jsx'

const noSleep = new NoSleep()

const ORDER_STATUS = {
  NEW       : 'NEW', 
  STARTED   : 'STARTED', 
  DELIVERED : 'DELIVERED',
  REJECTED  : 'REJECTED',
  FAILED    :  'FAILED'
}

const _GLOBAL = {
  PUSH_INTERVAL: false
}

const isScreenLocked = () => {
  return ls('LOCKED')
}

const lockScreen = () => {
  noSleep.enable()
  
  ls('LOCKED', true)
}

const unlockScreen = () => {
  noSleep.disable()

  ls('LOCKED', false)
}


const setAppGlobal = (key, val) => {
  _GLOBAL[key] = val
}

const getAppGlobal = (key) => {
  return _GLOBAL[key]
}

const isFilled = (state = {}, field) => {
  return state[field] !== null && state[field] !== ''
}

const shopToken = (token = null) => {
  if (token !== null && isValidToken(token)) {

    return ls('TOKEN', token)
  }

  return ls('TOKEN')
}

const deleteShopToken = () => {
  return ls('TOKEN', null)
}

const isValidToken = (token) => {
  return typeof(token) === 'number' && String(token).length === 13
}

const orderStatusClass = (o) => {
  return o.status ? o.status.toLowerCase() : ''
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
  const total =  items.reduce((prev, cur) => prev + parseInt(cur.price * cur.quantity), 0)

  return total.toFixed(2)
}

const startShopAlert = () => {
  let toCheckNew    = getAppGlobal('TO_CHECK_NEW')

  if (!toCheckNew || toCheckNew === null) {
    toCheckNew = setInterval(function () {
      const ddPlayer    = getAppGlobal('DD_PLAYER')

      if (ddPlayer) {
        ddPlayer.play()
      }
      
    }, 15000)

    setAppGlobal('TO_CHECK_NEW', toCheckNew)
  }
}

const stopShopAlert  = () => {
  let toCheckNew  = getAppGlobal('TO_CHECK_NEW')

  if (toCheckNew) {
    const ddPlayer    = getAppGlobal('DD_PLAYER')

    if (ddPlayer) {
      ddPlayer.pause()
    }
    clearInterval(toCheckNew)

    setAppGlobal('TO_CHECK_NEW', null)
  }
}

const Item = ({data}) => {

  return <div className="order-item margin-v-m padding-m" key={`item-order-${ data.pid }`}>
      <p className="item-name">{ data.name } </p>
      <p className="item-price">{ data.price } THB</p>
      { data.options ? <ItemOptions className="item-options" options= {data.options} /> : null }
    </div> 
}

const User = ({data} ) => {
  if (!data) {
    data = {}
  }
  return (<div className="user-item">
      <DFItem className="padding-v-s"><span>First Name</span><span className="udata">{ data.firstName }</span></DFItem>
      { data.secondName ? <DFItem className="padding-v-s"><span>Second Name</span><span className="udata">{ data.secondName }</span></DFItem> : null }
      <DFItem className="padding-v-s"><span>Address Line 1</span><span className="udata">{ data.addressLineOne }</span></DFItem>
      { data.addressLineTwo ? <DFItem className="padding-v-s"><span>Address Line 2</span><span className="udata">{ data.addressLineTwo }</span></DFItem> : null }
      <DFItem className="padding-v-s"><span>Phone</span><span className="udata">{ data.tel }</span></DFItem>
    </div>)
}

const orderStatusColor = status => {
  switch (status) {
    case ORDER_STATUS.NEW :

    return 'var(--brand-color)'
    case ORDER_STATUS.STARTED :

    return  'var(--warning-color)'
    case ORDER_STATUS.DELIVERED :

    return 'var(--success-color)'
    case ORDER_STATUS.FAILED :

    return 'var(--error-color )'
    case ORDER_STATUS.REJECTED :

    return 'var(--error-color )'
      
  }
}

const orderStatusContent = (status) => {
  switch (status) {
    case ORDER_STATUS.NEW :

    return {
      icon: 'fas fa-arrow-circle-up',
      txt: 'Your order was submitted and we will start it soon'
    }
    case ORDER_STATUS.STARTED :

    return {
      icon: 'far fa-clock',
      txt: 'We have received your order, it will be with you soon'
    }
    case ORDER_STATUS.DELIVERED :

    return {
      icon: 'far fa-check-circle',
      txt: 'This order was delivered, thank you'
    }
    case ORDER_STATUS.FAILED :

    return {
      icon: 'far fa-times-circle' ,
      txt: 'This order was not delivered, please contact us'
    }
    case ORDER_STATUS.REJECTED :

    return {
      icon: 'fas fa-ban',
      txt: 'Sorry we had to reject this order, please contact us'
    }
      
  }
}

export {
  isFilled,
  ORDER_STATUS,
  shopToken,
  validUser,
  orderStatusClass,
  displayStatus,
  orderTotal,
  setAppGlobal,
  getAppGlobal,
  Item,
  User,
  isScreenLocked,
  lockScreen,
  unlockScreen,
  startShopAlert,
  stopShopAlert,
  orderStatusContent,
  orderStatusColor,
  deleteShopToken
}