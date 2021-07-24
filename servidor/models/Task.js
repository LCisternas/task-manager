const mongoose = require('mongoose');
/* TASK MODEL */
const TaskSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: Boolean,
    default: false
  },
  record: {
    type: Date,
    default: Date.now()
  },
  proyect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyect'
  }

})


module.exports = mongoose.model('Task', TaskSchema);