const express = require('express');
const router = express.Router();
const model = require('./model');
const crypto = require('crypto');


const Users = model.getModel('users');
const Field = ['_id', 'user', 'type', 'avator', 'job_condition', 'salary', 'company', 'job'];


router.get('/list', function (req, res) {
  let type = req.query.type;
  let condition = typeof type === 'string'? {type}: {};
  
  Users.find(condition, {pwd: 0, __v: 0}, function (err, doc) {
  	if (err) {
      return res.json({code: 1});
  	}
  	return res.json({code: 0, data: doc});
  });
});

router.post('/register', function (req, res) {
  let {user, pwd, type} = req.body;
  Users.findOne({user} ,function (err, doc) {
    if (err) {
      return res.json({code: 1});
    }
    // 如果查询不出来则doc为空   
    if (doc) {
      return res.json({code: 1, message: '存在相同的用户名!'});
    }
    Users.create({user, pwd: md5Pwd(pwd), type}, {pwd: 0}, function (err, doc) {
      
      if (err) {
        return res.json({code: 1});
      }
      setIdCookie(res, doc._id);
      return res.json({code: 0, data: {_id: doc._id, user: doc.user, type: doc.type}});
    })
  });
});


router.post('/login', function (req, res) {
  let {user, pwd} = req.body;
  Users.findOne({user, pwd: md5Pwd(pwd)}, {pwd: 0, __v: 0}, function (err, doc) {
    if (err) {
      return res.json({code: 1});
    }

    if (doc) {
      console.log(doc);
      setIdCookie(res, doc._id);
      return res.json({code: 0, data: doc});
    } else {
      return res.json({code: 1});
    }

  });
});

// 通过id进行查找获取用户信息
router.post('/loginById', function (req, res) {
  let _id = req.cookies._id;

  console.log('_id', _id);
  if (!_id) {
    return res.json({code: 1});
  }

  Users.findOne({_id}, {pwd: 0, __v: 0}, function (err, doc) {
    
    if (err) {
      return res.json({code: 1});
    } 
    if (doc) {
      return res.json({code: 0, data: doc});
    } else {
      return res.json({code: 1});
    }
   

  });
});

// 通过_id来进行更新
router.post('/update', function (req, res) {
  let _id = req.cookies._id;
  let data = req.body;
  
  Users.findByIdAndUpdate(_id, data, function (err, doc) {
    if (err) {
      return res.json({code: 1});
    }
    
    
    // let {pwd, ...returnData} = doc; 
    
    // console.info(returnData);
    return res.json({code: 0, data: getDocField(doc)});
  })
});


function getDocField (doc) {
  let data = {};

  for (let i=0; i < Field.length; i++) {
    data[Field[i]] = doc[Field[i]];
  }

  return data;
}


function setIdCookie (res, value) {
  res.cookie('_id', value); 
}


function md5Pwd (pwd) {
  let hash = crypto.createHash('md5');
  hash.update(pwd + 'chenliangyu_java_js_sql_free');
  return hash.digest('hex');
}


module.exports = router;
