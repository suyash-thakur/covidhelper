const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  name: {type: String, require: true, },
  city: {type: String, require: true, unique: true}
})


const State = mongoose.model('State', stateSchema);


module.exports = State;
