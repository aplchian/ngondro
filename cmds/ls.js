const store = require('../lib/store')
const { join, map, ifElse, always, equals } = require('ramda')

module.exports = sums => {
  return `
Totals
---------------
${list(sums)}
---------------
  `
}

function list(sessions) {
  return join('\n', map(li, sessions))
}

function li({ name, sum }) {
  return `${name}: ${sum}`
}
