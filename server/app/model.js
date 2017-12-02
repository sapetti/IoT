const { MongoClient } = require('mongodb')
//const Promise = require('bluebird')

function _init(options) {
  if (!options) throw new Error('MongoDB: Connection options are mandatory')
  const { url, user, password, port, database } = options
  if (!url || !user || !password || !port || !database)
    throw new Error(
      'MongoDB: Review your connection, there is at least one option missing (url, user, password, port or database)'
    )
  MongoClient.connect(
    `mongodb://${user}:${password}@${url}:${port}/${database}`,
    (err, db) => {
      if (err)
        throw new Error('MongoDB: Unable to connect to MongoDB server:: ' + err)
      console.log('MongoDB: Connected to MongoDB database')
      this.connected = true
      this.db = db
    }
  )
  return this
}

function _readData(collection, query, cb) {
  this.db
    .collection(collection)
    .find(query)
    .toArray(function(err, items) {
      if (err) throw new Error('MongoDB: Unable to read documents:: ' + err)
      console.log('MongoDB: Documents retrieved:: ' + items.length)
      cb(items)
    })
  return this
}

function _writeData(collection, document, cb) {
  this.db.collection(collection).insert(document, (err, result) => {
    if (err) throw new Error('MongoDB: Unable to insert documents:: ' + err)
    console.log('MongoDB: Document/s inserted')
    if (cb) cb(result)
  })
  return this
}

module.exports = (function() {
  db = null
  connected = false
  return {
    init: _init,
    writeData: _writeData,
    readData: _readData
  }
})()
