const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const router = express.Router();

router.get("/login_register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
});
router.get("/users_admin", (req, res) => {
    let Query = `SELECT * FROM users; SELECT count(*) as 'totalUser' FROM users; SELECT count(*) as 'totalCustomer' FROM users WHERE user_seller_ = 0; SELECT count(*) as 'totalSeller' FROM users WHERE user_seller_ = 1;`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render("admin", {
                data: result[0],
                total_user: result[1],
                total_customer: result[2],
                total_seller: result[3]
            });
        });
    } catch (error) {
        res.sendStatus(400).send("Data has not found!");
    }
});
router.get('/edit/user_id=:id', (req, res) => {
    const id = req.params.id;
    let Query = `SELECT * FROM users WHERE user_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render('editUser', {
                data: result
            })
        })
    } catch (err) {
        res.sendStatus(400).send(err)
    }
})
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    let Query = `DELETE FROM users WHERE user_id = ${ id }`
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect('/users/users_admin')
        })
    } catch (err) {
        res.sendStatus(400).send("Can't delete row record!!");
    }
})
router.post('/editUser', (req, res) => {
    const user_id = req.body.edit_id;
    const user_username = req.body.edit_username;
    const user_password = req.body.edit_password;
    const user_fname = req.body.edit_fname;
    const user_lname = req.body.edit_lname;
    let Query = `UPDATE users SET user_fname = '${ user_fname }',user_lname = '${ user_lname }',user_username = '${ user_username }' ,user_password = '${ user_password }' WHERE user_id = ${user_id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/users/users_admin");
        })
    } catch (error) {
        res.sendStatus(400).send("Update data user issue!")
    }
})
router.post("/register_", (req, res) => {
    const username = req.body.user_username;
    const fname = req.body.user_fname;
    const lname = req.body.user_lname;
    const email = req.body.user_email;
    const password = req.body.user_password;
    let isSeller = 0;

    if (req.body.user_seller == "on") {
        isSeller = 1;
    } else {
        isSeller = 0;
    }

    let Query = `INSERT INTO users (user_fname ,user_lname ,user_username ,user_seller_ ,user_email ,user_password) VALUES ('${fname}' ,'${lname}' ,'${username}' ,${isSeller} ,'${email}','${password}')`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/users/login_register");
        });
    } catch (err) {
        res.sendStatus(400).send("Registration Failed!");
    }
});

module.exports = router;
