const { static } = require('express');
var express = require('express')
var app = express()
var mainCtrl = require("./controllers/mainCtrl.js");

app.set("view engine" , "ejs");
// create restful routers
app.get('/', mainCtrl.showIndex);
app.get('/add', mainCtrl.showAdd);

app.use(express.static("public"))

app.listen(3000)
console.log("hahaha")