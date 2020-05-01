const mongoose = require('mongoose');

const User = mongoose.model('User'); // import here like this because it is already imported in start.js

const { body, validationResult } = require('express-validator');
const passport = require('passport');

exports.renderRegister = (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    req.flash('error', 'Nope');
    res.redirect('/');
    return;
  }
  res.render('register', { title: 'Register' });
};

exports.notRenderLogin = (req, res) => {
  req.flash('error', 'Nope');
  res.redirect('/');
};

exports.renderLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in! 👍',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/');
};

exports.validations = [
  body('name', 'El nombre no puede estar vacío').notEmpty(),
  body('email', 'El email no puede estar vacío').notEmpty(),
  body('password', 'La password no puede estar vacía').notEmpty(),
  body('password-confirm', 'La pass-confirm no puede estar vacía').notEmpty(),
  body('email', 'El email no es válido').isEmail(),
  body('password', 'La password es demasiado corta (min 5)').isLength({
    min: 5,
  }),
  body('password-confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las passwords no coinciden');
    } else {
      return value;
    }
  }),
  body('email').normalizeEmail({
    remove_dots: false,
    remove_exension: false,
    gmail_remove_subaddress: false,
  }),
];

exports.throwRegisterError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash(
      'error',
      errors.array().map(err => err.msg)
    );
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }

  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  await User.register(user, req.body.password);
  next();
};
