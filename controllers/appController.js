// const sm = require('sitemap');
const axios = require('axios');
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
  },
};

// const sitemap = sm.createSitemap({
//   hostname: 'https://todohipo.com',
//   cacheTime: 600000,
//   urls: [{ url: '/', changefreq: 'daily', priority: 0.3 }],
// });

// exports.renderSitemap = (req, res) => {
//   sitemap.toXML((err, xml) => {
//     if (err) {
//       return res.status(500).end();
//     }
//     res.header('Content-Type', 'application/xml');
//     res.send(xml);
//   });
// };

exports.getBgPhotoData = (req, res, next) => {
  const uri = 'https://api.unsplash.com/photos/random?query=fruits';
  const clientId = process.env.UNSPLASH_ID;
  axios
    .get(uri, { headers: { Authorization: `Client-ID ${clientId}` } })
    .then(resp => {
      // Get the photo link and author
      res.locals.bgPhoto = resp.data.urls.regular;
      res.locals.pgPhotoAuthor = {
        user: resp.data.user.name,
        link: resp.data.user.links.html,
      };
      next();
    })
    .catch(err => {
      // If error, user fallback photo
      console.log(`Unsplash Error: ${err.code}`);
      res.locals.bgPhoto = '/images/cover/phone.jpg';
      res.locals.pgPhotoAuthor = null;
      next();
    });
};

exports.renderMain = async (req, res) => {
  const tips = await Tip.find();
  const title = `todohipo: ${
    tips.length ? tips.length : 'más de 50'
  } formas de quitar el hipo, la mayor guía en español`;
  const photo = res.locals.bgPhoto;
  const author = res.locals.pgPhotoAuthor;
  res.render('main', { tips, title, photo, author });
};

exports.renderPrivacyPolicy = (req, res) => {
  res.render('privacy', { title: 'Política de Privacidad' });
};

exports.newTip = (req, res) => {
  if (!res.locals.user || res.locals.user.role !== 'ADMIN') res.status(401);
  res.render('newTip', { title: 'New Tip' });
};

exports.registerTip = async (req, res) => {
  const tip = await new Tip(req.body).save();
  console.log(tip);
  req.flash('success', `Tip ${tip.name} created!`);
  res.redirect('/');
};

exports.chooseTipToUpdate = async (req, res) => {
  const tips = await Tip.find();
  if (!res.locals.user || res.locals.user.role !== 'ADMIN') res.status(401);
  res.render('chooseTip', { title: 'Choose a tip', tips });
};

exports.renderUpdateForm = async (req, res) => {
  const tip = await Tip.findOne({ _id: req.body.tip });
  res.render('update', { title: `Edit Tip - ${tip.name}`, tip });
};

exports.updateTip = async (req, res) => {
  const tip = await Tip.findOneAndUpdate({ _id: req.params.tipId }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  req.flash('success', 'successfully updated that tip');
  res.redirect(`/#tip-${tip._id}`);
};

exports.deleteTip = async (req, res) => {
  const tip = await Tip.find({ _id: req.body.tip })
    .remove()
    .exec();
  req.flash('success', 'successfully deleted that tip');
  res.redirect('/');
};

exports.renderBulkForm = (req, res) => {
  if (!res.locals.user || res.locals.user.role !== 'ADMIN') res.status(401);
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
        desc: `<p>${fullTip[1]}</p>`,
        category: fullTip[2],
      };
      // send the obj to db
      const dbTip = new Tip(tipObj).save();
    })
  );
  req.flash('success', `Yay! ${arr.length} tips successfully added!`);
  res.redirect('/');
};

exports.checkVoted = async (req, res, next) => {
  const tip = await Tip.findOne({ _id: req.params.tipId });
  if (tip.ips.indexOf(res.locals.ip) < 0) {
    next();
  } else {
    return console.error('already voted');
  }
};

exports.registerVote = async (req, res) => {
  const find = { _id: req.params.tipId };
  const votes = req.params.theVote === 'up' ? 5 : 1; // was the vote up or down?
  const update = {
    $inc: {
      'votes.total': votes,
      'votes.voteNum': 1,
    },
    $addToSet: { ips: res.locals.ip },
  };
  const options = {
    new: true,
    runValidators: true,
  };
  const tip = await Tip.findOneAndUpdate(find, update, options).exec();
  res.json(tip);
};

exports.countClick = async (req, res) => {
  if (res.locals.user.role === 'ADMIN') return;
  const { id } = req.body;
  const tip = await Tip.findOneAndUpdate(
    { _id: id },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  res.json(tip);
};

exports.resetClicks = async (req, res) => {
  const tips = await Tip.updateMany({}, { clicks: 0 });
  req.flash('success', 'The click count in every tip was reseted');
  res.redirect('back');
};

exports.resetVotes = async (req, res) => {
  const tips = await Tip.updateMany(
    {},
    {
      $set: {
        'votes.total': 0,
        'votes.voteNum': 0,
      },
    }
  );
  req.flash('success', 'All the votes were reseted');
  res.redirect('back');
};

exports.resetIps = async (req, res) => {
  const tips = await Tip.updateMany({}, { ips: '' });
  req.flash('success', 'All the ips were reseted');
  res.redirect('back');
};

exports.deleteTips = async (req, res) => {
  const tips = await Tip.find()
    .remove()
    .exec();
  req.flash('success', 'All the tips were removed 🤷‍♂️');
  res.redirect('back');
};
