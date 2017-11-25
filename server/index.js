// MQTT

console.log('Start...')

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://m23.cloudmqtt.com', {
    username: 'vicayojc', 
    password: 'ctax1n83Dgyd',
    port: 13235
})

client.on('connect', () => {
    client.subscribe('hello')
    client.publish('hello', 'world')
})

client.on('message', (topic, message) => {
    console.log(message.toString())
    client.end()
})

// MONGO DB

const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://softtek:Softtek1234@ds113455.mlab.com:13455/graphql', (err, db) => {
    if(err) throw new Error('Unable to connect to the server:: ' + err)
    console.log('Connected to mLab')
    insertDocuments(db, (r) => console.log('results:: ' + JSON.stringify(r)))
    db.close()
})

const insertDocuments = (db, cb) => {
    const docs = db.collection('documents')
    docs.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], 
    (err, result) => {
        if(err) throw new Error('Unable to insert documents:: ' + err)
        cb(result)
    })
}