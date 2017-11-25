
--local TEMPERATURE_PIN = 2

--gpio.mode(2, gpio.INPUT)

--function measureTemperature()
--  local r = gpio.read(2)--TEMPERATURE_PIN)
--  local temp = r * 28500 / 1024
--  print("Temperature returned! " .. temp)
--end 
--measureTemperature()

print("main.lua")

app = require("app")
config = require("config")
hotspot = require("hotspot")
network = require("network")
curry = require("util").curry

if config.DEVMODE == false then
    hotspot.init()
else 
    network.connect(config.SSID, app.start, app.on_error)
end

