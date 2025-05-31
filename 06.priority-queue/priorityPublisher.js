// Priority Publisher Example

const amqp = require('amqplib');

async function publishMessages() {
    const queue = 'priority_queue';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare queue with max priority
    await channel.assertQueue(queue, { durable: true, maxPriority: 10 });

    // Send messages with different priorities
    channel.sendToQueue(queue, Buffer.from('Low priority message'), { priority: 1 });
    channel.sendToQueue(queue, Buffer.from('Medium priority message'), { priority: 5 });
    channel.sendToQueue(queue, Buffer.from('High priority message'), { priority: 10 });

    console.log('Messages sent with different priorities');
    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
}

publishMessages().catch(console.error);