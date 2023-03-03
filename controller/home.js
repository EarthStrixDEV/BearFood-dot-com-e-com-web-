const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const {render} = require('ejs')
const { query } = require('express')
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
            req.session.customer_id = result[0].customer_id;
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
    let Query = `SELECT * FROM products`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err
            res.render("page", {
                customer: req.session.customer,
                seller: req.session.seller,
                product_data: result,
                customer_id: req.session.customer_id,
            });
        })
    } catch (err) {
        res.sendStatus(400).send(err)
    }
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
    if (req.session.customer || req.session.seller) {
        res.render("popular", {
            customer: req.session.customer,
            seller: req.session.seller,
        });
    } else {
        res.redirect('/home/')
    }
})
router.get('/promotion', (req, res) => {
    if (req.session.customer || req.session.seller) {
        res.render("promotion", {
            customer: req.session.customer,
            seller: req.session.seller,
        });
    } else {
        res.redirect("/home/");
    }
})
router.get('/cart', (req, res) => {
    const customer_session = req.session.customer_id;
    let query_cart = `SELECT * FROM cart WHERE customer_id = ${customer_session}; SELECT customer_id FROM customer WHERE customer_username = '${req.session.customer}'`;
    if (req.session.customer || req.session.seller) {
        try {
            sqlConnector.query(query_cart, (err, result) => {
                if (err) throw err;
                res.render("cart", {
                    customer: req.session.customer,
                    seller: req.session.seller,
                    data_cart: result[0],
                    customer_id: result[1]
                });
                console.log(result[0]);
                console.log(result[1]);
            })
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    } else {
        res.redirect("/home/");
    }
})
module.exports = router;