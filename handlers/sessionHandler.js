const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientP } = require('../start');

module.exports = session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ clientPromise: clientP }),
});
