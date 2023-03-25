const express = require('express')
const path = require('path')
const sqlConnector = require('../model/products')
const router = express.Router()

router.post("/adding-cart", (req, res) => {
    const prod_id = req.body.prod_id;
    const prod_name = req.body.cart_prod_name;
    const prod_description = req.body.prod_description;
    const prod_price = req.body.prod_price;
    const prod_date = req.body.cart_prod_date;
    const customer_id = req.body.customer_id;

    let insert_data = `INSERT INTO cart (cart_prod_name ,cart_prod_description ,cart_prod_price ,cart_prod_date ,customer_id ,prod_id) VALUES ('${ prod_name }','${ prod_description }',${ prod_price },'${ prod_date }',${ customer_id },${ prod_id })`;
    
    try {
        sqlConnector.query(insert_data, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/home/')
        })
    } catch (error) {
        res.sendStatus(400).send(error)
    }
});
router.post('/delete_cart', (req, res) => {
    const customer_id = req.body.customer_id;
    let delete_cart = `DELETE FROM cart WHERE customer_id = ${ customer_id } AND cart_checkout_status IS NULL`;
    try {
        sqlConnector.query(delete_cart, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/home/cart')
        })
    } catch (error) { 
        res.sendStatus(400).send(error);
    }
})
router.get('/delete/:id', (req, res) => {
    const cart_id = req.params.id;
    let delete_cart = `DELETE FROM cart WHERE cart_id = ${cart_id} AND cart_checkout_status IS NULL`;
    try {
        sqlConnector.query(delete_cart, (err, result) => {
            if (err) throw err
            console.log(result);
            res.redirect('/home/cart')
        })
    } catch (error) {
        res.sendStatus(400).send(error)
    }
})
router.post("/check-out", (req, res) => {
    const customer_id = req.body.customer_id;
    let checkOut_query = `UPDATE cart SET cart_checkout_status = 1 WHERE cart_checkout_status IS NULL AND customer_id = ${ customer_id }`;
    try {
        sqlConnector.query(checkOut_query, (err ,result) => {
            if (err) throw err;
            res.redirect('/home/cart')
        })
    } catch (error) {
        res.sendStatus(400).send(error)
    }
});
module.exports = router;