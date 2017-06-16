const ls = require('./ls')
const help = require('./help')
const add = require('./add')
const check = require('./check')
const rm = require('./rm')
const newPractice = require('./new')

const { join, prop, toLower, head } = require('ramda')
const store = require('../lib/store')

module.exports = async (acct, cmd, rest) => {
  switch (toLower(cmd || '')) {
    case 'rm':
      return rm(acct, Number(head(rest)))
    case 'check':
      return check(acct, Number(head(rest)))
    case 'add':
      return add(acct, rest)
    case 'new':
      return newPractice(acct, rest)
    case 'ls':
      const state = await store.get(acct)
      return ls(prop('todos', state))
    default:
      return help()
  }
}
