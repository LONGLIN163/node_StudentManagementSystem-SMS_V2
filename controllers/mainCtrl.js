var Student=require('../models/Student');
const formidable = require('formidable');

exports.showIndex=function(req,res){
    res.render("index");
}

exports.showAdd=function(req,res){
    res.render("add");
}

exports.updateStudent=function(req,res){
    res.render("add");
}

exports.deleteStudent=function(req,res){
    res.render("add");
}

//check if username is in used
exports.check=function(req,res){
    var sid=req.params.sid;
    console.log("this is check(),someone send /:sid propfind request.");
    
    Student.checkSid(sid,function(result){
        // sent response to console, if true, this sid is not in use.
        res.json({"result":result});
    })
}

// add student to database
exports.doAdd=function(req,res){
    console.log("Somebody is sending a post request here!!!")
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //console.log(fields);
        //received form data from post "/add",then create Student and database persistence
        //(new Student(fields)).save();

        Student.addStudent(fields,function(result){
            res.json({"result":result});// sent response to console.
            if(result==1){
                console.log("ok");
            }else{
                console.log("This sid is already in use!!!")
            }
        });
      });

    /*
    //unit test
    var s = new Student({
        sid:  1001,
        name: "haha",
        age: 15,
        gender: "male"
    });
    s.save();*/
}