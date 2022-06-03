// import environmental variables from our variables.env file
require('dotenv').config();
const mongoose = require('mongoose');
const packageJson = require('./package.json');

// Connect to our Database and handle any bad connections
exports.clientP = mongoose
  .connect(process.env.DATABASE, {
    autoIndex: process.env.NODE_ENV === 'development',
  })
  .then((m) => {
    console.log(`🚀 mongoose connected to db`);
    return m.connection.getClient();
  })
  .catch((err) => {
    console.error(`🙅 🚫 🙅 → ${err.message}`);
  });

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
  console.log(
    `🚀 express running v${packageJson.version} → http://localhost:${
      server.address().port
    }`
  );
});
