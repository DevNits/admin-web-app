const express = require('express');
const router = express.Router();

const { addRoad, getAllRoads, getRoadByID } = require('../controller/roads');

router.post('/roads', addRoad);
router.get('/roads', getAllRoads);
router.get('/road/:id', getRoadByID);

module.exports = router;