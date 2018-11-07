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
  type:any = 1;//产品类型
  pageNum:any = 1;//第几页
  pageC:any = 0;//页数
  products:any; //数据
  constructor(private httpPro: ProductService, private roterParam: ActivatedRoute) { }

  ngOnInit() {
    this.roterParam.params.subscribe((data:any)=>{
      this.type = data.type;
      this.loadProduct();
    });
  }

  //加载数据
  loadProduct(){
    this.httpPro.selectProduct(this.type, this.pageNum).subscribe((data:any)=>{
      console.log(data);
      this.products = data.data;
    })
  }
}
