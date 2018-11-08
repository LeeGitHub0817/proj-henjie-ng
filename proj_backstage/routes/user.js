const express = require("express");
const pool = require("../pool/pool");

var uesrRouter = express.Router();
/**
*验证电话号码是否已经存在
*请求参数：
  phone-用户名
*输出结果：
* {"code":1,"msg":"exist"}
* 或
* {"code":2,"msg":"non-exist"}
*/
uesrRouter.get("/phone", (req, res)=>{
    var phone = req.query.phone;
    var sql = "SELECT uid FROM mf_user WHERE phone=?";
    pool.query(sql, [phone], (err, result)=>{
        console.log(err);
        if(result.length == 0){
            res.json({code: 1, msg: "电话号码未注册"});
        }else{
            res.json({code: 2, msg: "电话号码已注册"});
        }
    });
});

/**
*验证用户名是否已经存在
*请求参数：
  uname-用户名
*输出结果：
* {"code":1,"msg":"exist"}  存在
* 或
* {"code":2,"msg":"non-exist"}  不存在
*/
uesrRouter.get("/uname", (req, res)=>{
    var uname = req.query.uname;
    var sql = "SELECT uid FROM mf_user WHERE uname=?";
    pool.query(sql, [uname], (err, result)=>{
        console.log(err);
        if(result.length == 0){
            res.json({code: 1, msg: "用户名未注册"});
        }else{
            res.json({code: 2, msg: "用户名已注册"});
        }
    });
});

/**
*用户登录验证
*请求参数：
  unameOrPhone-用户名或密码
  upwd-密码
*输出结果：
* {"code":1,"uid":1,"uname":"test","phone":"13012345678"}
* 或
* {"code":400}
*/
uesrRouter.post("/login", (req, res)=>{
    // var uaccount = req.query.uaccount;
    // var upwd = req.query.upwd;
    var uaccount = req.body.uaccount;
    var upwd = req.body.upwd;
    var sql = "SELECT uid,uname,phone FROM mf_user WHERE (uname=? AND upwd=?) OR (phone=? AND upwd=?)";
    pool.query(sql, [uaccount, upwd, uaccount, upwd], (err, result)=>{
        console.log(err);
        if(result.length == 0){
            res.json({code: 400, msg: "用户或密码错误！"});
        }else{
            res.json({code: 1, uid: result[0].uid, uname: result[0].uname, phone: result[0].phone});
        }
    });
})

/**
*注册新用户
*请求参数：
  uname-用户名
  upwd-密码
  phone-电话号码
*输出结果：
* {"code":1,"uid":3,"uname":"test"}
* 或
* {"code":500}
*/
uesrRouter.post("/register", (req, res)=>{
    // var uname = req.query.uname;
    // var upwd = req.query.upwd;
    // var phone = req.query.phone;
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var phone = req.body.phone;

    sql = "INSERT INTO mf_user VALUES(NULL,?, ?, ?)";
    pool.query(sql, [uname, upwd, phone], (err, result)=>{
        console.log(err);
        if(result.affectedRows > 0){
            res.json({code: 1, uid: result.insertId, uname: uname, msg: "注册成功！"});
        }else{
            res.json({code: 500, msg: "注册失败！"});
        }
    });
});

module.exports = uesrRouter;