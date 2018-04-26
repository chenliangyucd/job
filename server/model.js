const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/job';

mongoose.connect(DB_URL);

mongoose.connection.on("connected", function () {
  console.info("mongoose connected success");
});

const models = {
  users: {
   	user: {type: String, require: true},
   	pwd: {type: String, require: true},
   	type: {type: Number, require: true},
    avator: {type: String, require: false},
    job: {type: String, require: false},
    company: {type: String, require: false},
    salary: {type: String, require: false},
    job_condition: {type: String, require: false}
  }
}

for (let key in models) {
  mongoose.model(key, new mongoose.Schema(models[key]));
}



module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }	
}

