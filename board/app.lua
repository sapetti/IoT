local module = {}
local m = {}

local REGISTER = "register"
local OFFLINE = "offline"
local TEMPERATURE_PIN = 2
local TEMPERATURE = "/temperature"

function module.start()  

  -- Initialize
  m = mqtt.Client(config.ID, 120, config.MQTT_USER, config.MQTT_PASSWORD)

  print "MQTT client created"

  -- Connect to server
  do_mqtt_connect()

end

function module.on_error()
    print("app failed to start")
end

function handle_mqtt_error(client, reason) 
  tmr.create():alarm(10 * 1000, tmr.ALARM_SINGLE, do_mqtt_connect)
end

function do_mqtt_connect()
  print(config.MQTT_URL)
  m:connect(config.MQTT_HOST, config.MQTT_PORT, 
  function(client) 
    print("Connected to MQTT server") 
    
    -- Register node name
    m:publish(REGISTER, config.ID, 0, 0)
    
    -- Subscribe services availables
    m:subscribe(config.ID .. TEMPERATURE, 0)
    
    -- Handle messages
    --m:on("message", function(client, topic, data)  dispatch(topic, data) end)
    m:on("message", dispatch) 
  end, 
  handle_mqtt_error)
end

function measureTemperature()
  local r = gpio.read(TEMPERATURE_PIN)
  local temp = r * 28500 / 1024
  print("Temperature returned: " .. temp)
  m:publish(config.ID .. TEMPERATURE .. "/value", temp, 0, 0)
end 

function dispatch(client, topic, payload)
    local json = nil 
    if payload == nil then 
        print(topic)
        json = {} 
    else
        print(topic .. ":" .. payload) 
        json = cjson.decode(payload) 
    end
    
    if topic == config.ID .. TEMPERATURE then measureTemperature()
    else 
      print("Topic " .. topic .. " not listed")
      m:publish(config.ID .. "/error", "Topic " .. topic .. " not listed", 0, 0)
    end
end
 
return module
