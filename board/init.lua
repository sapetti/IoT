local IDLE_AT_STARTUP_MS = 10000

print("File init.lua loaded")

--tmr.ALARM_SINGLE
tmr.alarm(1, IDLE_AT_STARTUP_MS, 0, function()
    print("End idle time, starting setup...")
    dofile("main.lua")
end)
