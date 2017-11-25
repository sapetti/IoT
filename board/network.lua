local module = {}

local WIFI_PROCESS = 1
local WIFI_PERIOD = 2500

function wait_ip(cb)
    return function ()
              if wifi.sta.getip() == nil then
                print("IP unavailable, Waiting...")
              else
                tmr.stop(WIFI_PROCESS)
                print("\n====================================")
                print("NodeMCU mode is: " .. wifi.getmode())
                print("MAC address is: " .. wifi.ap.getmac())
                print("IP is " .. wifi.sta.getip())
                print("====================================")
                -- after connection, initialize board main application
                cb()
              end
            end
end

local function start_wifi(networks, on_success, on_error, list_aps)  
    -- loop all access points
    if list_aps then
        for key,value in pairs(list_aps) do
            -- connect to the wifi if the credentials are in the config
            if networks and networks[key] then
                wifi.setmode(wifi.STATION)
                wifi.sta.config({ssid=key, pwd=networks[key]})
                wifi.sta.connect()
                print("Connecting to " .. key .. " ...")
                -- setup the alarm so we can control whenever the wifi is connected
                tmr.alarm(WIFI_PROCESS, WIFI_PERIOD, tmr.ALARM_AUTO, wait_ip(on_success) )
            end
        end
    else
        print("Error getting AP list")
        on_error()
    end
end

function module.connect(networks, on_success, on_error)
  print("Configuring Wifi ...")
  connect_to_wifi = curry(start_wifi, 4)
  wifi.setmode(wifi.STATION)
  wifi.sta.getap(connect_to_wifi (networks) (on_success) (on_error) )
end

return module