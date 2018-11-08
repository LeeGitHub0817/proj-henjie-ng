import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_PRODUCT = "http://localhost:3000/product";
  URL_PRO_DETAIL = "http://localhost:3000/productdetail/detail";
  URL_BUY_PRODUCT = "http://localhost:3000/cart/add";
  URL_NEWS_DETAIL = "http://localhost:3000/news/detail";

  constructor(private httpPro:HttpClient) { }

  selectProduct(type, pageNum){
    return this.httpPro.get(this.URL_PRODUCT + "?type=" + type + "&pageNum=" + pageNum);
  }

  selectProDetail(pid){
    return this.httpPro.get(this.URL_PRO_DETAIL + "?pid=" + pid);
  }
  
  buyProduct(uid, pid){
    return this.httpPro.get(this.URL_BUY_PRODUCT + "?uid=" + uid + "&pid=" + pid);
  }

  selectNewsDetail(nid){
    return this.httpPro.get(this.URL_NEWS_DETAIL + "?nid=" + nid);
  }
}