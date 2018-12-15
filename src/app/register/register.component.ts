import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import * as $ from "jquery";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  //是否同意协议
  isAgreed;
  //注册相关信息
  private uname:any;
  private upwd:any;
  private phone:any;

  constructor(private userRegister:UserService) { }

  ngOnInit() {
    
  }

  //注册
  doRegister(){
    var remail=this.emailCheck();
    var rpwd=this.pwdCheck();
    var rpwd2=this.pwdCheck2();
    var rphone=this.phoneCheck();
    if(remail&&rpwd&&rpwd2&&rphone){
      if(this.isAgreed){
        this.userRegister.register(this.uname, this.upwd, this.phone).subscribe((data:any)=>{
          if(data.code == 1){
            console.log(data);
            sessionStorage.uid = data.uid;
            sessionStorage.uname = data.uname;
            alert("注册成功！");
            history.go(-1);
          }else{
            alert("注册失败！");
          }
        });
      }else{
        alert("同意注册协议才能注册！");
      }
    }else{
      alert("你有未填写完的项目！")
    }
    
    
  }

  //验证邮箱
  emailCheck(){
    var uname= $.trim($("#uname").val().toString());
    var regEmail= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!uname){//邮箱为空时
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("请输入您的注册邮箱");
        return false;
    }else if(!regEmail.test(uname)){ 
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("请输入正确的邮箱格式");
        return false;
    }else if(this.emailExist(uname)){
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("此邮箱已被其他用户注册");
        return false;
    }else{
        $("#uname").siblings("em").show().attr("class","icon_ok");
        $("#uname").siblings("i").hide();
        return true;
    }
  }
  //验证邮箱是否被注册
  emailExist(uname){
    var back=false;
    $.ajax({
        type:"post",
        url:"http://localhost:3000/user/uname",
        data:{uname:uname},
        async:false,
        dataType: "json",
        success:function(d){
            if(d.code==2){//用户名已经存在
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
  }
  //验证密码
  pwdCheck(){
    var pwdSize= $.trim($("#upwd").val().toString()).length;
    if(!pwdSize){//邮箱为空时
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("请输入您的密码");
        return false;
    }else if(pwdSize<6||pwdSize>12){
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
        return false;
    }else{
        $("#upwd").siblings("em").show().attr("class","icon_ok");
        $("#upwd").siblings("i").hide();
        return true;
    }
  }
  //验证重复密码
  pwdCheck2(){
    var pwd= $.trim($("#upwd").val().toString());
    var pwd2= $.trim($("#upwd2").val().toString());
    if(this.pwdCheck()){
        if(pwd!=pwd2){
            $("#upwd2").siblings("em").show().attr("class","icon_error");
            $("#upwd2").siblings("i").show().text("两次输入的密码不一致");
            return false;
        }else{
            $("#upwd2").siblings("em").show().attr("class","icon_ok");
            $("#upwd2").siblings("i").hide();
            return true;
        }
    }
  }
  //验证手机号
  phoneCheck(){
    var phone= $.trim($("#phone").val().toString());
    var regPhone= /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
    if(!phone){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请填写您的手机号");
        return false;
    }else if(!regPhone.test(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请输入正确的手机号码");
        return false;
    }else if(this.phoneExist(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
        return false;
    }else{
        $("#phone").siblings("em").show().attr("class","icon_ok");
        $("#phone").siblings("i").hide();
        return true;
    }
  }
  //验证手机号是否被绑定
  phoneExist(phone){
    var back=false;
    $.ajax({
        type:"post",
        url:"http://localhost:3000/user/phone",
        data:{phone:phone},
        async:false,
        dataType: "json",
        success:function(d){
            if(d.code==2){//用户名已经存在
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
  }
}
