const amqp = require('amqplib');

async function consumePaymentMessages() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'topic_logs';
    const queueName = 'payment_queue';

    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    const q = await channel.assertQueue(queueName, { exclusive: false });

    // Bind to all payment-related messages
    await channel.bindQueue(q.queue, exchangeName, 'payment.*');

    console.log(" [*] Waiting for payment messages. To exit press CTRL+C");

    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        console.log(` [x] Received (payment): '${msg.fields.routingKey}':'${msg.content.toString()}'`);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error in payment.consumer:', error);
  }
}

consumePaymentMessages();