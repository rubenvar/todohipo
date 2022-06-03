// import environmental variables from our variables.env file
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 → ${err.message}`);
});

// import models
require('./models/Tip');
require('./models/User');

// Start!
const app = require('./app');

// console.log(process.env.NODE_ENV);

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → http://localhost:${server.address().port}`);
});
