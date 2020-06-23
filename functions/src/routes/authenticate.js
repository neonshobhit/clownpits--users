const express = require('express')
const {
    getUser
} = require('../db/authenticate')

const router = new express.Router()

router.get('/auth/me', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const user = await getUser(token)
            .then((val) => {
                if (!val.flag) throw new Error(val.error)

                return val.val
            })
            .catch((e) => {
                throw new Error(e.message)
            })
        res.send({
            "userUID": user
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router