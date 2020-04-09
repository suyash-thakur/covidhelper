const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
  name: {type: String, require: true, },
  locality: {type: String, require: true, unique: true}
})



const City = mongoose.model('City', citySchema);


module.exports = City;
