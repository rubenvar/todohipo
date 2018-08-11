const mongoose = require('mongoose');
const Tip = mongoose.model('Tip');
const multer = require('multer');
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isText = file.mimetype.startsWith('text/');
        if (isText) {
            next(null, true);
        } else {
            next({ message: "That filetype isn't allowed!" }, false);
        }
    }
};

exports.renderMain = async (req, res) => {
  const tips = await Tip.find();
  const title = `todohipo: ${tips.length ? tips.length : 'más de 50'} formas de quitar el hipo, la mayor guía en español`;
  res.render('main', { title, tips });
};

exports.renderPrivacyPolicy = (req, res) => {
  res.render('privacy', { title: 'Política de Privacidad' });
}

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
  const tip = await Tip.findOne( { _id: req.body.tip });
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
  const tip = await Tip.find({ _id: req.body.tip }).remove().exec();
  req.flash('success', 'successfully deleted that tip');
  res.redirect('/');
};

exports.renderBulkForm = (req, res) => {
  res.render('bulk-add', { title: 'Bulk Add' });
};

exports.upload = multer(multerOptions).single('txtfile');

exports.getData = async (req, res, next) => {
  if (!req.file) {
    console.log('no hay file!');
    next();
    return;
  }
  res.locals.allText = await req.file.buffer.toString('utf8');
  next();
};

exports.bulkAddTips = async (req, res) => {
  const text = res.locals.allText;
  // parse the content
  const cat = req.body.category;
  const arr = text.split(/\n/);
  // for each tip, create a valid object for the db and store it
  await Promise.all(
    arr.map(tip => {
      const fullTip = tip.split(/\|/);
      fullTip.push(cat);

      const tipObj = {
        name: fullTip[0],
        desc: '<p>' + fullTip[1] + '</p>',
        category: fullTip[2]
      };
      // send the obj to db
      const dbTip = (new Tip(tipObj)).save();
    })
  );
  req.flash('success', `Yay! ${arr.length} tips successfully added!`)
  res.redirect('/');
};

exports.checkVoted = async (req, res, next) => {
  const tip = await Tip.findOne({ _id: req.params.tipId });
  if (tip.ips.indexOf(res.locals.ip) > -1) {
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
};

exports.resetClicks = async (req, res) => {
  const tips = await Tip.updateMany({}, { clicks: 0 });
  req.flash('success', 'The click count in every tip was reseted');
  res.redirect('back');
};

exports.resetVotes = async (req, res) => {
  const tips = await Tip.updateMany({}, { votes: 0 });
  req.flash('success', 'All the votes were reseted');
  res.redirect('back');
};

exports.resetIps = async (req, res) => {
  const tips = await Tip.updateMany({}, { ips: "" });
  req.flash('success', 'All the ips were reseted');
  res.redirect('back');
};

exports.deleteTips = async (req, res) => {
  const tips = await Tip.find().remove().exec();
  req.flash('success', 'All the tips were removed 🤷‍♂️');
  res.redirect('back');
}