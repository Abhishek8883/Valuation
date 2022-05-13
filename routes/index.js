var express = require('express');
var router = express.Router();
var userModel = require('./users')
var taskModel  = require('./task')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userPage', function(req, res, next) {
  res.render('addUser');
});

router.get('/taskPage', function(req, res, next) {
  userModel.find()
  .then(function(allUsers){
    res.render('createTask',{userData:allUsers})
  })
});

router.post('/createUser',function(req,res,next){
  var {name,email,mobile,id} = req.body
  userModel.create({
    name:name,
    email:email,
    mobile:mobile,
    id:id
  })
  .then(function(data){
    res.redirect('/')
  })
})

router.post('/addNewTask',function(req,res,next){
  var {userid,taskName,taskType} = req.body
  userModel.findOne({id:userid})
  .then(function(founduser){
    taskModel.create({
      user:founduser._id,
      taskName:taskName,
      taskStatus:taskType
    })
    .then(function(task){
      founduser.task.push(task._id)
      founduser.save()
      .then(function(){
        res.redirect('/')
      })
    })
  })
})


module.exports = router;
