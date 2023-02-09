const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const router = express.Router();

router.get("/login_register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
});
router.get("/users_admin", (req, res) => {
    let Query = `SELECT * FROM users; SELECT count(*) as 'totalUser' FROM users`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render("admin", {
                data: result[0],
                total_user: result[1],
            });
        });
    } catch (error) {
        res.sendStatus(400).send("Data has not found!");
    }
});
router.post("/login_", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let Query = `SELECT * FROM users WHERE user_username = '${username}' AND user_password = '${password}'`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = result[0].user_username;
                res.redirect("/home/");
            } else {
                res.sendStatus(400).send("Login Failed!");
            }
        });
    } catch (err) {
        res.send(err);
    }
});
router.post("/register_", (req, res) => {
    const username = req.body.user_username;
    const fname = req.body.user_fname;
    const lname = req.body.user_lname;
    let isSeller = req.body.user_seller;
    const email = req.body.user_email;
    const password = req.body.user_password;

    if (isSeller == "on") {
        isSeller = 1;
    } else {
        isSeller = 0;
    }

    let Query = `INSERT INTO users (user_fname ,user_lname ,user_username ,user_seller_ ,user_email ,user_password) VALUES ('${fname}' ,'${lname}' ,'${username}' ,${isSeller} ,'${email}','${password}')`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.redirect("/login/");
        });
    } catch (err) {
        res.sendStatus(400).send("Registration Failed!");
    }
});

module.exports = router;
