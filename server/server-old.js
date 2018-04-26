const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/job';

mongoose.connect(DB_URL);

mongoose.connection.on("connected", function () {
  console.info("mongoose connected success");
});

const Users = mongoose.model('users', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}));

// 新增
Users.create({user: 'chenliangyu1', age: 18}, function (err, doc) {
  if (!err) {
    console.log(doc);
  } else {
    console.log(err);
  }
});



const app = express();

app.get('/', function (req, res) {
  res.send('<h1>Hello </h1>');
});

// 删除节点
app.get('/remove', function (req, res) {
  Users.remove({user: req.query.user}, function (err, doc) {
    if (!err) {
      console.info(doc);
    } else {
      console.info(err);
    }
  });
});

// 查询find或者findOne
app.get('/data', function (req, res) {
  Users.find({user: req.query.user}, function (err, doc) {
  	if (!err) {
      res.json(doc);
    } else {
      console.info(err);
    }
  });
});

// 更新操作
app.get('/update', function (req, res) {
  Users.update({user: req.query.user}, {$set: {age: 16}}, function (err, doc) {
    if (!err) {
      res.json(doc);
    } else {
      console.info(err);
    }
  });
});




app.listen(9093, function () {
  console.log('Node app start at port 9093');	
});