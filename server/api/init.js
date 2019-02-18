const menuApiSetup    = require('./menu/init')
const usersApiSetup   = require('./users/init')
const ordersApiSetup  = require('./orders/init')
const shopApiSetup    = require('./shop/init')

const setupDelifastApi = (app) => {
  menuApiSetup(app)
  usersApiSetup(app)
  ordersApiSetup(app)
  shopApiSetup(app)
}

module.exports = setupDelifastApi