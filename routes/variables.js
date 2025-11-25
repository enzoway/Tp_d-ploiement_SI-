const express = require('express');
const router = express.Router();
const variableController = require('../controllers/variableController');

router.get('/', variableController.getAllVariables);
router.get('/automate/:automateId', variableController.getVariablesByAutomate);
router.post('/', variableController.createVariable);
router.put('/:id', variableController.updateVariable);
router.delete('/:id', variableController.deleteVariable);

module.exports = router;
