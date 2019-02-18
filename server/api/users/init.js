const User        = require('./User')
const validators  = require('./validate')

const unpackUser = (dbRes) =>  {

  return {
    _id             : dbRes._id,
    userName        : dbRes.userName,
    firstName       : dbRes.firstName,
    secondName      : dbRes.secondName,
    addressLineOne  : dbRes.addressLineOne,
    addressLineTwo  : dbRes.addressLineTwo,
    latlon          : dbRes.latlon,
    tel             : dbRes.tel,
    token           : dbRes.shop === true ? dbRes.token : null
  }
}

const usersApiSetup = (app) => {

   /* ---------------------- */
  
  app.get('/api/user/current', (req, res) => {

    if (req.session.uid) {

      const user = new User({
        _id: req.session.uid
      })

      user.retrieve().then((dbRes) => {

        if (dbRes && dbRes._id) {
          res.status(200).send({
            status: 'success',
            msg: '',
            data: unpackUser(dbRes)
          })
        } else {
          return res.status(201).send({
            status: 'ok',
            msg: 'no logged in user',
            data: null
          })
        }
        
    }).catch((dbErr) => {
      res.status(500).send({
        status: 'error',
        msg: 'Database Error',
        data: {...dbErr}
      })
    })

    } else {
      return res.status(201).send({
        status: 'ok',
        msg: 'no logged in user',
        data: null
      }) 
    }
  })

   /* ---------------------- */

  app.post('/api/user/login', (req, res) => {
    
    const user = new User(req.body)
    
    user.retrieve().then((dbRes) => {

      if (dbRes && dbRes._id) {
        req.session.uid = dbRes._id
      
        res.status(200).send({
          status: 'success',
          msg: 'You are logged in',
          data: unpackUser(dbRes)
        })
      } else {
        res.status(201).send({
          status: 'error',
          msg: 'Could not find user',
          data: null
        })
      }
      
    }).catch((dbErr) => {
      res.status(500).send({
        status: 'error',
        msg: 'Database Error - ' + dbErr.message,
        data: {...dbErr}
      })
    })
  })

  /* ---------------------- */

  app.post('/api/user/register', (req, res) => {

    const user = new User(req.body)

    user.add().then((dbRes) => {

      res.status(201).send({
        status: 'success',
        msg: 'you registered successfully',
        data: unpackUser(req.body)
      })
    }).catch((dbErr) => {
      return res.status(201).send({
        status: '400',
        msg: 'Database error - you could not be registered - ' + dbErr.message
      })
    })
  })

   /* ---------------------- */

  app.put('/api/user/edit', (req, res) => {

    if (req.session.uid) {

      const user = new User(req.body)
      user.setId(req.session.uid)

      user.update().then((dbRes) => {

        res.status(201).send({
          status: 'success',
          msg: 'you updated successfully',
          data: unpackUser(req.body)
        })
      }).catch((dbErr) => {
        return res.status(201).send({
          status: '400',
          msg: 'Database error - you could not be updated - ' + dbErr.message
        })
      })
    }
  })
}

module.exports = usersApiSetup