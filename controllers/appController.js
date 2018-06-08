const mongoose = require('mongoose');
const Tip = mongoose.model('Tip');

exports.renderMain = async (req, res) => {
  const tips = await Tip.find();
  res.render('main', { tips });
};

exports.newTip = (req, res) => {
  res.render('newTip');
};

exports.registerTip = async (req, res) => {
  const tip = await (new Tip(req.body)).save();
  req.flash('success', `Tip ${tip.name} created!`);
  res.redirect('/');
};

exports.editTip = async (req, res) => {
  res.render('editTip');
};