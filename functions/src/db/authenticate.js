const { admin } = require('../config/firebase')

const getUser = async (token) => {
    var val

    try {
        val = await admin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                let uid = decodedToken.uid
                // console.log(uid)
                return uid
            })
            .catch((e) => {
                console.log(e)
            })
        return val

    } catch (e) {
        console.log(e)
    }

    //     .getUser('6nk6ozOsAHa6TuvGFkb8wHih1Qg1')
    //     .then((e) => val = e.toJSON())
    //     .catch((e) => console.log(e))

    // // console.log(admin.auth())
    // var data = {
    //     uid: val.uid,
    //     email: val.email,
    //     emailVerified: val.emailVerified,
    //     disabled: val.disabled,
    //     creationTime: val.metadata.creationTime,
    //     lastSignInTime: val.metadata.lastSignInTime,

    // }
    // console.log(data)
    return "no val"
}


module.exports = {
    getUser
}