const mongoose = require('mongoose');


const userdetailSchema = mongoose.Schema({
  phone: { type: Number, require: true },
  locality: {type: String, require: true},
  street: {type: String, require: true},
  city: {type: String, require: true},
  state: {type: String, require: true},
  electricityDay: {type: String, require: true},
  electricityNight: {type: String, require: true},
  medical: {type: String, require: true},
  poor: {type: String, require: true},
  ration: {type: String, require: true},
  rationShop: {type: String, require: true},
  suspect: {type: String, require: true},
  rules: {type: String, require: true},
  description: {type: String },
  addqust: {type: String}

});

const Userdetail = mongoose.model('userdetail', userdetailSchema);


module.exports = Userdetail;

