const amqp = require('amqplib');

async function consume() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'logs';
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(q.queue, exchangeName, '');

    console.log(" [*] Waiting for messages in consumer2. To exit press CTRL+C");

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(` [x] consumer2 received: '${msg.content.toString()}'`);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error in consumer2:', error);
  }
}

consume();