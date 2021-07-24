/* CONFIG DATABASE */
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
/* ¡¡¡Deprecation Warnings!!! */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
/* CONNECTION DB */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('DB CONNECT!')
  }
  catch (error){
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;