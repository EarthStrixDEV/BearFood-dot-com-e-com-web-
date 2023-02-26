const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const router = express.Router();
const Swal = require("sweetalert2");
/* Render Login Page */
router.get("/login_register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
});
/* Show all data */
router.get("/users_admin", (req, res) => {
    let Query = `SELECT * FROM customer; SELECT * FROM seller;`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render('admin', {
                customer: result[0],
                seller: result[1]
            })
        })
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
/* Path to Edit Data */
router.get('/edit/customer_id=:id', (req, res) => {
    const id = req.params.id;
    let Query = `SELECT * FROM customer WHERE customer_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render('editUser', {
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
                seller: result
            })
        })
    } catch (err) {
        res.sendStatus(400).send(err)
    }
})
/* Delete Data */
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    let Query = `DELETE FROM customer WHERE user_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/users/users_admin')
        })
    } catch (err) {
        res.sendStatus(400).send(err);
    }
})
/* Edit data */
router.post('/editCustomer', (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    let Query = `UPDATE customer SET customer_fname = '${ fname }',customer_lname = '${ lname }',customer_username = '${ customer_username }' ,customer_password = '${ password }' WHERE customer_id = ${id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/users/users_admin");
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
router.post('/editSeller', (req, res) => {
    const id = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    let Query = `UPDATE customer SET seller_fname = '${ fname }',seller_lname = '${ lname }',seller_username = '${ username }' ,seller_password = '${ password }' WHERE seller_id = ${id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/users/users_admin");
        })
    } catch (error) {
        res.sendStatus(400).send(err)
    }
})
/* Register */
router.post("/register_customer", (req, res) => {
    const username = req.body.customer_username;
    const fname = req.body.customer_fname;
    const lname = req.body.customer_lname;
    const email = req.body.customer_email;
    const password = req.body.customer_password;

    let Query = `INSERT INTO customer (customer_fname ,customer_lname ,customer_username ,customer_email ,customer_password) VALUES ('${ fname }' ,'${ lname }' ,'${ username }' ,'${ email }','${ password }')`;
    
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/users/login_register')
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

    let Query = `INSERT INTO seller (seller_fname ,seller_lname ,seller_username ,seller_email ,seller_password) VALUES ('${ fname }' ,'${ lname }' ,'${ username }' ,'${ email }','${ password }')`;
    
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.render("login");
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

module.exports = router;
