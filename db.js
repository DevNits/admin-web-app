const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

// const database = firebase.database();

module.exports = db;