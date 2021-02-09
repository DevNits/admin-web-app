const firebase = require('../db');
const Driver = require('../models/driver');
const Road = require('../models/road');

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
            const driverName = data.data().name;
            const driverPhone = data.data().phone;

            const dataR = await driver.collection('routes');
            const dataRoute = await dataR.get();
            let driR = [];
            if (dataRoute.empty) {
                res.status(404).send('No driver-route found!');
            } else {
                dataRoute.forEach(doc => {
                    const driver = new Road(
                        doc.id,
                        doc.data().name,
                        doc.data().lat,
                        doc.data().lng
                    );
                    driR.push(driver);
                });
                res.json({
                    driver: {
                        driverName,
                        driverPhone,
                        routes: driR
                    }
                });
            }
        }
    } catch (err) {
        res.status(404).send(err.message);
    }
}

const updateDriver = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        // console.log(data);
        const driver = await firestore.collection('drivers').doc(id);

        const road = await firestore.collection('roads').doc(data.route);
        const roadDetails = await road.get();
        const roadD = await roadDetails.data();
        // console.log(roadD);

        const { name, longitude, latitude } = roadD;

        await driver.collection('routes').doc().set({
            name,
            lat: latitude,
            lng: longitude
        }, { merge: true });
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