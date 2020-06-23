const express = require('express')

const { auth } = require('../auth/userAuth')

const {
    writeProfile,
    readProfile,
    updateProfile
} = require('../db/profile')

const router = new express.Router()

router.get('/users/me', auth, async (req, res) => {
    try {

        var fetchedUID = req.fetchedUID

        var emailVerified = req.emailVerified

        if (!emailVerified) {
            res.send({
                "error": "Verify Email First"
            })
            return
        } else {
            var val = await readProfile(fetchedUID)
                .then((val) => {
                    if (!val.flag) throw new Error(val.error)

                    return val.val
                })
                .catch((e) => {
                    return {
                        "error": e.message
                    }
                })
            delete val.key
            res.send(val)

        }

    } catch (error) {

        console.log(error)
        res.send({
            "error": error.message
        })
    }

})

router.post('/users/me', auth, async (req, res) => {
    try {
        var fetchedUID = req.fetchedUID
        var emailVerified = req.emailVerified

        if (!emailVerified) {
            res.send({
                "error": "Verify Email First"
            })
            return
        } else {
            req.body.UID = fetchedUID

            var flag = await readProfile(fetchedUID)
                .then((val) => {
                    if (val.flag) throw new Error('Profile already available')

                    return true
                })
                .catch((E) => {
                    res.send({
                        "error": E.message
                    })

                    return false
                })

            if (flag) {
                await writeProfile(req.body)

                res.send({
                    "message": "Success"
                })
            }

        }

    } catch (error) {
        console.log(error)
        res.send({
            "error": error.message
        })
    }
})

router.patch('/users/me', auth, async (req, res) => {
    try {
        var emailVerified = req.emailVerified

        if (!emailVerified) {
            res.send({
                "error": "Verify Email First"
            })
        } else {
            delete req.body.alreadyReferred
            var val = await updateProfile(req.body, req.fetchedUID)
                .then((e) => {
                    if (!e.flag) throw new Error('failed')

                    return {
                        flag: true,
                    }
                })
                .catch((e) => {
                    return {
                        flag: false,
                        error: e.message
                    }
                })

            if (val.flag)
                res.send({
                    "message": "Success"
                })
            else
                res.send({
                    "error": val.error
                })

        }


    } catch (error) {
        console.log(error)
        res.send({
            "error": error.message
        })
    }
})

module.exports = router