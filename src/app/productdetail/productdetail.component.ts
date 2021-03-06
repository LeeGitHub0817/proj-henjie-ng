import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../services/product.service";
import { UserService } from "../services/user.service";
import * as $ from "jquery";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  getRelaodCartData:any;
  getreloadPriceSum:number = 0;
  getreloadTotalCount:number = 0;

  productId:any;//产品ID
  uid:any;//用户id
  productData:any//产品数据
  productDetail:any//产品详情
  constructor(private httpProDetail:ProductService, private proParam:ActivatedRoute, private reloadHttp:UserService) { }

  ngOnInit() {
    this.proParam.params.subscribe((data:any)=>{
      this.productId = data.pid;
      console.log(data)
      this.uid = sessionStorage.uid;
      this.loadProDetail();
    })
  }

  //加载产品数据
  loadProDetail(){
    this.httpProDetail.selectProDetail(this.productId).subscribe((data:any)=>{
      console.log(data);
      this.productData = data[0];
      this.productDetail = data[0].detail;
    });
  }
  //加载购物车获得数据并传给子组件header
  reload(){
    this.reloadHttp.cart_load(sessionStorage.uid).subscribe((data:any)=>{
      console.log("ok")
      this.getRelaodCartData = data.product;
      for(var i = 0; i < data.product.length; i++){
        this.getreloadPriceSum += data.product[i].price;
        this.getreloadTotalCount += data.product[i].count;
      }
      console.log(this.getRelaodCartData);
      console.log(this.getreloadPriceSum);
      console.log(this.getreloadTotalCount);
    });
  }
  //加入购物车
  addCart(e){
    e.preventDefault();
    this.httpProDetail.buyProduct(this.uid, this.productId).subscribe((data:any)=>{
      console.log(data);
      if(data.stat == 1){
        this.reload();
        alert("购买成功！");
      }else{
        alert("购买失败！");
      }
    });
  }
}
