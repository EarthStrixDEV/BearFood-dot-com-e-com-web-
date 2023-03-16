const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const router = express.Router();
const Swal = require("sweetalert2");
/* Render Login / Register Page */
router.get("/login_customer", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
});
router.get('/login_seller', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/login_seller.html'))
})
router.get('/register_seller', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/register_seller.html'))
})
router.get('/register_customer', (req, res) => {
    res.sendFile(path.join(__dirname ,'../public/html/register_customer.html'))
})
/* Path to Edit Data */
router.get('/edit/customer_id=:id', (req, res) => {
    const id = req.params.id;
    let Query = `SELECT * FROM customer WHERE customer_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render('editUser', {
                seller: false,
                customer: result
            })
        })
    } catch (err) {
        res.sendStatus(400).send(err)
    }
})
router.get('/edit/seller_id=:id', (req, res) => {
    const id = req.params.id;
    let Query = `SELECT * FROM seller WHERE seller_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render('editUser', {
                customer: false,
                seller: result
            })
        })
    } catch (err) {
        res.sendStatus(400).send(err)
    }
})
/* Edit data */
router.post('/editCustomer' ,(req, res) => {
    const id = req.body.edit_id;
    const username = req.body.edit_username;
    const password = req.body.edit_password;
    const fname = req.body.edit_fname;
    const lname = req.body.edit_lname;
    const image = req.body.edit_image;
    let Query = `UPDATE customer SET customer_fname = '${ fname }',customer_lname = '${ lname }',customer_username = '${ username }' ,customer_password = '${ password }',customer_image = '${image}' WHERE customer_id = ${id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect(`/users/edit/customer_id=${id}`);
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
router.post('/editSeller', (req, res) => {
    const id = req.body.edit_id;
    const username = req.body.edit_username;
    const password = req.body.edit_password;
    const fname = req.body.edit_fname;
    const lname = req.body.edit_lname;
    const image = req.body.edit_image;
    let Query = `UPDATE seller SET seller_fname = '${ fname }',seller_lname = '${ lname }',seller_username = '${ username }' ,seller_password = '${ password }',seller_image = '${ image }' WHERE seller_id = ${id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect(`/users/edit/seller_id=${id}`);
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
/* Register */
router.post("/register_customer", (req, res) => {
    const id = req.body.edit_edit_id;
    const username = req.body.edit_username;
    const password = req.body.edit_.password;
    const fname = req.body.edit_fname;
    const lname = req.body.edit_lname;

    let Query = `INSERT INTO customer (customer_fname ,customer_lname ,customer_username ,customer_email ,customer_password) VALUES ('${ fname }' ,'${ lname }' ,'${ username }' ,'${ email }','${ password }')`;
    
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/users/register_customer')
        });
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.post("/register_seller", (req, res) => {
    const username = req.body.seller_username;
    const fname = req.body.seller_fname;
    const lname = req.body.seller_lname;
    const email = req.body.seller_email;
    const password = req.body.seller_password;

    let Query = `INSERT INTO seller (seller_fname ,seller_lname ,seller_username ,seller_email ,seller_password) VALUES ('${fname}' ,'${lname}' ,'${username}' ,'${email}','${password}')`;

    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/users/register_seller')
        });
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
/* address */
router.post('/add-address', (req, res) => {
    const customer_username = req.body.customer_username;
    const customer_address = req.body.customer_address;
    const customer_place = req.body.customer_place;
    let Query = `UPDATE customer SET customer_place = '${customer_place}' ,customer_address = '${customer_address}' WHERE customer_username = '${customer_username}'`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/home/userProfile')
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
router.get("/delete/customer_id=:id", (req, res) => {
    const customer_id = req.params.id;
    let delete_user = `DELETE FROM customer WHERE customer_id = '${customer_id}'`;
    try {
        sqlConnector.query(delete_user, (err, result) => {
        if (err) throw err;
            res.redirect("/home/login_customer");
        });
    } catch (error) {
        res.sendStatus(400).send(err);
    }
});
router.get("/delete/seller_id=:id", (req, res) => {
    const seller_id = req.params.id;
    let delete_user = `DELETE FROM seller WHERE seller_id = '${seller_id}'`;
    try {
        sqlConnector.query(delete_user, (err, result) => {
        if (err) throw err;
        res.redirect("/home/login_seller");
        });
    } catch (error) {
        res.sendStatus(400).send(err);
    }
});
module.exports = router;
