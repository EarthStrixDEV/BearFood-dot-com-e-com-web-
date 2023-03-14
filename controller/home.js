const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
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
            '<script>alert("Email or Password is incorrect!"); window.location.href = "/users/login_customer";</script>'
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
            req.session.seller_id = result[0].seller_id;
            res.redirect('/home/')
        } else {
            res.send(
            '<script>alert("Email or Password is incorrect!"); window.location.href = "/users/login_seller";</script>'
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
    let query_customer = `SELECT * FROM customer WHERE customer_id = '${ req.session.customer_id }'; SELECT * FROM cart WHERE customer_id = ${ req.session.customer_id } AND cart_checkout_status = 1;`;
    let query_seller = `SELECT * FROM seller WHERE seller_id = ${req.session.seller_id}; SELECT * FROM products WHERE seller_id = ${req.session.seller_id};`
    if (req.session.customer_id) {
        try {
            sqlConnector.query(query_customer, (err, result) => {
                if (err) throw err;
                res.render("userProfile", {
                    seller: false,
                    customer: req.session.customer,
                    user_data: result[0],
                    history_cart: result[1]
                });
            })
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    } else if (req.session.seller_id) {
        try {
            sqlConnector.query(query_seller, (err, result) => {
                if (err) throw err;
                res.render("userProfile", {
                    customer: false,
                    seller: req.session.seller,
                    user_data: result[0],
                    product_own: result[1]
                })
            })
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    } else {
        res.redirect('/home/')
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
    let query_products_promotion = `SELECT * FROM products ORDER BY RAND() LIMIT 4`
    if (req.session.customer || req.session.seller) {
        try {
            sqlConnector.query(query_products_promotion, (err, result) => {
                if (err) throw err;
                res.render("promotion", {
                    customer: req.session.customer,
                    seller: req.session.seller,
                    customer_id: req.session.customer_id,
                    products: result
                });
            })
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    } else {
        res.redirect("/home/");
    }
})
router.get('/about', (req, res) => {
    if (req.session.customer || req.session.seller) {
        res.render("about", {
            customer: req.session.customer,
            seller: req.session.seller,
        });
    } else {
        res.redirect("/home/");
    }
})
router.get('/cart', (req, res) => {
    const customer_session = req.session.customer_id;
    let query_cart = `SELECT * FROM cart WHERE customer_id = ${customer_session} AND cart_checkout_status IS NULL; SELECT customer_id FROM customer WHERE customer_id = '${req.session.customer_id}'; SELECT FORMAT(sum(cart_prod_price),'N2') as 'total_price' FROM cart WHERE customer_id = ${req.session.customer_id} AND cart_checkout_status IS NULL`;
    if (req.session.customer || req.session.seller) {
        try {
            sqlConnector.query(query_cart, (err, result) => {
                if (err) throw err;
                res.render("cart", {
                    customer: req.session.customer,
                    seller: req.session.seller,
                    data_cart: result[0],
                    customer_id: result[1],
                    total_price: result[2]
                });
                console.log(result[3]);
            })
        } catch (error) {
            res.sendStatus(400).send(error)
        }
    } else {
        res.redirect("/home/");
    }
})
router.get("/products", (req, res) => {
    const seller_id = req.session.seller_id;
    let Query = `SELECT * FROM products WHERE seller_id = ${ seller_id }; SELECT count(*) as 'total_product' FROM products WHERE seller_id = ${ seller_id }; SELECT count(*) as 'total_cart' FROM cart; SELECT count(*) as 'total_seller' FROM seller; SELECT count(*) as 'total_order' FROM cart WHERE cart_checkout_status = 1`;
    if (req.session.seller_id) {
        try {
            sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render("products", {
                data: result[0],
                total_product: result[1],
                total_cart: result[2],
                total_seller: result[3],
                total_order: result[4]
            });
            });
        } catch (err) {
            res.sendStatus(400).send(err);
        }
    } else {
        res.redirect('/home/')
    }
});
router.get("/add_product", (req, res) => {
    res.render("addproduct", {
        seller_id: req.session.seller_id
    });
});
module.exports = router;