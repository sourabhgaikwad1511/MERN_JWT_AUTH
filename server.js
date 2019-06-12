const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const user = require('./routes/api/user');

var app = express();

// Body-Parser Middleware

app.use(bodyParser.json());

// DB config
const db = config.get('mongoURI');

// connect to mongo 
  
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(()=> console.log('DB is Connected...'))
.catch(err => console.log('DB error' + err));

// use Routes
app.use('/api/user', user);
 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on PORT ${port}`));