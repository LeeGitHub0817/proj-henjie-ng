import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //用户id
  uid:any;
  //购物车产品数据
  cartProduct:any;
  priceSum:any = 0;
  totalCount:any = 0;

  constructor(private cartLoadHttp:UserService) { }

  ngOnInit() {
    this.uid = sessionStorage.uid;
    this.loadCart();
  }

  //加载购物车
  loadCart(){
    this.cartLoadHttp.cart_load(this.uid).subscribe((data:any)=>{
      console.log(data)
      this.cartProduct = data.product;
      for(var i = 0; i < data.product.length; i++){
        this.priceSum += data.product[i].price;
        this.totalCount += data.product[i].count;
      }
      console.log(this.priceSum)
    });
  }
  //删除产品
  deletePro(did){
    this.cartLoadHttp.delete_product(did).subscribe((data:any)=>{
      console.log(data);
      this.loadCart();
    })
  }
}
