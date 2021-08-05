'use strict';

var sensor = require("node-dht-sensor");


function MessageProcessor(option) {
    option = Object.assign({
        deviceId: '[Unknown device] node',
        temperatureAlert: 30
    }, option);
    this.deviceId = option.deviceId;
    this.temperatureAlert = option.temperatureAlert
}


MessageProcessor.prototype.getMessage = function (messageId, cb) {
    sensor.read(11, 4, function(err, temperature, humidity) {
        if (!err) {
            console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
        }

        cb(JSON.stringify({
            messageId: messageId,
            deviceId: this.deviceId,
            temperature: temperature,
            humidity: humidity
        }), temperature > this.temperatureAlert);
    });
}

module.exports = MessageProcessor;