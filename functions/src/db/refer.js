const { firebase } = require('../config/firebase')

const readRefer = async (top) => {
    var val = []
    try {
        await firebase
            .child('referrals')
            .orderByChild('count')
            .limitToLast(parseInt(top))
            .once('value')
            .then((e) => {
                e.forEach((e) => {
                    // console.log(e.key)
                    val.push(e.key)
                })
                return null
            })

        var info = val.map(key => firebase
            .child('referralKeys')
            // .child('me')
            .child(key)
            .once('value')
            .then((e) => {
                return {
                    name: e.val().name,
                    number: e.val().mobile
                }
            })
            .then((e) => e)
            .catch((e) => console.log(e)))


        var data = await Promise.all(info)
            .then((e) => e)
        return data
    } catch (error) {
        console.log(error)
        return error.message
    }
}

const writeRefer = async (id) => {
    try {
        var ref = await firebase
            .child('referrals')
            .child(id)
            .child('count')
        ref.transaction((count) => {
            return (count || 0) + 1
        })

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

const resetRefer = async (id) => {
    await firebase
        .child('referrals')

        .remove()

    // .child(id)
    // .child('count')
    // .transaction((e) => 0)

}

const updateReferStatus = async (key) => {
    try {
        await firebase
            .child('users')
            .child('me')
            .child(key)
            .update({
                alreadyReferred: true
            })

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

const checkValidId = async(id) => {
    try {
        var val = await firebase
            .child('users')
            .child('me')
            .orderByChild('refers')
            .equalTo(id)
            .limitToFirst(1)
            .once('value')
            .then((e) => {
                if (e.val() === null)
                    return {
                        flag: false,
                        error: "Not a valid referralID"
                    }
                return {
                    flag: true,
                    val: e.val()
                }
            })
            .catch((e) => {
                return {
                    flag: false,
                    error: e.message
                }
            })
        return val

    } catch (e) {
        console.log(e)
        return {
            flag: false,
            error: e.message
        }
    }
}

module.exports = {
    readRefer,
    writeRefer,
    resetRefer,
    updateReferStatus,
    checkValidId
}