const amqp = require('amqplib');

async function consume() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'logs';
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    //Routing Key is not used in fanout exchange, so we can use an empty string
    // as the routing key when binding the queue to the exchange.
    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, exchangeName, '');

    console.log(" [*] Waiting for messages in consumer1. To exit press CTRL+C");

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(` [x] consumer1 received: '${msg.content.toString()}'`);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error in consumer1:', error);
  }
}

consume();