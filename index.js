require('dotenv').config()

const { split, path, toLower, prop } = require('ramda')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handle = require('./cmds')
const sendSMS = require('./lib/sms')


app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({ ok: true })
})

app.post('/sms', async (req, res) => {


  const body = process.env.DEV === 'true' ? prop('body', req) : path(['body', 'Body'], req)

  const [cmd, ...rest] = split(' ', prop('Body', body))

  const bodyRes = await handle(req.body.From, toLower(cmd), rest)

  sendSMS({
    to: body.From,
    from: body.To,
    body: bodyRes
  })

  res.send({ ok: true })
})

app.listen(3041)
