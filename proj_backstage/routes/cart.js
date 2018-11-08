var express = require("express");
const pool = require("../pool/pool");
var cartRouter = express.Router();

cartRouter.get("/add", (req, res)=>{
    var status = {};
    var uid = req.query.uid;
    var pid = req.query.pid;
    var sql = "SELECT cid FROM mf_cart WHERE userId=?";
    var cid;
    //查看指定用户是否有购物车，无则创建，获取到购物车编号
    pool.query(sql, [uid], (err, result)=>{
        if(result.length == 0){ //购物车不存在
            cid = result[0].cid;
            sqlAddUser = "INSERT INTO mf_cart VALUES (null, ?)";
            pool.query(sqlAddUser, [uid], (err, result)=>{
                if(result.affectedRows > 0){
                    status.stat = 1;
                    status.success = {code: 1, msg: "加入成功!"};
                }else{
                    status.stat = -1;
                    status.fail = {code: -1, msg: "加入失败!"};
                    res.json(status);
                }
            });
        }else{ //购物车存在
            cid = result[0].cid;
            status.stat = 1;
            status.exist = {code: 1, msg: "购物车存在！"};  
        }
        //判断购物车详情表中是否已经存在该商品记录
        var sqlSearch = "SELECT did,count FROM mf_cart_detail WHERE cartId=? AND productId=?";
        pool.query(sqlSearch, [cid, pid], (err, result)=>{
            if(result.length != 0){ //之前曾经购买过该商品，则购买数量+1
                var count = result[0].count + 1;
                var sqlAddCount = "UPDATE mf_cart_detail SET count=? WHERE cartId=? AND productId=?";
                pool.query(sqlAddCount, [count, cid, pid], (err, result)=>{
                    if(result.affectedRows > 0){
                        status.stat = 1;
                        status.addSuccess = {code: 1, msg: "增加数量成功!", productCount: count};
                    }else{
                        status.stat = -1;
                        status.addFail = {code: 1, msg: "增加数量失败!"};
                    }
                    res.json(status);
                });
            }else{ //之前从未购买过该商品，则添加购买记录，购买数量为1
                var sqlFirstBuy = "INSERT INTO mf_cart_detail VALUES(null, ?, ?, ?)";
                pool.query(sqlFirstBuy, [cid, pid, 1], (err, result)=>{
                    if(result.affectedRows > 0){
                        status.stat = 1;
                        status.buySuccess = {code: 1, msg: "加入购物车成功!", productCount: 1};
                    }else{
                        status.stat = -1;
                        status.buyFail = {code: 1, msg: "加入购物车失败!"};
                    }
                    res.json(status);
                });
            }
        })
    });
});

/**
*根据购物车详情记录编号删除该购买记录
*请求参数：
  did-详情记录编号
*输出结果：
* {"code":1,"msg":"succ"}
* 或
* {"code":400}
*/
cartRouter.get("/delete", (req, res)=>{
    var did = req.query.did;
    sql = "DELETE FROM mf_cart_detail WHERE did=?";
    pool.query(sql, [did], (err, result)=>{
        console.log(err);
        if(result.affectedRows > 0){
            res.json({code: 1, msg: "删除成功！"});
        }else{
            res.json({code: 400, msg: "删除失败！"});
        }
        
    });
});

/**
*查询指定用户的购物车内容
*请求参数：
  uid-用户ID，必需
*输出结果：
  {
    "uid": 1,
    "products":[
      {"pid":1,"title1":"xxx","pic":"xxx","price":1599.00,"count":3},
      {"pid":3,"title1":"xxx","pic":"xxx","price":1599.00,"count":3},
      ...
      {"pid":5,"title1":"xxx","pic":"xxx","price":1599.00,"count":3}
    ]
  }
*/
cartRouter.get("/select", (req, res)=>{
    var uid = req.query.uid;
    var sql = "SELECT pid,title1,pic,price,count,did FROM mf_product,mf_cart_detail WHERE mf_cart_detail.productId=mf_product.pid AND pid IN (SELECT productId FROM mf_cart_detail WHERE cartId=(SELECT cid FROM mf_cart WHERE userId=?)) AND mf_cart_detail.cartId=(SELECT cid FROM mf_cart WHERE userId=?)";
    pool.query(sql, [uid, uid], (err, result)=>{
        console.log(err);
        if(err){
            res.json({code: -1, msg: "查询失败"});
        }else{
            res.json({uid: 1, product: result});
        }
        
    });
});
/**
*根据购物车详情记录编号修改该商品购买数量
*请求参数：
  did-详情记录编号
  pid-商品编号
  count-更新后的购买数量
*输出结果：
* {"code":1,"msg":"succ"}
* 或
* {"code":400}
*/
cartRouter.get("/update", (res, req)=>{
    var did = req.query.did;
    var pid = req.query.pid;
    var count = req.query.count;
    sql = "UPDATE mf_cart_detail SET count=? WHERE did=? AND productId=?";
    pool.query(sql, [did, pid, count], (err, result)=>{
        console.log(err);
        
    });
});

module.exports = cartRouter;