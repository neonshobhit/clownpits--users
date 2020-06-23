const { admin } = require('../config/firebase')

const auth = async (req, res, next) => {
    var uid
    var emailVerified
    try {

        const token = req.header('Authorization').replace('Bearer ', '')

        await admin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                emailVerified = decodedToken.email_verified
                uid = decodedToken.uid
                return null
            })
            .catch((e) => {
                return res.send({
                    "error": "invalid token"
                })
            })

        if (uid !== undefined) {
            req.fetchedUID = uid
            req.emailVerified = true
            return next()
        } else {
            return res.send({
                "error": "can't fetch details"
            })
        }

        

    } catch (error) {
        res.send({
            "error": error.message
        })
    }

    return null
}

module.exports = {
    auth
}