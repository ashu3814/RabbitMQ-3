const amqp = require('amqplib');

async function createMailProducer(){
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

        // Bind the queues to the exchange with different routing keys
        await channel.bindQueue(queueName1, exchangeName, 'email1');
        await channel.bindQueue(queueName2, exchangeName, 'email2');

        // Send a message to each queue via the exchange with different routing keys
        const message1 = { text: 'Hello, this is a message for Queue 1!' };
        const message2 = { text: 'Hello, this is a message for Queue 2!' };

        channel.publish(exchangeName, 'email1', Buffer.from(JSON.stringify(message1)));
        channel.publish(exchangeName, 'email2', Buffer.from(JSON.stringify(message2)));

        console.log("Message sent to Queue 1:", message1);
        console.log("Message sent to Queue 2:", message2);

        // Close the channel and connection after a short delay
        setTimeout(() => {
            channel.close();
            connection.close();
            console.log("Channel and connection closed.");
        }, 500);

    } catch (error) {
        console.error("Error creating mail producer:", error);
    }
}

createMailProducer();