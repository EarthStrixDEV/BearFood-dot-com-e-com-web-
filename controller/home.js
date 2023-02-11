const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const {render} = require('ejs')
const router = express.Router()

router.post("/login_", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let Query = `SELECT * FROM users WHERE user_username = '${username}' AND user_password = '${password}'`;
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.session.loggedIn = true;
            req.session.username = result[0].user_username;
            res.redirect('/home/')
        } else {
            res.send(
            '<script>alert("Email or Password is incorrect!"); window.location.href = "/users/login_register";</script>'
            );
        }
        });
    } catch (err) {
        res.send(err);
    }
});
router.get('/logout', (req, res) => {
    if (req.session.destroy()) {
        res.redirect('/home/')
    } else {
        res.sendStatus(400).send('logout issue!!')
    }
})
router.get('/', (req, res) => {
    res.render("page", {
        username_session: req.session.username,
    });
})
router.get('/popular', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/popular.html'))
})
router.get('/promotion', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/promotion.html'))
})
module.exports = router;