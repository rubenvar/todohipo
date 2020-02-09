const mongoose = require('mongoose');

//  import environmental variables from our variables.env file
require('dotenv');

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true, // this line prevents an error (deprecation after 4.11)
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 → ${err.message}`);
});

// import models
require('./models/Tip');
require('./models/User');

// Start!
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
