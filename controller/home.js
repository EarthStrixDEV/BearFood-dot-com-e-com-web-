const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/page.html'))
})
router.get('/popular', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/popular.html'))
})
router.get('/promotion', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/promotion.html'))
})
module.exports = router;