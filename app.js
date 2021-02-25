const { static } = require('express');
var express = require('express')
var app = express()
var mainCtrl = require("./controllers/mainCtrl.js");

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smsdbv2', { useMongoClient: true });
mongoose.Promise = global.Promise;


app.set("view engine" , "ejs");
// create restful routers
app.get('/', mainCtrl.showIndex);
app.get('/add', mainCtrl.showAdd); // show form page
app.post('/add', mainCtrl.doAdd); // Ajax save form data
app.get('/check', mainCtrl.check); // Ajax check if the username is in used


app.use(express.static("public"))
app.listen(3000)
console.log("hahaha")