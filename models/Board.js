const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    default: ''
  }
})

const ColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  tasks: [TaskSchema]
})

const BoardSchema = new mongoose.Schema({
  name: {
    type: String
  },
  columns: [ColumnSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
})

module.exports = mongoose.model('Board', BoardSchema);