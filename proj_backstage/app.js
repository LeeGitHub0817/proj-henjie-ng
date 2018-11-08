var express = require("express");

var app = express();

app.listen(3000, ()=>{
    console.log("Server is running!");
});

//配置中间件
var cors = require("cors");
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var cookieParser = require("cookie-parser");
app.use(cookieParser());

var morgan = require("morgan");
app.use(morgan("dev"));

var compression = require("compression");
app.use(compression());

app.use("/cart", require("./routes/cart"));
app.use("/news", require("./routes/news"));
app.use("/index", require("./routes/index"));
app.use("/productdetail", require("./routes/product_detail"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));



