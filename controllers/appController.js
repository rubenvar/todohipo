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

exports.chooseTipToUpdate = async (req, res) => {
  const tips = await Tip.find();
  res.render('chooseTip', { tips });
};

exports.renderUpdateForm = async (req, res) => {
  const tip = await Tip.findOne( { _id: req.body.tips });
  res.render('update', { tip });
};

exports.updateTip = async (req, res) => {
  const tip = await Tip.findOneAndUpdate({ _id: req.params.tipId }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', 'successfully updated that tip');
  res.redirect('/');
};

exports.deleteTip = async (req, res) => {
  // res.json(req.body);
  const tip = await Tip.find({ _id: req.body.id }).remove().exec();
  req.flash('success', 'successfully deleted that tip');
  res.redirect('/');
};