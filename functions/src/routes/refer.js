const express = require('express')
const {
    readProfile
} = require('../db/profile')
const {
    writeRefer,
    readRefer,
    resetRefer,
    updateReferStatus,
    checkValidId
} = require('../db/refer')

const router = new express.Router()

router.get('/refer/:top', async (req, res) => {

    try {
        await readRefer(req.params.top)
            .then((e) => res.send(e))
            .catch((e) => {
                return res.send({
                    "error": e.message
                })
            })

    } catch (error) {
        console.log(error)
    }
})

router.post('/refer', async (req, res) => {
    try {
        var val = await readProfile(req.body.uid)

        if (!val.flag) return res.send({
            error: "Can't read your profile. Try again later or contact support."
        })

        if (val.val.alreadyReferred) return res.send({
            error: "You're already referred by someone else."
        })

        if (val.val.refers === req.body.id) return res.send({
            error: "You can't refer yourself."
        })

        var checkIfKeyIsValid = await checkValidId(req.body.id)

        if (!checkIfKeyIsValid.flag) return res.send({
            error: checkIfKeyIsValid.error
        })

        var referringStatusUpdate = await updateReferStatus(val.val.key)

        if (!referringStatusUpdate.flag) return res.send({
            error: "failed to mark you referred and hence can't process referral."
        })

        var writeReferInDatabase = await writeRefer(req.body.id)

        if (!writeReferInDatabase.flag) return res.send({
            error: "Failed to refer. Please try again or contact support." + val.error
        })

        return res.send({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            error: error.message
        })
    }
})

router.delete('/refer', async (req, res) => {
    try {
        await resetRefer(req.body.id)

        res.send({
            "message": "Success"
        })
    } catch (error) {
        console.log(error)
        res.send({
            "message": "error"
        })
    }
})



module.exports = router