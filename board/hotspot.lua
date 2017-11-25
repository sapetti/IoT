module = {}

function module.init()
    wifi.setmode(wifi.STATIONAP)
    wifi.ap.config({ssid=config.NAME, auth=wifi.OPEN})
    enduser_setup.manual(true)
    enduser_setup.start(
      function()
        print("Connected to wifi as:" .. wifi.sta.getip())
        enduser_setup.stop()
      end,
      function(err, str)
        print("enduser_setup: Err #" .. err .. ": " .. str)
      end
    );
end

return module