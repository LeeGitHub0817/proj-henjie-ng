import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  //设置相关参数
  type:any = 1; //产品类型
  pageNum:any = 1; //第几页
  pageC:any[] = []; //页数
  products:any; //数据
  wash:any = true; //洗漱产品
  shower:any = false; //淋浴产品
  constructor(private httpPro: ProductService, private roterParam: ActivatedRoute) { }

  ngOnInit() {
    this.roterParam.params.subscribe((data:any)=>{
      this.type = data.type;
      if(data.type == 1){
        this.wash = true;
        this.shower = false;
      }else if(data.type == 2){
        this.wash = false;
        this.shower = true;
      }
      this.loadProduct();
    });
  }

  //加载数据
  loadProduct(){
    this.httpPro.selectProduct(this.type, this.pageNum).subscribe((data:any)=>{
      //保存页数前先清空数组
      this.pageC.splice(0, this.pageC.length);
      console.log(data);
      //将数据保存起来
      this.products = data.data;
      //保存当前页码
      this.pageNum = data.pageNum;
      for(let i = 1; i <= data.pageCount; i++){
        this.pageC.push(i);
      }
    })
  }
  //切换页数
  switchPage(e, pageNum){
    e.preventDefault();
    this.httpPro.selectProduct(this.type, pageNum).subscribe((data:any)=>{
      console.log(data);
      this.products = data.data;
      this.pageNum = data.pageNum;
    })
  }
  //点击上一页
  prevPage(e){
    e.preventDefault();
    console.log(this.pageNum);
    if(this.pageNum != 1){
      this.httpPro.selectProduct(this.type, parseInt(this.pageNum)-1).subscribe((data:any)=>{
        console.log(data);
        this.products = data.data;
        this.pageNum = data.pageNum;
      })
    }
  }
  //点击下一页
  nextPage(e){
    e.preventDefault();
    console.log(this.pageNum);
    if(this.pageNum != this.pageC.length){
      this.httpPro.selectProduct(this.type, parseInt(this.pageNum)+1).subscribe((data:any)=>{
        console.log(data);
        this.products = data.data;
        this.pageNum = data.pageNum;
      })
    }
  }
}
