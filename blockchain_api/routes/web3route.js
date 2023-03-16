const express = require('express');
const router = express.Router();

let mqChannel, mqConnection;

async() => {
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


module.exports = router; 