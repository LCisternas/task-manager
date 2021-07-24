/* Dependencies */
const express = require('express');
const cors = require('cors');
const app = express();

/* Connect DB */
const DB = require('./config/db')
DB();

/* CORS */
app.use(cors())

/* express.json for read forms */
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

/* Creating Server */
const PORT = process.env.PORT || 4000

/* ROUTES */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyects', require('./routes/proyects'));
app.use('/api/tasks', require('./routes/tasks'));

/* Init Server */
app.listen(PORT, () => {
  console.log(`RUN SERVER ON PORT ${PORT}`)
})