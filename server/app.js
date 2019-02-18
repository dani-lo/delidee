const express     = require('express')
const path        = require('path')
const mongoose    = require( 'mongoose' )
const bodyParser  = require('body-parser')
const session     = require('express-session')

const setupDelifastApi      = require('./api/init.js')
const { DB_CONNECTION_STR } = require('./config')

const port                  = process.env.PORT || 8080

/* MONGOODE CONNECTION */

mongoose.connect(DB_CONNECTION_STR)

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + DB_CONNECTION_STR);
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

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname + '/shop.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

/* API SETUP */

setupDelifastApi(app)

/* APP START */

app.listen(port, () => console.log(`Delifast app listening on port ${port}!`))