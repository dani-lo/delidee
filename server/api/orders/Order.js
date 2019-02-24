const mongoose        = require('mongoose')
const DelifastApi     = require('../base')
const { OrderModel }  = require('../../orm/base')

class Order extends DelifastApi {

  constructor (orderData) {
    super(orderData)

    this.model      = new OrderModel(orderData)
    this.orderData  = orderData
  }

  add () {
    return this.model.save()
  }

  fetchAllUser (uid) {
    return OrderModel.find({'uid': uid})
  }

  fetchUnarchived () {
    return OrderModel.find({'archived': false})
  }

  fetchNew () {
    return OrderModel.find({'status': 'NEW'})
  }

  updateStatus (orderid) {
    
    const conditions  = { _id : mongoose.Types.ObjectId(orderid) }
    const options     = { $set: {status: this.orderData.status} }

    return OrderModel.updateOne(conditions, options)
  }

  archive (orderid) {
    const conditions  = { _id : mongoose.Types.ObjectId(orderid) }
    const options     = { $set: {archived: true} }

    return OrderModel.updateOne(conditions, options)
  }
}

module.exports = Order