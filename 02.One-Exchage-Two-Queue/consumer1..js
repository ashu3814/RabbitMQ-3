const amqp = require('amqplib');

async function consumeMailQueue1() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchangeName = 'mailExchange';
        const queueName = 'mailQueue1';

        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, 'email');

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                console.log("Received from queue 1:", msg.content.toString());
                channel.ack(msg);
            }
        });

        console.log("Waiting for messages in queue 1...");
    } catch (error) {
        console.error("Error consuming mailQueue1:", error);
    }
}

consumeMailQueue1();