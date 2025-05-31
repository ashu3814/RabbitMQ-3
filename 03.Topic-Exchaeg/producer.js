const amqp = require('amqplib');

async function producer() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchangeName = 'topic_logs';
    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    // Produce an order message with more context
    const orderRoutingKey = 'order.created';
    const orderMessage = JSON.stringify({
      orderId: 1234,
      status: 'created',
      customer: 'John Doe',
      items: [
        { productId: 'A1', quantity: 2 },
        { productId: 'B2', quantity: 1 }
      ],
      createdAt: new Date().toISOString()
    });
    channel.publish(exchangeName, orderRoutingKey, Buffer.from(orderMessage));
    console.log(` [x] Sent '${orderRoutingKey}':'${orderMessage}'`);

    // Produce a payment message with more context
    const paymentRoutingKey = 'payment.completed';
    const paymentMessage = JSON.stringify({
      orderId: 1234,
      paymentId: 'PAY5678',
      amount: 250.00,
      method: 'Credit Card',
      status: 'completed',
      paidAt: new Date().toISOString()
    });
    channel.publish(exchangeName, paymentRoutingKey, Buffer.from(paymentMessage));
    console.log(` [x] Sent '${paymentRoutingKey}':'${paymentMessage}'`);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error in producer:', error);
  }
}

producer();