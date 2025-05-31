const amqp = require('amqplib');

async function producer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'logs';
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    const message = 'Broadcast message to all queues!';
    channel.publish(exchangeName, '', Buffer.from(message));
    console.log(` [x] Sent: '${message}'`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

producer();