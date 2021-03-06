let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let message = new Schema({
  author: String,   
  content: String,
  time: String,
  messageId: String,
  addAt: {type: Date, default: Date.now},
});

const Message = mongoose.model('message', message);

module.exports = Message;