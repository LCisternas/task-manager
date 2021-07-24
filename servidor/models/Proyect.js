const mongoose = require('mongoose');
/* PROYECT MODEL */
const ProyectSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  record: {
    type: Date,
    default: Date.now()
  }

})

module.exports = mongoose.model('Proyect', ProyectSchema);