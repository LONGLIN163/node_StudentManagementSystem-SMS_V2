var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
  sid:  Number,
  name: String,
  age: Number,
  gender: String
});

// Use static method to add student.
studentSchema.statics.addStudent = function(json,callback){
    //important: Static method can not call mongodb native method.
    /*
    this.insertOne(json,function(err, res) {
      if (err) {
        console.log("insert failed!")
        return;
      }
      console.log("insert success!")
    });*/

    // Validate if sid is exist when add a student.
    Student.checkSid(json.sid,function(result){
      if(result==false){
        var s=new Student(json);
        s.save();
        callback(1);// Sid is not being used, send back 1.
      }else{
        callback(-1); // Sid is being used, send back -1.
      }
    });
}

// The method that validates if sid is exist.
studentSchema.statics.checkSid = function(sid,callback){
  this.find({"sid":sid},function(err,results){
    callback(results!=0);
  })
}

var Student = mongoose.model('Student', studentSchema);


module.exports=Student;

