const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(appController.renderMain));

router.get('/new', appController.newTip);
router.post('/add-tip', catchErrors(appController.registerTip));

router.get('/update', catchErrors(appController.chooseTipToUpdate));
router.post('/update-form', catchErrors(appController.renderUpdateForm));
router.post('/add-tip/:tipId', catchErrors(appController.updateTip));
router.post('/delete', catchErrors(appController.deleteTip));

module.exports = router;