const express = require("express")
const path = require("path")
const app = express()
const port = 1200

const home = require('./controller/home')
const login = require('./controller/login')
const product = require('./controller/product')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, './public/html'))
app.set('view engine','ejs')

app.use('/home', home)
app.use('/login', login)
app.use('/product' ,product)

app.listen(port,() => console.log(`server is running on port ${port}`))