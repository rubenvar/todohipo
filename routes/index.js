const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(appController.renderMain));

router.get('/new-tip', catchErrors(appController.newTip));
router.post('/new-tip-submit', catchErrors(appController.registerTip));

router.get('/edit-tip', catchErrors(appController.editTip));

module.exports = router;