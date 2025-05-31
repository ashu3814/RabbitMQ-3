const amqp = require('amqplib');
const { RABBITMQ_URL, EXCHANGE_NAME, EXCHANGE_TYPE } = require('./config');
const handleMessage = require('./messageHandler');

// Define multiple header binding patterns
const headerBindings = [
  { 'x-match': 'all', format: 'pdf', type: 'report' },    // Only PDF reports
  { 'x-match': 'any', format: 'jpg', type: 'invoice' },   // Any JPG or invoice
  { 'x-match': 'all', format: 'txt', type: 'invoice' }    // Only TXT invoices
];

async function startConsumer() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false });

  const q = await ch.assertQueue('', { exclusive: true });

  // Bind the queue with each header pattern
  for (const headers of headerBindings) {
    await ch.bindQueue(q.queue, EXCHANGE_NAME, '', headers);
    console.log('Bound queue with headers:', headers);
  }

  console.log('Waiting for messages matching any of the above header patterns...');

  ch.consume(q.queue, (msg) => {
    if (msg !== null) {
      handleMessage(msg);
      ch.ack(msg);
    }
  });
}

startConsumer().catch(console.error);