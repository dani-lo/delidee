const express     = require('express')
const path        = require('path')
const mongoose    = require( 'mongoose' )
const bodyParser  = require('body-parser')
const session     = require('express-session')

const setupDelifastApi      = require('./api/init.js')
const { DB_CONNECTION_STR } = require('./config')

require('dotenv').config()

const port = process.env.PORT || 8080
const conn = DB_CONNECTION_STR(process.env.MODE)
/* MONGOODE CONNECTION */

mongoose.connect(conn)

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

/* APP SERVER SETUP */

const app = express()

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'sdlfjljrowuroweu',
  cookie: { 
    secure: false, 
    expires: false,//new Date(Date.now() + (30 * 86400 * 1000)) 
  } 
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))
app.use(express.static('media'))

app.get('/', (req, res) => {
  res.redirect('/siamcafe')
})

const routes = [
  '/:shopId',
  '/:shopId/shop',
  '/:shopId/shop-order/:orderId',
  '/:shopId/orders',
  '/:shopId/account',
  '/:shopId/menu',
  '/:shopId/checkout'
]

app.get(routes, (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

/* API SETUP */

setupDelifastApi(app)

/* APP START */

app.listen(port, () => console.log(`DeliDee app listening on port ${port}!`))