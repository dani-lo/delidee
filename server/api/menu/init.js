const { MENU_FILE } = require('../../config')
const menu          = require('../../data/menu/' + MENU_FILE)

const menuApiSetup = (app) => {
  app.get('/api/menu/:shop', (req, res) => {

    res.status(200).send({
      status: 'success',
      data: menu
    })
  })
}

module.exports = menuApiSetup