const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userName:  String,
    firstName:  String,
    secondName:  String,
    addressLineOne:  String,
    addressLineTwo:  String,
    latlon: {lat: String, lon: String },
    tel: String,
    shop: {
      type: Boolean,
      default: false
    },
    token: {
      type: Number,
      default: 0
    },
  }, 
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
)

const orderSchema = new mongoose.Schema(
  {
    uid: String,  
    status:  {
      type: String,
      enum : ['NEW', 'STARTED', 'REJECTED', 'DELIVERED', 'FAILED'],
      default: 'NEW'
    },
    meta: Object,
    latlon:   {lat: Number, lon: Number }, 
    comment: String,
    archived: {
      type: Boolean,
      default: false
    },
    items: [Object]
  }, 
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
)

module.exports = {
  UserModel:   mongoose.model('users', userSchema),
  OrderModel: mongoose.model('orders', orderSchema), 
}