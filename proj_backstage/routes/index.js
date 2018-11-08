const express = require("express");
const pool = require("../pool/pool");

var indexRouter = express.Router();
indexRouter.get("/", (req, res)=>{
    var sql = "SELECT * FROM mf_cart_detail";
    pool.query(sql, (err, result)=>{
        console.log(err);
        res.json(result);
    })
});


module.exports = indexRouter