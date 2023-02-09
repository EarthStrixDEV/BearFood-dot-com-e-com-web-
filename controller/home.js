const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const {render} = require('ejs')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('page', {
        username_session: req.session.user_name
    })
})
router.get('/popular', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/popular.html'))
})
router.get('/promotion', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/promotion.html'))
})
module.exports = router;