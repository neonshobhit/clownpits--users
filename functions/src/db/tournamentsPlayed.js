const { firebase } = require('../config/firebase')

const writeListOfParticipants = async (participants) => {
    try {
        await firebase
            .child('participants')
            .child('games')
            .push()
            .set(participants)
        return {
            flag: true
        }
        
    } catch (error) {
        console.log(error)
        return {
            flag: false,
            error: error.message
        }
    }
}

const readListOfParticipants = async (uid) => {
    try {
        var UID = parseInt(uid)
        var val = await firebase
            .child('participants')
            .child('games')
            .orderByChild('UID')
            .equalTo(uid)
            .once('value')
            .then((values) => {
                var vals = []
                values.forEach((el) => {
                    vals.push(el.val())
                })

                if (vals.length === 0)
                    return {
                        flag: false,
                        error: "Not registered yet"
                    }

                return {
                    flag: true,
                    val: vals
                }
            })
            .catch((E) => {
                return {
                    flag: false,
                    error: E.message
                }
            })
        
            return val
        
    } catch (error) {
        console.log(error)
        return {
            flag: false,
            error: error.message
        }
    }
}


module.exports = {
    writeListOfParticipants,
    readListOfParticipants
}