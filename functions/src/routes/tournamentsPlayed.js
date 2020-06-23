const express = require('express')
const { auth } = require('../auth/userAuth')

const {
    writeListOfParticipants,
    readListOfParticipants
} = require('../db/tournamentsPlayed')

const router = new express.Router()

router.post('/participantsInAllTournaments', auth, async (req, res) => {
    try {
        req.body.UID = String(req.fetchedUID)
        var flag = await writeListOfParticipants(req.body)

        if (!flag.flag) return res.send({
            error: flag.error
        })

        return res.send({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.send({
            "error": error.message
        })
    }
})

router.get('/participantsInAllTournaments', auth, async (req, res) => {
    try {
        var uid = String(req.fetchedUID)
        var flag = await readListOfParticipants(uid)

        if (!flag.flag) {
            return res.send({
                "error": flag.error
            })
        }
        return res.send(flag.val)

    } catch (error) {
        console.log(error)
        return res.send({
            "error": error.message
        })
    }
})

module.exports = router