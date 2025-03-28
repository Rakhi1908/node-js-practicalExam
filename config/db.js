const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskmanagement');

const db = mongoose.connection;

db.on('connected',(err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database connected...");
    }
})


module.exports = db;