const amqp = require('amqplib');

async function consumeMailQueue2() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchangeName = 'mailExchange';
        const queueName = 'mailQueue2';

        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, 'email');

        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                console.log("Received from queue 2:", msg.content.toString());
                channel.ack(msg);
            }
        });

        console.log("Waiting for messages in queue 2...");
    } catch (error) {
        console.error("Error consuming mailQueue2:", error);
    }
}

consumeMailQueue2();