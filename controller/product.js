const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const home_session = require("../controller/home")
const { render } = require("ejs");
const Swal = require("sweetalert");
const router = express.Router();


router.post("/editProduct", (req, res) => {
    const prod_id = req.params.id;
    const prod_name = req.body.prod_name;
    const prod_description = req.body.prod_description;
    const prod_price = req.body.prod_price;
    let Query = `UPDATE products SET prod_name = '${prod_name}' ,prod_description = '${prod_description}' ,prod_price = '${prod_price}' WHERE prod_id = ${prod_id}`;

    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/product/");
        });
    } catch (error) {
        res.sendStatus(400).send(err);
    }
});
router.get("/edit/product_id=:id", (req, res) => {
    const prod_id = req.params.id;
    let Query = `SELECT * FROM products WHERE prod_id = ${prod_id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        res.render("editproduct", {
            data: result,
        });
        });
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.get("/delete/:id", (req, res) => {
    const prod_id = req.params.id;
    let Query = `DELETE FROM products WHERE prod_id = ${prod_id}`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.redirect("/product/่");
        });
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.post("/add_products", (req, res) => {
    const prod_name = req.body.prod_name;
    const prod_description = req.body.prod_description;
    const prod_price = req.body.prod_price;
    const prod_image = req.body.prod_image;
    const seller_id = req.body.seller_id;
    
    let Query = `INSERT INTO products (prod_name ,prod_description ,prod_price ,prod_image ,seller_id) VALUES ('${prod_name}','${prod_description}',${prod_price},"${prod_image}",${seller_id});`;
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/home/add_product");
        });
    } catch (error) {
        res.sendStatus(400).send("Add data error!");
    }
});
module.exports = router;