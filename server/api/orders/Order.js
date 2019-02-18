const mongoose        = require('mongoose')
const DelifastApi     = require('../base')
const { OrderModel }  = require('../../orm/base')

class Order extends DelifastApi {

  constructor (orderData) {
    super(orderData)
    console.log(orderData)
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

  updateStatus (orderid) {
    console.log('UPDATE!!!!!')
    
    const conditions  = { _id : mongoose.Types.ObjectId(orderid) }
    const options     = { $set: {status: this.orderData.status} }

    console.log(conditions)
    console.log(options)

    return OrderModel.updateOne(conditions, options)
  }

  archive (orderid) {
    const conditions  = { _id : mongoose.Types.ObjectId(orderid) }
    const options     = { $set: {archived: true} }

    return OrderModel.updateOne(conditions, options)
  }
}

module.exports = Order