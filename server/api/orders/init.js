const Order       = require('./Order')
const validators  = require('./validate')
const util        = require('../../util')

const unpackOrder = (dbRes) =>  {
  return {
    _id: dbRes._id,
    createdAt: dbRes.createdAt,
    status: dbRes.status,
    meta: dbRes.meta,
    comments: dbRes.comments,
    items: dbRes.items,
    uid: dbRes.uid
  }
}

const ordersApiSetup = (app, silent) => {

  /* ---------------------- */

  app.get('/api/orders/:uid', (req, res) => {

    if (!req.session.uid) {
      return res.status(401).send({
        status: '401',
        msg: 'unrecognised user',
        data: null
      })
    }

    const uid   = req.params.uid
    
    if (uid !== req.session.uid) {
      return res.status(401).send({
        status: '401',
        msg: 'unrecognised user',
        data: null
      })
    }

    const order = new Order(null)
 
    order.fetchAllUser(uid).then((dbRes) => {
  
      res.status(200).send({
        status: '200',
        msg: 'orders found',
        data: dbRes.map(order => unpackOrder(order))
      })
    }).catch((dbErr) => {
 
      return res.status(500).send({
        status: '500',
        msg: 'error, orders not found ' + dbErr.message,
        data: null
      })
    })
  })

  /* ---------------------- */

  app.post('/api/orders', (req, res) => {
    const uid = req.session.uid 

    if (!uid) {
      return res.status(401).send({
        status: '401',
        msg: 'unrecognised user'
      })
    }

    // const result = validators.validatePostOrder(req)

    // if (result.status === 'error') {
    //   return res.status(400).send(result)
    // }

    const order = new Order(req.body)

    order.add(req.body).then((dbRes) => {
      
      if (silent && silent === 'no') {
        util.alertUsers(req.body)
      }
      
      res.status(200).send({
        status: '200',
        msg: 'order added successfully',
        data: Object.assign({}, unpackOrder(dbRes))
      })
    }).catch((dbErr) => {

      return res.status(500).send({
        status: '500',
        msg: 'error - order could not be added - ' + dbErr.message
      })
    })
  })
}

module.exports = ordersApiSetup