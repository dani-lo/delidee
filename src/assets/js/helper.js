import React, { Fragment }  from 'react'

import ls                   from 'local-storage'

import { DFItem,
         DFSubTitle }       from './elements/library'
import ItemOptions          from './components/order/ItemOptions.jsx'
import APP_TRANS            from './trans.js'

const ORDER_STATUS = {
  NEW       : 'NEW', 
  STARTED   : 'STARTED', 
  DELIVERED : 'DELIVERED',
  REJECTED  : 'REJECTED',
  FAILED    :  'FAILED'
}

const APP_LANGS = {
  TH: 'th',
  EN: 'en'
}

const _GLOBAL = {
  PUSH_INTERVAL: false
}

class Pood  {
  constructor () {
    this.lang = ls('LANG') || APP_LANGS.EN 
  }

  say (section, key) {
    return APP_TRANS[section] ? (APP_TRANS[section][this.lang] ? (APP_TRANS[section][this.lang][key] ? APP_TRANS[section][this.lang][key] : '') : '') : ''
  }
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

const displayStatus = (status, pood) => {
  switch (status) {
    case ORDER_STATUS.NEW: 
      return pood ? pood.say('order', 'status_new') : 'This order has been submitted and is waiting for restaurant staff to accept it'
    case ORDER_STATUS.STARTED: 
      return pood ? pood.say('order', 'status_started') : 'This order has been accepted by staff and is being prepared'
    case ORDER_STATUS.OUT: 
      return pood ? pood.say('order', 'status_out') : 'This order has been prepared and is on its way'
    case ORDER_STATUS.DELIVERED: 
      return pood ? pood.say('order', 'status_delivered') : 'This order has been delivered'
    case ORDER_STATUS.FAILED: 
      return pood ? pood.say('order', 'status_failed') : 'This order has been prepared and shipped but we could not deliver it to you'
  }

  return pood ? pood.say('app', 'unknown') : 'unknown'
}

const validUser = (user) => {
  return user.userName    &&
      user.firstName      &&
      user.addressLineOne &&
      user.latlon         
}

const orderTotal = (items) => {
  
  function getextras (item) {

    let totExtras = 0

    for (let option of Object.values(item.options)) {
      
      if (option.extra_shot && option.extra_shot.value) {

        totExtras += option.extra_shot.value * 30
      }
      if (option.extra_scoop && option.extra_scoop.value) {
        totExtras += option.extra_scoop.value * 50
      }
    }
    return totExtras
  }

  const total =  items.reduce((prev, cur) => {
    const tot = parseInt(cur.price * cur.quantity) + getextras(cur)

    return  prev + tot
  }, 0)

  return total.toFixed(2)
}

// Deprecated
const startShopAlert = () => {
  return
  // let toCheckNew    = getAppGlobal('TO_CHECK_NEW')

  // if (!toCheckNew || toCheckNew === null) {
  //   toCheckNew = setInterval(function () {
  //     const ddPlayer    = getAppGlobal('DD_PLAYER')

  //     if (ddPlayer) {
  //       ddPlayer.play()
  //     }
      
  //   }, 15000)

  //   setAppGlobal('TO_CHECK_NEW', toCheckNew)
  // }
}

// Deprecated
const stopShopAlert  = () => {
  return
  // let toCheckNew  = getAppGlobal('TO_CHECK_NEW')

  // if (toCheckNew) {
  //   const ddPlayer    = getAppGlobal('DD_PLAYER')

  //   if (ddPlayer) {
  //     ddPlayer.pause()
  //   }
  //   clearInterval(toCheckNew)

  //   setAppGlobal('TO_CHECK_NEW', null)
  // }
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
      <DFItem className="padding-v-s">
        <span>First Name</span>
        <span className="udata">{ data.firstName }</span>
      </DFItem>
      { data.secondName ? <DFItem className="padding-v-s"><span>Second Name</span><span className="udata">{ data.secondName }</span></DFItem> : null }
      <DFItem className="padding-v-s">
        <span>Address  1</span>
        <span className="udata">{ data.addressLineOne }</span>
      </DFItem>
      { data.addressLineTwo ? <DFItem className="padding-v-s">
        <span>Address 2</span>
        <span className="udata">{ data.addressLineTwo }</span>
      </DFItem> : null }
      <DFItem className="padding-v-s">
        <span>Phone</span>
        <span className="udata">{ data.tel }</span>
      </DFItem>
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

const orderStatusContent = (status, pood) => {
  switch (status) {
    case ORDER_STATUS.NEW :

    return {
      icon: 'fas fa-arrow-circle-up',
      txt: displayStatus(status, pood)
    }
    case ORDER_STATUS.STARTED :

    return {
      icon: 'far fa-clock',
      txt: displayStatus(status, pood)
    }
    case ORDER_STATUS.DELIVERED :

    return {
      icon: 'far fa-check-circle',
      txt: displayStatus(status, pood)
    }
    case ORDER_STATUS.FAILED :

    return {
      icon: 'far fa-times-circle' ,
      txt: displayStatus(status, pood)
    }
    case ORDER_STATUS.REJECTED :

    return {
      icon: 'fas fa-ban',
      txt: displayStatus(status, pood)
    }
      
  }
}

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return re.test(email)
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
  startShopAlert,
  stopShopAlert,
  orderStatusContent,
  orderStatusColor,
  deleteShopToken,
  validateEmail,
  Pood
}