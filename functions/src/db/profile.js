const { firebase } = require('../config/firebase')
const { uuid } = require('uuidv4')

const writeProfile = async (newProfile) => {
    var referData;
    try {
        var ref = await firebase
            .child('users')
            .child('me')
            .push()

        newProfile.refers = uuid()
        newProfile.key = ref.key

        referData = {
            id: newProfile.refers,
            key: newProfile.key,
            name: newProfile.name,
            mobile: newProfile.mobile,
            UID: newProfile.UID
        }

        await ref.set(newProfile)

        try {
            await firebase
                .child("referralKeys")
                .child(referData.id)
                .set({
                    key: referData.key,
                    name: referData.name,
                    mobile: referData.mobile,
                    uid: referData.UID
                })

        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
}

const readProfile = async (uid) => {
    try {
        var val = await firebase
            .child('users')
            .child('me')
            .orderByChild('UID')
            .equalTo(uid)
            .limitToFirst(1)
            .once('value')
            .then((snap) => {
                var val;
                snap.forEach((e) => {
                    val = e.val()
                })

                if (val === undefined) {
                    return {
                        flag: false,
                        error: "Profile empty"
                    }
                }

                return {
                    flag: true,
                    val: val
                }
            })
            .catch((e) => {
                throw new Error(e.message)
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

const updateProfile = async (profile, uid) => {
    try {
        var user = await firebase
            .child('users')
            .child('me')
            .orderByChild('UID')
            .equalTo(uid)
            .limitToFirst(1)
            .once('value')
            .then((val) => {
                var user
                val.forEach((el) => {
                    user = el.val()
                })
                return {
                    flag: true,
                    val: user
                }
            })
            .catch((e) => {
                return {
                    flag: false,
                    error: e.message
                }
            })

            if (user.flag) {
                var flag = await firebase
                .child('users')
                .child('me')
                .child(user.val.key)
                .update(profile)
                .then((e) => true)
                .catch((E) => false)

                return {
                    flag: flag
                }

            } else {
                return user
            }
               
    } catch (error) {
        console.log(error)
        return {
            flag: false,
            error: error.message
        }
    }
}

module.exports = {
    writeProfile,
    readProfile,
    updateProfile
}