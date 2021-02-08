const express = require('express');
const router = express.Router();

const { addRoad, getAllRoads, getRoadByID, updateRoad, deleteRoad} = require('../controller/roads');

router.post('/roads', addRoad);
router.get('/roads', getAllRoads);
router.get('/road/:id', getRoadByID);

router.put('/driver/:id', updateRoad);
router.delete('/driver/:id', deleteRoad);

module.exports = router;