import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uaccount:any;
  upwd:any;

  constructor(private userLogin:UserService, private router:Router) { }

  ngOnInit() {

  }

  //失去焦点时用户名框验证
  unameCheck(){
    var uname = $.trim($("#uname").val().toString());
    if(!uname){//用户名为空的时候
        $("#uname_prompt_text").show().text("用户名不能为空");
        $("#uname_prompt_icon").show();
        return false;
    }else{
        $("#uname_prompt_text").hide();
        $("#uname_prompt_icon").hide();
        return true;
    }
  }
  //失去焦点时密码框验证
  pwdCheck(){
    var pwd= $.trim($("#pwd").val().toString());
    if(!pwd){//密码为空的时候
        $("#pwd_prompt_text").show().text("用户名不能为空");
        $("#pwd_prompt_icon").show();
        return false;
    }else{
        $("#pwd_prompt_text").hide();
        $("#pwd_prompt_icon").hide();
        return true;
    }
  }

  //登录
  doLogin(){
    this.userLogin.login(this.uaccount, this.upwd).subscribe((data:any)=>{
      console.log(data);
      if(data.code == 400){
        $("#uname_prompt_text").show().text("用户名或密码不正确");
      }else{
        sessionStorage.uid= data.uid;
        sessionStorage.uname= data.uname;
        // this.router.navigateByUrl("/");
        history.go(-1);
        // location.href = "/";
      }
    });
  }
}
