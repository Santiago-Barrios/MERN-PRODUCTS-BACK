const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  typeName: {type: String, required: true, unique:true},
  userId : {type:String, required:true},
});

module.exports = mongoose.model('type', typeSchema);