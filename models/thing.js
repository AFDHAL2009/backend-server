const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  description: { type: String, required: true },
  price: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);