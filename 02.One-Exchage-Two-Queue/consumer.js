const amqp = require('amqplib');

async function conserveMail() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchangeName = 'mailExchange';
        const queueName1 = 'mailQueue1';
        const queueName2 = 'mailQueue2';

        // Declare the exchange
        await channel.assertExchange(exchangeName, 'direct', { durable: true });

        // Declare the queues
        await channel.assertQueue(queueName1, { durable: true });
        await channel.assertQueue(queueName2, { durable: true });

        // Bind the queues to the exchange
        await channel.bindQueue(queueName1, exchangeName, 'email');
        await channel.bindQueue(queueName2, exchangeName, 'email');

        // Consume messages from the first queue
        channel.consume(queueName1, (msg) => {
            if (msg !== null) {
                console.log("Received from queue 1:", msg.content.toString());
                channel.ack(msg);
            }
        });

        // Consume messages from the second queue
        channel.consume(queueName2, (msg) => {
            if (msg !== null) {
                console.log("Received from queue 2:", msg.content.toString());
                channel.ack(msg);
            }
        });

        // Keep the process running to listen for messages
        console.log("Waiting for messages in queues...");

    } catch (error) {
        console.error("Error consuming mail:", error);
    }
}

conserveMail();