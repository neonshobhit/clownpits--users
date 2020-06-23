const fire = require('firebase-admin')
const serviceAccount = require('./clownpits--users.json')

var firebaseConfig = {
    apiKey: "AIzaSyBGtUPKltVYV0pRiLjl-XVG8cuHWkYowOw",
    authDomain: "clownpits--users.firebaseapp.com",
    databaseURL: "https://clownpits--users.firebaseio.com",
    projectId: "clownpits--users",
    storageBucket: "clownpits--users.appspot.com",
    messagingSenderId: "97278489859",
    appId: "1:97278489859:web:dbca84525e1c37744b2536",
    measurementId: "G-TR449M5BSQ",
    credential: fire.credential.cert(serviceAccount)
}

fire.initializeApp(firebaseConfig)

const admin = fire
const firebase = fire.app().database().ref()


module.exports = {
    firebase,
    admin
}