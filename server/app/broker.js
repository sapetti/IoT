const mqtt = require('mqtt')

function _init(options) {
    if(!options) throw new Error('MQTT: Connection options are mandatory')
    const {url, username, password, port} = options
    if(!url || !username || !password || !port) throw new Error('MQTT: Review your connection, there is at least one option missing (url, username, password or port)')

    console.log('MQTT: Estabilishing connection with MQTT server')
    this.client = mqtt.connect(url, {
        username, 
        password,
        port
    })
    
    this.client.on('connect', () => {
        console.log('MQTT: Connection to the server successful')
        this.connected = true
    })

    //TODO: handle disconnection

    this.client.on('message', (topic, message) => {
        console.log('MQTT: Message received: ', topic)
        if(!this.subscriptions[topic]) {
            //This should never happen... skip message action but log the error
            console.error('MQTT: Unsubscribed topic', topic, JSON.stringify(message))
        } else {
            //Let the callback provided handle the message content
            this.subscriptions[topic](message)
        }
    })

    return this
}

function _publish(topic, message) {
    console.log('MQTT: Publishing message for', topic)
    this.client.publish(topic, message)
    return this
}

function _subscribe(topic, callback) {
    console.log('MQTT: Subscribing to', topic)
    this.client.subscribe(topic)
    this.subscriptions[topic] = callback
    return this
}

module.exports = (function() {
    client = null
    connected = false
    subscriptions = {}

    return {
        init: _init,
        publish: _publish,
        subscribe: _subscribe
    }
})()