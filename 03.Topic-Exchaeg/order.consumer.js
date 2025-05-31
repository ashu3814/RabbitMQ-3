const amqp = require('amqplib');

async function consumeOrderMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'topic_logs';
    const queueName = 'order_queue';

    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    const q = await channel.assertQueue(queueName, { exclusive: false });

    // Bind to all order-related messages
    await channel.bindQueue(q.queue, exchangeName, 'order.*');

    console.log(" [*] Waiting for order messages. To exit press CTRL+C");

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(` [x] Received (order): '${msg.fields.routingKey}':'${msg.content.toString()}'`);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error in order.consumer:', error);
  }
}

consumeOrderMessages();