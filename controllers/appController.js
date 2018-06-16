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
  console.log(tip);
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
  const tip = await Tip.find({ _id: req.body.id }).remove().exec();
  req.flash('success', 'successfully deleted that tip');
  res.redirect('/');
};

exports.checkVoted = async (req, res, next) => {
  const tip = await Tip.findOne({ _id: req.params.tipId });
  if (tip.ips.indexOf(res.locals.ip) > -1) {
    console.log('already voted!');
    return;
  } else {
    next();
  }
};

exports.registerVote = async (req, res) => {
  const find = { _id: req.params.tipId };
  const votes = req.params.theVote === 'up' ? 1 : -1; // was the vote up or down?
  const update = { $inc: { votes }, $addToSet: { ips: res.locals.ip } };
  const options = {
    new: true,
    runValidators: true
  };
  const tip = await Tip.findOneAndUpdate(find, update, options).exec();
  res.json(tip);
};

exports.countClick = async (req, res) => {
  const id = req.body.id;
  const tip = await Tip.findOneAndUpdate({ _id: id }, { $inc: { clicks: 1 } }, { new: true });
  res.json(tip);
}