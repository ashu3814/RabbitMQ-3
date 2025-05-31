// Priority Consumer Example

const amqp = require('amqplib');

async function consumeMessages() {
    const queue = 'priority_queue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true, maxPriority: 10 });

    console.log('Waiting for messages in priority order...');
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            console.log('Received:', msg.content.toString());
            channel.ack(msg);
        }
    });
}

consumeMessages().catch(console.error);