const dotenv = require('dotenv');
const assert = require('assert');
dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,

    APP_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID,
    MES_ID
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST os required');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    firebaseConfig: {
        apiKey: APP_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGE_SENDER_ID,
        appId: APP_ID,
        measurementId: MES_ID
    }
}