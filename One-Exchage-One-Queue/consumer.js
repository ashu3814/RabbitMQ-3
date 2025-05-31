const amqp = require('amqplib');

async function ReceiveMail(){
    try{
        //1.create a connection
        const connection = await amqp.connect('amqp://localhost:5672');

        //2.create a channel
        const channel = await connection.createChannel();       

        //3.create exchange and queue
        const queue = 'sendMail';
        const exchange = 'sendMailExchange';
        const routingKey = 'sendMailRoutingKey';

        //4.create exchange
        await channel.assertExchange(exchange, 'direct', { durable: true });

        //5.create queue
        await channel.assertQueue(queue, { durable: true });

        //6.bind queue to exchange
        await channel.bindQueue(queue, exchange, routingKey);

        console.log('Waiting for messages...');

        //7.consume messages
        await channel.consume(queue, (message) => {
            if (message) {
                const content = JSON.parse(message.content.toString());
                console.log('Received message:', content);
                
                // Acknowledge the message
                channel.ack(message);
            }
        }); 

        // Note: We don't close the connection here
        // The connection needs to stay open to receive messages
        
    }catch(err){
        console.log(err);
    }
}

ReceiveMail();