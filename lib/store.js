require('dotenv').config()

const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-find'))
const db = PouchDB(process.env.DB)
const { map, sum, pluck } = require('ramda')

module.exports = {
  get,
  set,
  getUserPractices
}

function get(acct) {
  return db
    .get(acct)
    .then(doc => {
      if (doc && doc.error) {
        return { counter: 0, todos: [] }
      }
      return doc
    })
    .catch(err => {
      return { counter: 0, todos: [] }
    })
}

function set(doc) {
  if (doc._id) {
    return db.put(doc)
  }
  return db.put(doc)
}

function getUserPractices(acc) {

  const formatData = ({ docs }) => {
    const addCounts = (obj) => {
      const countSum = sum(pluck('amount', obj.sessions))
      return { name: obj.name, sum: countSum }
    }
    const totals = map(addCounts,docs)
    return totals
  }

  return db.createIndex({
      index: { fields: ['type'] }
    })
    .then(function() {
      return db.find({
          selector: { 
            type: { $eq: 'practice' },
            user: { $eq: acc }
           }
        })
        .then(formatData)
    })

}
