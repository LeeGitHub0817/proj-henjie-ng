import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  pageC:any;
  pageCur:any = 1;
  constructor() { }

  ngOnInit() {
    //加载内容
    this.newsList(this.pageCur);
    //页码点击事件
    var that = this;
    $(".pages").on('click','a',function(e){
      e.preventDefault();//清除a标记的默认行为
      var pageN=$(this).index();
      //console.log(pageN);
      if(pageN==0){//当点击的是“上一页”的时候
        if(that.pageCur==1) return;
        that.pageCur--;
      }else if(pageN== that.pageC+1){//当点击的是下一页”的时候
        if(that.pageCur==that.pageC) return;
        that.pageCur++;
      }else{
        that.pageCur=pageN;
      }
      //console.log(pageCur)
      that.newsList(that.pageCur);
  });
  }

  //时间转换函数
  dateFormat(time){
    var t=new Date(time);
    var year= t.getFullYear();
    var month= t.getMonth()+1;
    var day= t.getDate();
    return year+"-"+month+"-"+day;
  }
  newsList(pageCur){
    var that = this;
    $.ajax({
      type:"get",
      url:"http://localhost:3000/news/list",
      data:{pageNum:pageCur},
      success:function(d){
          //console.log(d);
          //动态添加新闻列表
          console.log(d)
          var data= d.data;
          var n= data.length;
          //console.log(n);
          var htmlText="";
          for(var i=0;i<n;i++){
              var t=that.dateFormat(parseInt(data[i].pubTime));
              htmlText+='<li><span>'+t+'</span><a href="news_details.html?nid='+data[i].nid+'">'+data[i].title+'</a></li>';
          }
          $(".news>ul").html(htmlText);

          //动态添加页码
          var pageHtml='<a href="prev">上一页</a>';
          that.pageC=d.pageCount;
          for(var i=1;i<that.pageC+1;i++){
              pageHtml+='<a href="'+i+'">'+i+'</a>';
          }
          pageHtml+='<a href="next">下一页</a>';
          $(".pages").html(pageHtml);
          if(pageCur==1){
              $(".pages a:first").addClass("default");
          }
          if(pageCur==that.pageC){
              $(".pages a:last").addClass("default");
          }
          $(".pages a").eq(pageCur).addClass("cur");
      }
    });
  }
}
