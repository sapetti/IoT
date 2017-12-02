const broker = require('./broker'),
  config = require('./config'),
  model = require('./model'),
  router = require('./router')

const RESP = 'resp'
const REQ = 'req'

const getMillis = () => new Date().getTime()

function timeseries(id, service, value) {
  const tag = `${id}-${service}`
  console.log(tag, value, this.data[tag])
  if (this.data[tag] !== value) {
    console.log('Message received', id, value)
    model.writeData(tag, { t: getMillis(), v: value })
    this.data[tag] = value
  } else {
    console.log("Skip value as it didn't change")
  }
}

function configureTimer({ name: service, timer }) {
  console.log('Generating timer for', service)
  this.timers[service] = setInterval(() => {
    broker.publish(service + REQ, '')
  }, timer)
}

function registerBoard({ id, name, place }) {
  model.writeData('board', { id, name, place })
}

function subscribeService({ name: service, type }) {
  console.log('Subscribing to', service)
  broker.subscribe(service + RESP, message => {
    if (type === 'TS') {
      const { id, value } = JSON.parse(message)
      timeseries(id, service, value)
    } else if (type === 'board') {
      registerBoard(JSON.parse(message))
    }
  })
}

module.exports = function main() {
  this.data = {}
  this.timers = {}
  broker.init(config.mqtt)
  model.init(config.mongo)

  // Subscribe to handle the data send by the boards
  // ie: TS type service will store the data in the TimeSeries service
  config.services.filter(({ type }) => 'TS' === type).forEach(subscribeService)

  // Setup to request data for every 'timer' milliseconds for those services
  // If timer is not defined for the service, this setup is skipped
  config.services.filter(({ timer }) => timer).forEach(configureTimer)
}
