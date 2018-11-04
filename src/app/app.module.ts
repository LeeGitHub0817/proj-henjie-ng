import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http"; //http请求模块
import { RouterModule } from "@angular/router"; //路由模块

import { ProductService } from "./services/product.service"; //服务
import { UserService } from "./services/user.service";


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { NewsComponent } from './news/news.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';


const routes = [
  {path: "", component: IndexComponent},
  {path: "about", component: AboutComponent},
  {path: "cart", component: CartComponent},
  {path: "contact", component: ContactComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "product/:type", component: ProductComponent},
  {path: "productdetail/:pid", component: ProductdetailComponent},
  {path: "news", component: NewsComponent},
  {path: "newsdetail/:nid", component: NewsdetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    CartComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ProductdetailComponent,
    NewsComponent,
    NewsdetailComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    ProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
