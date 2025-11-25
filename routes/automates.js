const express = require('express');
const router = express.Router();
const automateController = require('../controllers/automateController');

router.get('/', automateController.getAllAutomates);
router.get('/:id', automateController.getAutomateById);
router.post('/', automateController.createAutomate);
router.put('/:id', automateController.updateAutomate);
router.delete('/:id', automateController.deleteAutomate);

module.exports = router;
