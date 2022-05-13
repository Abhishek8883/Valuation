const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/task3")

const taskSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  taskName:String,
  taskStatus:String
})

module.exports = mongoose.model("task",taskSchema);
