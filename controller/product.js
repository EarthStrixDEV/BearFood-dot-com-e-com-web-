const express = require('express')
const path = require('path')
const sqlConnector = require("../model/products")
const {render} = require('ejs')
const { nextTick } = require('process')
const router = express.Router()

router.get("/", (req, res) => {
    res.render('products')
})
router.get('/add_products', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/html/addproduct.html'))
})
router.post("/add_product", (req, res) => {
    nextTick()
})

module.exports = router