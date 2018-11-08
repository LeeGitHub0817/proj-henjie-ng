import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../services/product.service";
@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {

  newsDetailData:any;//新闻数据
  nid:any;//新闻id
  newsTime:any//新闻时间

  constructor(private httpNews:ProductService, private routerParam:ActivatedRoute) { }

  ngOnInit() {
    this.routerParam.params.subscribe((data:any)=>{
      this.nid = data.nid;
      this.newsDetail();
    });
  }

  newsDetail(){
    this.httpNews.selectNewsDetail(this.nid).subscribe((data:any)=>{
      console.log(data);
      this.newsDetailData = data;
      var date = new Date(data.pubTime);
      this.newsTime = date.toLocaleString();
    });
  }

}
