-- file : config.lua
local module = {}

module.ID = node.chipid()
module.NAME = "NodeMCU-01"

module.MQTT_URL = "mqtt://m23.cloudmqtt.com"
module.MQTT_HOST = "m23.cloudmqtt.com"
module.MQTT_PORT = "13235"
module.MQTT_USER = "vicayojc"
module.MQTT_PASSWORD = "ctax1n83Dgyd"

module.DEVMODE = true
 
module.SSID = {}  
module.SSID["wlan12"] = "Lucas13yoda"
module.SSID["mans"] = "MansPaideia22"

return module  
