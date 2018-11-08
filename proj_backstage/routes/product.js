/**
*分页获取产品信息
*请求参数：
  pageNum-需显示的页号；默认为1
  type-可选，默认为1
*输出结果：
  {
    totalRecord: 37,
    pageSize: 6,
    pageCount: 7,
    pageNum: 1,
    type: 1,
    data: [{},{} ... {}]
  }
*/
const express = require("express");
const pool = require("../pool/pool");

var productRouter = express.Router();

productRouter.get("/", (req, res)=>{
    var output = {};
    var type = req.query.type;
    var pageNum = req.query.pageNum;
    if(!req.query.type){
      type = 1;
    }
    if(!req.query.pageNum){
      pageNum = 1;
    }
    output.pageNum = pageNum;
    output.type = type;
    output.pageSize = 3;

    //获取总记录数和总页数
    var sql = "SELECT COUNT(pid) as number FROM mf_product WHERE type=?";
    pool.query(sql, [type], (err, result)=>{
        console.log(err);
        output.totalRecord = result[0].number;
        output.pageCount = Math.ceil(output.totalRecord / output.pageSize);
        
        //获取指定页中的数据
        var start = (output.pageNum - 1) * output.pageSize;
        var count = output.pageSize;
        var sqlSelect = "SELECT * FROM mf_product WHERE type=? ORDER BY pid DESC LIMIT ?,?";
        pool.query(sqlSelect, [type, start, count], (err, result)=>{
          console.log(err);
          output.data = result;
          res.json(output);
        });
    });
});

module.exports = productRouter;