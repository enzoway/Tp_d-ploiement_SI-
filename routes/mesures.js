const express = require('express');
const router = express.Router();
const mesureController = require('../controllers/mesureController');

router.get('/', mesureController.getAllMesures);
router.get('/variable/:variableId', mesureController.getMesuresByVariable);
router.get('/daterange', mesureController.getMesuresByDateRange);
router.post('/', mesureController.createMesure);

module.exports = router;
