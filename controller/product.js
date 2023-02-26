const express = require("express");
const path = require("path");
const sqlConnector = require("../model/products");
const { render } = require("ejs");
const Swal = require("sweetalert");
const router = express.Router();

router.get("/", (req, res) => {
    let Query = `SELECT * FROM products; SELECT count(*) as 'total_product' FROM products;`;
    try {
        sqlConnector.query(Query, (err, result) => {
            if (err) throw err;
            res.render("products", {
                data: result[0],
                total_product: result[1],
            });
        });
    } catch (err) {
        res.sendStatus(400).send(err);
    }
});
router.get("/add_products", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/addproduct.html"));
});
router.post("/editProduct", (req, res) => {
    const prod_id = req.params.id;
    const prod_name = req.body.prod_name;
    const prod_description = req.body.prod_description;
    const prod_price = req.body.prod_price;
    const prod_store = req.body.prod_store;
    let Query = `UPDATE products SET prod_name = '${prod_name}' ,prod_description = '${prod_description}' ,prod_price = '${prod_price}' ,prod_store = '${prod_store}' WHERE prod_id = ${prod_id}`;

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
router.post("/add_product", (req, res) => {
    const prod_name = req.body.prod_name;
    const prod_description = req.body.prod_description;
    const prod_price = req.body.prod_price;
    const prod_store = req.body.prod_store;
    const prod_date = req.body.prod_date;

    let Query = `INSERT INTO products (prod_name ,prod_description ,prod_price ,prod_store ,prod_date) VALUES ('${prod_name}','${prod_description}',${prod_price},'${prod_store}','${prod_date}')`;
    try {
        sqlConnector.query(Query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect("/product/add_products");
        });
    } catch (error) {
        res.sendStatus(400).send("Add data error!");
    }
});
module.exports = router;