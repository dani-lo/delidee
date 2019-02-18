const User        = require('../users/User')
const Order       = require('../orders/Order')

const shopApiSetup = (app) => {

  app.post('/api/shop/order-status/:oid', (req, res) => {
    const user = new User(req.body)
    const order   = new Order(req.body)
    const oid     = req.params.oid 
    const status  = req.body.status
    
    user.validateShop().then((dbRes) => {
      if (dbRes.token) {
        
        order.updateStatus(oid).then((dbRes) => {
          return res.status(200).send({
            status: '200',
            msg: 'ok',
            data: {_id: oid, status: status}
          })
        }).catch((dbRes) => {
          return res.status(500).send({
            status: '500',
            msg: 'Error updaing order - ' + dbRes.message
          })
        })
      } else {
        return res.status(401).send({
          status: '401',
          msg: 'YOu are not authorized to update this resource - ' + dbRes.message
        })
      }
    }).catch((dbRes) => {

      return res.status(401).send({
        status: '401',
        msg: 'YOu are not authorized to update this resource - '  + dbRes.message
      })
    })
  })


  app.post('/api/shop/orders', (req, res) => {

    const user = new User(req.body)

    user.validateShop().then((dbRes) => {
      if (dbRes.token) {
        const order = new Order()

        order.fetchUnarchived().then((dbRes) => {
          return res.status(200).send({
            status: '200',
            msg: 'ok',
            data: dbRes
          })
        }).catch((dbRes) => {
          return res.status(500).send({
            status: '500',
            msg: 'Error fetching orders - ' + dbRes.message
          })
        })
      } else {
        return res.status(401).send({
          status: '401',
          msg: 'YOu are not authorized to view this resource - ' + dbRes.message
        })
      }
    }).catch((dbErr) => {

      return res.status(401).send({
        status: '401',
        msg: 'YOu are not authorized to view this resource - '  + dbErr.message
      })
    })
  })
}


module.exports = shopApiSetup