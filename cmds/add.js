const store = require('../lib/store')
const { append, merge, take, toLower, map, assoc, reduce, prop, lensIndex } = require('ramda')
const ls = require('./ls')
const moment = require('moment')
const shortId = require('shortid')


module.exports = async (acct, text) => {
  const [name, amount] = map(toLower, take(2, text))

  const practice = await store.get(`${acct}_${name}`)
  const { sessions } = practice

  const newSession = {
    time: moment().format(),
    amount: Number(amount),
    id: shortId()
  }

  const newSessions = append(newSession, sessions)
  const updatedSession = assoc('sessions', newSessions, practice)

  const reduceSessionAmount = (acc, val) => acc + val.amount

/**
 * todo : parse time to hours / minutes
 */

  
  const totalCount = prop('amountType', practice) === 'time'
                      ? reduce(reduceSessionAmount, 0, newSessions)
                      : reduce(reduceSessionAmount, 0, newSessions)

  const typeStr = prop('amountType', practice) === 'time' ? 'minutes' : 'times'

  const returnMsg = `
    You have added a new ${practice.name} session!
    total: ${totalCount} ${typeStr}
  `

  return store
    .set(updatedSession)
    .then(res => returnMsg)
    .catch(err => console.log(err))
}
