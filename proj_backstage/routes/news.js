var express = require("express");
var pool = require("../pool/pool");
var newsRouter = express.Router();

/**
*按发布时间逆序返回新闻列表
*请求参数：
  pageNum-需显示的页号；默认为1
*输出结果如：
  {
    totalRecord: 58,
    pageSize: 10,
    pageCount: 6,
    pageNum: 1,
    data: [{},{} ... {}]
  }
*/
newsRouter.get("/list", (req, res)=>{
    var output = {};
    var pageNum = req.query.pageNum;
    if(!req.query.pageNum){
        pageNum = 1;
    }

    output.pageNum = pageNum;
    output.pageSize = 6;
    //查询总的记录数
    var sql = "SELECT COUNT(nid) AS lists FROM mf_news";
    pool.query(sql, (err, result, fields)=>{
        console.log(err);
        output.totalRecord = result[0].lists;
        output.pageCount = Math.ceil(output.totalRecord / output.pageSize);
        
        //获取指定页的数据
        var start = (output.pageNum - 1) * output.pageSize;
        var count = output.pageSize;
        var sqlSelect = "SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT ?,?";
        pool.query(sqlSelect, [start, count], (err, result)=>{
            console.log(err);
            output.data = result;
            res.json(output);
        });
    });
});

newsRouter.get("/detail", (req, res)=>{
    var nid = req.query.nid;
    var sql = "SELECT * FROM mf_news WHERE nid=?";
    pool.query(sql, [nid], (err, result)=>{
        console.log(err);
        res.json(result[0]);
    });
});

module.exports = newsRouter;