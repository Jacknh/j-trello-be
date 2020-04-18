const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

schema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model('User', schema);