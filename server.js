const express = require("express")
const path = require("path")
const app = express()
const express_session = require('express-session')
const port = 1200

const home = require('./controller/home')
const users = require('./controller/users')
const product = require('./controller/product')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, './public/html'))
app.set('view engine', 'ejs')
app.use(
  express_session({
    secret: "thisisitNJDG",
    resave: false,
    cookie: { path: "/", httpOnly: true, secure: false, maxAge: 3600000 },
    saveUninitialized: false,
  })
);

app.use('/home', home)
app.use('/users', users)
app.use('/product', product)

app.listen(port,() => console.log(`server is running on port ${port}`))