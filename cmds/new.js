const store = require('../lib/store')
const { append, merge, take, toLower, map } = require('ramda')
const ls = require('./ls')

module.exports = async (acct, text) => {
  const [name, amountType] = map(toLower, take(2, text))
  const newPractice = {
    _id: `${acct}_${name}`,
    name,
    amountType,
    type: 'practice',
    user: acct,
    sessions: []
  }
  console.log('newPractice', newPractice)
  return store.set(newPractice)
          .then(res => `${name} has been added!`)
          .catch(err => console.log(err))
}
