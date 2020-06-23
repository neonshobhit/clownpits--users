const functions = require('firebase-functions');

const app = require('./src/index')

exports.modules = functions.https.onRequest(app);
