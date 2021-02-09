const express = require('express');
const router = express.Router();

const { addDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver } = require('../controller/drivers');

router.post('/drivers', addDriver);
router.get('/drivers', getAllDrivers);
router.get('/driver/:id', getDriverById);

router.post('/driver/:id/assign-route', updateDriver);
router.delete('/driver/:id', deleteDriver);

module.exports = router;