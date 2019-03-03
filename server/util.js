const Push  = require( 'pushover-notifications' )
const _     = require('lodash')

const PUSHOVER_USER   = 'ufszpdof6kghoeh4gofzere4rosj1v'
const PUSHOVER_TOKEN  = 'api3j7tpkg5icyjuiwkhe445sudfh7'

const reqResult = (status, msg) => {
  return {status, msg}
}

const alertUsers = (newOrder) => {
  const orderUser = _.get(newOrder, 'meta.metaData.username', '')
  const p = new Push( {
    user  : PUSHOVER_USER,
    token : PUSHOVER_TOKEN
  })
  const msg = {
    message : "New Order",
    title   : "New Order From User " + orderUser,
    sound   : 'persistent',
    device  : 'daniphone,siam01,siam7947',
    priority: 2,
    retry   : 30,
    expire  : 120
  }

  p.send( msg, function( err, result ) {
    if ( err ) {
      throw err
    }
  })

}

module.exports = {
  reqResult,
  alertUsers
}