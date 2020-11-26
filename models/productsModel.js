const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({

  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  precio: { type: Number, required: true },
  cantidad: { type: Number, required: true },
  userId : {type:String, required:true}

});

module.exports = mongoose.model('Product', ProductSchema);