const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const {render} = require('ejs')
const router = express.Router()

router.post("/login_customer", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let Query = `SELECT * FROM customer WHERE customer_username = '${username}' AND customer_password = '${password}';`
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.session.loggedIn = true;
            req.session.customer = result[0].customer_username;
            res.redirect('/home/')
        } else {
            res.send(
            '<script>alert("Email or Password is incorrect!"); window.location.href = "/users/login_register";</script>'
            );
        }
        });
    } catch (err) {
        res.sendStatus(400).send(err)
    }
});
router.post("/login_seller", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let Query = `SELECT * FROM seller WHERE seller_username = '${username}' AND seller_password = '${password}';`
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            req.session.loggedIn = true;
            req.session.seller = result[0].seller_username;
            res.redirect('/home/')
        } else {
            res.send(
            '<script>alert("Email or Password is incorrect!"); window.location.href = "/users/login_register";</script>'
            );
        }
        });
    } catch (err) {
        res.sendStatus(400).send(err);
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
        customer: req.session.customer,
        seller: req.session.seller
    });
})
router.get('/userProfile', (req, res) => {
    let Query = `SELECT * FROM customer WHERE customer_username = '${ req.session.customer }'`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render("userProfile", {
                user_data: result
            });
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
router.get('/popular', (req, res) => {
    res.render("popular", {
        customer: req.session.customer,
        seller: req.session.seller,
    });
})
router.get('/promotion', (req, res) => {
    res.render("promotion", {
        customer: req.session.customer,
        seller: req.session.seller,
    });
})
router.get('/cart', (req, res) => {
    res.render("cart", {
        customer: req.session.customer,
        seller: req.session.seller,
    });
})
module.exports = router;