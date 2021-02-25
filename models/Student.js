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
      if(result==true){
        var s=new Student(json);
        s.save(function(){
          if (err) {
            callback(-2);// Wo cao, server bug.
            return;
          } 
          callback(1);// Sid is not being used, send back 1.
        });

      }else{
        callback(-1); // Sid is being used, send back -1.
      }
    });
}

// The method that validates if sid is exist.
studentSchema.statics.checkSid = function(sid,callback){
  this.find({"sid":sid},function(err,results){
    console.log("checkSid---results",results)
    var bl=(results.length==0);
    console.log("bl1",bl)//if true, no this sid in db.u can add it into db.
    callback(bl);
  })
}

var Student = mongoose.model('Student', studentSchema);


module.exports=Student;

