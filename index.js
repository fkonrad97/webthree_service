const winston = require('winston');
const express = require('express');
const app = express();
const amqp = require("amqplib");
const config = require('config');

require('./blockchain_api/startup/logging')();
require('./blockchain_api/startup/routes')(app);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

let mqChannel, mqConnection;

const connectionMq = async() => {
    try {
      mqConnection = await amqp.connect(config.get('mqRabbit'));
      mqChannel = await mqConnection.createChannel();
    
      await mqChannel.assertQueue("test-queue");
      console.log(`Connecting to RabbitMq has been successful...`);
    
      mqChannel.consume("test-queue", data => {
        console.log(`${Buffer.from(data.content)}`);
        mqChannel.ack(data);
      })
    } catch (error) {
      console.log(`Error at connecting to RabbitMQ server...${error}`);
    }
  }
connectionMq();

module.exports = server;