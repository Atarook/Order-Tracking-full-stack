const mongoose = require('mongoose');
const mongoose_seq = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

userSchema.plugin(mongoose_seq, { inc_field: 'userId', start_seq: 1 });

module.exports = mongoose.model('User', userSchema);