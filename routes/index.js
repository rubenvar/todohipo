const express = require('express');

const router = express.Router();
const appController = require('../controllers/appController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/sitemap.xml', appController.renderSitemap);

router.get(
  '/',
  appController.getBgPhotoData,
  catchErrors(appController.renderMain)
);
router.get('/politica-de-privacidad', appController.renderPrivacyPolicy);

router.get('/register', userController.renderRegister);
router.post(
  '/act/register',
  userController.validateRegister,
  catchErrors(userController.register),
  userController.login
);

router.get('/login', userController.renderLogin);
router.post('/act/login', userController.login);
router.post('/act/logout', userController.logout);

router.get('/new', appController.newTip);
router.post('/add-tip', catchErrors(appController.registerTip));

router.get('/bulk', appController.renderBulkForm);
router.post(
  '/bulk-upload-tips',
  appController.upload,
  catchErrors(appController.getData),
  catchErrors(appController.bulkAddTips)
);

router.get('/update', catchErrors(appController.chooseTipToUpdate));
router.post('/update-form', catchErrors(appController.renderUpdateForm));
router.post('/add-tip/:tipId', catchErrors(appController.updateTip));
router.post('/delete', catchErrors(appController.deleteTip));

router.post('/reset-clicks', catchErrors(appController.resetClicks));
router.post('/reset-votes', catchErrors(appController.resetVotes));
router.post('/reset-ips', catchErrors(appController.resetIps));
router.post('/delete-tips', catchErrors(appController.deleteTips));

router.post(
  '/vote/:tipId/:theVote',
  catchErrors(appController.checkVoted),
  catchErrors(appController.registerVote)
);

router.post('/api/count-click', appController.countClick);

module.exports = router;
