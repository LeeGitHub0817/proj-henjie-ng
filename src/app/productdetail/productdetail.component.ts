import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../services/product.service";
import * as $ from "jquery";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  productId:any;//产品ID
  productDetail:any;

  constructor(private httpProDetail:ProductService, private proParam:ActivatedRoute) { }
  ngOnChanges(){
    
  }
  ngOnInit() {
    this.proParam.params.subscribe((data:any)=>{
      this.productId = data.pid;
      this.loadProDetail();
    })
  }
  ngAfterContentInit(){
    
  }
  loadProDetail(){
    this.httpProDetail.selectProDetail(this.productId).subscribe((data:any)=>{
      console.log(data);
      this.productDetail = data[0];
      $(".pd_details").append(data[0].detail);
    })
  }
}
