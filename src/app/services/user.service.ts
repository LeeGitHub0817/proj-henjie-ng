import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})

export class UserService{
  
  URL_LOGIN = "http://45.32.162.42:3000/user/login";
  URL_REGISTER = "http://45.32.162.42:3000/user/register";
  URL_CARTLOAD = "http://45.32.162.42:3000/cart/select";
  URL_DELETE = "http://45.32.162.42:3000/cart/delete";

  constructor(private httpUser:HttpClient){

  }
  
  //登录
  login(uaccount, upwd){
    return this.httpUser.post(this.URL_LOGIN, "uaccount="+uaccount+"&upwd="+upwd, 
      { withCredentials: true,  headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }});
  }
  //注册
  register(uname, upwd, phone){
    return this.httpUser.post(this.URL_REGISTER, "uname="+uname+"&upwd="+upwd+"&phone="+phone,
      {
        headers: { 'Content-Type':'application/x-www-form-urlencoded' }
      });
  }
  //加载购物车
  cart_load(uid){
    return this.httpUser.get(this.URL_CARTLOAD+"?uid="+uid);
  }
  //删除产品
  delete_product(did){
    return this.httpUser.get(this.URL_DELETE+"?did="+did);
  }
}