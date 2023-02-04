const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const router = express.Router()

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/html/login.html'))
})
router.post("/login_", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
});
router.post("/register_", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
})

module.exports = router;