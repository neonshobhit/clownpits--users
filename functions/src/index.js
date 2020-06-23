const express = require('express')
const cors = require('cors')

const profileRouter = require('./routes/profile')
const referRouter = require('./routes/refer')
const authRouter = require('./routes/authenticate')
const tournamentRouter = require('./routes/tournamentsPlayed')


const app = express()

app.use(cors())

app.use(express.json())

app.use(profileRouter)
app.use(referRouter)
app.use(authRouter)
app.use(tournamentRouter)


app.get('*', (req, res) => {
    res.send({
        "error": "No body"
    })
})

app.delete('*', (req, res) => {
    res.send({
        "error": "No Page"
    })
})
app.post('*', (req, res) => {
    res.send({
        "error": "No body"
    })
})
app.patch('*', (req, res) => {
    res.send({
        "error": "No body"
    })
})


module.exports = app