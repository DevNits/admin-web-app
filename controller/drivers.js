const firebase = require('../db');
const Driver = require('../models/driver');

const firestore = firebase.firestore();

const addDriver = async (req, res, next) => {
    try {
        const data = req.body;
        const drivers = await firestore.collection('drivers').doc().set(data);
        res.send('Record saved successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await firestore.collection('drivers');
        const data = await drivers.get();
        const driversArray = [];
        if (data.empty) {
            res.status(404).send('No driver found!');
        } else {
            data.forEach(doc => {
                const driver = new Driver(
                    doc.id,
                    doc.data().name,
                    doc.data().phone,
                    doc.data().route
                );
                driversArray.push(driver);
            });
            res.send(driversArray);
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const getDriverById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const driver = await firestore.collection('drivers').doc(id);
        const data = await driver.get();

        if (!data.exists) {
            res.status(404).send('Driver with the given ID not found!');
        } else {
            res.send(data.data());
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const updateDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const driver = await firestore.collection('drivers').doc(id);
        await driver.update(data);
        res.send('Updated successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const deleteDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('drivers').doc(id).delete();
        res.send('Deleted successfully!');
    } catch (err) {
        res.status(404).send(err.message);
    }
}

module.exports = {
    addDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver
};