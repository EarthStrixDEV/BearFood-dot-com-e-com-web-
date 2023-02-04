const express = require('express')
const path = require('path')
const sqlConnector = require("../model/products")
const {render} = require('ejs')
const router = express.Router()

router.get("/", (req, res) => {
    res.render('products')
    next()
})
router.post("/load_stock", (req, res) => {
    next()
})

module.exports = router