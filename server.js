const express = require("express")
const path = require("path")
const app = express()
const express_session = require('express-session')
/* import controller */
const home = require('./controller/home')
const users = require('./controller/users')
const product = require('./controller/product')
const cart = require('./controller/cart')

/* set middleware */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, './public/html'))
app.set('view engine', 'ejs')
app.use(
  express_session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// set controller
app.use('/home', home)
app.use('/users', users)
app.use('/product', product)
app.use('/cart', cart)

app.get('/test', (req, res) => {
    res.send('Test Project')
})

app.listen(5000,() => console.log(`server is running on port 5000`))