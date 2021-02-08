const express = require('express');
const router = express.Router();

const { addDriver, getAllDrivers, getDriverById } = require('../controller/drivers');

router.post('/drivers', addDriver);
router.get('/drivers', getAllDrivers);
router.get('/driver/:id', getDriverById);

module.exports = router;