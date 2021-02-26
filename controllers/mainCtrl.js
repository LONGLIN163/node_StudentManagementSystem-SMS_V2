var Student=require('../models/Student');
const formidable = require('formidable');

exports.showIndex=function(req,res){
    res.render("index");
}

exports.getAllStudents=function(req,res){
    //Student.findAllStudents();
    //use native method to find
    Student.find({},function(err,results){
        res.json({"results":results});
    })
}

exports.showAdd=function(req,res){
    res.render("add");
}

exports.showUpdate=function(req,res){
    
    var sid=req.params.sid;

    //use native method to find this student
    Student.find({"sid":sid},function(err,results){
        //res.json({"results":results});
        console.log("showUpdate results:",results)
        if(results.length==0){
           res.send("no this person, please check address.");
           return; 
        }

        res.render("modify",{
            info:results[0]
        });
    })

    //res.render("modify");
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
    console.log("this is check(),someone send /student/:sid propfind request.");
    
    Student.checkSid(sid,function(result){
        // sent response to console, if true, this sid is not in use.
        res.json({"result":result});
    })
}

// add student to database
exports.doAddStudent=function(req,res){
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