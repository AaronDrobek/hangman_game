const express          = require("express");
const path             = require("path");
const mustacheExpress  = require("mustache-express");
const bodyParser       = require("body-parser");
const routes           = require("./routes/index");
const expressValidator = require("express-validator");
const morgan           = require("morgan");
const session          = require("express-session");
const parseurl         = require("parseurl");
const readline         = require("readline");
const app = express();



app.use(express.static("public"));


app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());

 app.use(session({
   secret: "goodforonesession",
   resave: false,
   saveUninitialized: true
 }));


app.use(morgan("dev"));

app.use(routes);


app.listen(3000, function(){
  console.log("word game running on localhost3000");
})
