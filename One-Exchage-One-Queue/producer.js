const amqp = require('amqplib');

async function SendMail(){
    try{
        //1.create a connection
        const connection = await amqp.connect('amqp://localhost:5672');

        //2.create a name channel
        const channel = await connection.createChannel();

        //3.creates names of channels and queues
        const queue = 'sendMail';
        const exchange = 'sendMailExchange';
        const routingKey = 'sendMailRoutingKey';

        //4.create message
        const message = {
            to: 'test@test.com',
            subject: 'Test Mail',
            text: 'This is a test mail'
        };

        //5.create exchange
        await channel.assertExchange(exchange, 'direct', { durable: true });

        //6.create a queue
        await channel.assertQueue(queue, { durable: true });

        //7.bind queue to exchange
        await channel.bindQueue(queue, exchange, routingKey);

        //8.publish message to exchange
        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { 
            persistent: true 
        });

        console.log('Mail sent successfully');

        //9.close the connection
        await channel.close();
        await connection.close();

    }catch(err){
        console.log(err);
    }
}

SendMail();