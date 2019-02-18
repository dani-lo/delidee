const Order       = require('./Order')
const validators  = require('./validate')

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

const ordersApiSetup = (app) => {
  
  /* ---------------------- */

  app.get('/api/orders/:uid', (req, res) => {

    if (!req.session.uid) {
      return res.status(401).send({
        status: '401',
        msg: 'Please log in with your user name',
        data: null
      })
    }

    const uid   = req.params.uid
    
    if (uid !== req.session.uid) {
      return res.status(401).send({
        status: '401',
        msg: 'Unrecognised usere',
        data: null
      })
    }

    const order = new Order(null)
 
    order.fetchAllUser(uid).then((dbRes) => {
  
      res.status(200).send({
        status: 'success',
        msg: 'orders found',
        data: dbRes.map(order => unpackOrder(order))
      })
    }).catch((dbErr) => {
 
      return res.status(201).send({
        status: '400',
        msg: 'Mongo error - orders could not be found ' + dbErr.message,
        data: null
      })
    })
  })

  /* ---------------------- */

  app.post('/api/orders', (req, res) => {
    const uid = req.session.uid 

    if (!uid) {
      return res.status(201).send({
        status: '401',
        msg: 'Please log in with your user name'
      })
    }

    const result = validators.validatePostOrder(req)

    if (result.status === 'error') {
      return res.status(400).send(result)
    }

    const order = new Order(req.body)

    order.add(req.body).then((dbRes) => {
      res.status(200).send({
        status: 'success',
        msg: 'order added successfully',
        data: Object.assign({}, unpackOrder(dbRes))
      })
    }).catch((dbErr) => {

      return res.status(201).send({
        status: '400',
        msg: 'Mongo error - order could not be added - ' + dbErr.message
      })
    })
  })
}

module.exports = ordersApiSetup