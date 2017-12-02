# IoT
This is an small project to connect NodeMCU boards with some services in the cloud allowing interaction through a web application (see details below).

![Arch](https://github.com/sapetti/IoT/blob/master/img/arch.png)

## NodeMCU
In an initial stage it will only do the following tasks:
* Register: Once the board is connected to internet or if the server requests it. This consists in send the board details to the cloud.
* Temperature: Send the temperature any time the server asks for.

__Technologies__
* [Builds](https://nodemcu-build.com/)
* [ESPlorer](https://esp8266.ru/esplorer/)
* [Esptool](https://github.com/espressif/esptool)
* [NodeMCU-falsher (only for Windows)](https://github.com/nodemcu/nodemcu-flasher)
 
## Backend
Will host the UI, interact with board anytime the user request it or following some simple business logic.

__Technologies__
* NodeJS
* Websockets: To live update the frontend
* MQTT: To interact with the boards
* MongoDB: Will store the data so a chart can be displayed in the UI
 
## Frontend
Simple UI to display the status of the boards and its measures. It also allows to interact with board.

__Technologies__
* React
* Highcharts
* Websockets
 
## Cloud services
* [Heroku](https://www.heroku.com/): As the AS.
* [CloudMQTT](https://www.cloudmqtt.com/): As the broker for the communications between the backend and the boards.
* [mLab](https://mlab.com/): To store the details such as the temperature.
 
