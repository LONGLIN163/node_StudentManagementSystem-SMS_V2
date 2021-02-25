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

app.propfind('/student/:sid', mainCtrl.check); // Ajax check if the studentID is in used,if used, no need to continue. 
app.post('/student/:sid', mainCtrl.updateStudent); // Ajax save form data
app.delete('/student/:sid', mainCtrl.deleteStudent); // Ajax save form data

app.post('/student', mainCtrl.doAddStudent); // Ajax save form data
app.get('/students', mainCtrl.getAllStudents); // Ajax get all student

app.use(express.static("public"))  
app.listen(3000)
console.log("hahaha")