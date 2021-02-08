const firebase = require('../db');
const Road = require('../models/road');

const firestore = firebase.firestore();

const addRoad = async (req, res, next) => {
    try {
        const data = req.body;
        const student = await firestore.collection('roads').doc().set(data);
        res.send('Record saved successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const getAllRoads = async (req, res, next) => {
    try {
        const roads = await firestore.collection('roads');
        const data = await roads.get();
        const roadsArray = [];
        if (data.empty) {
            res.status(404).send('No road found!');
        } else {
            data.forEach(doc => {
                const road = new Road(
                    doc.id,
                    doc.data().name,
                    doc.data().latitude,
                    doc.data().longitude
                );
                roadsArray.push(road);
            });
            res.send(roadsArray);
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const getRoadByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const road = await firestore.collection('roads').doc(id);
        const data = await road.get();

        if (!data.exists) {
            res.status(404).send('Road with the given ID not found!');
        } else {
            res.send(data.data());
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const updateRoad = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const road = await firestore.collection('roads').doc(id);
        await road.update(data);
        res.send('Updated successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const deleteRoad = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('roads').doc(id).delete();
        res.send('Deleted successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

module.exports = {
    addRoad, getAllRoads, getRoadByID, updateRoad, deleteRoad
};