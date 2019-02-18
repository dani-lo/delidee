const mongoose        = require('mongoose')
const DelifastApi     = require('../base')
const { UserModel }   = require('../../orm/base')

class User extends DelifastApi {

  constructor (userData = {}) {
    super(userData)

    this._id              = userData._id
    this.userName         = userData.userName || null
    this.userData         = userData
  }

  _datamodelFromUserdata () {
    const userDataModel = Object.assign({}, this.userData)
    
    delete userDataModel._id
    delete userDataModel.userName 

    return userDataModel
  }
 
  setId (id) {
    this._id = id
  }

  validateShop () {
    return UserModel.findOne({token: this.userData.token || '-'})
  }

  retrieve () {
    if (this._id) {
      return UserModel.findOne({_id: this._id})
    }

    return UserModel.findOne({userName: this.userName})
  }

  add () {
    const model = new UserModel(this.userData)

    return model.save()
  }

  update () {
    const conditions  = { _id : mongoose.Types.ObjectId(this._id) }
    const options     = { $set: this._datamodelFromUserdata() }

    return UserModel.updateOne(conditions, options)
  }
}

module.exports = User