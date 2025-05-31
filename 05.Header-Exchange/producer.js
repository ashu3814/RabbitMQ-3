const amqp = require('amqplib');
const { RABBITMQ_URL, EXCHANGE_NAME, EXCHANGE_TYPE } = require('./config');

const messages = [
  {
    msg: { text: 'PDF Report' },
    headers: { 'x-match': 'all', format: 'pdf', type: 'report' }
  },
  {
    msg: { text: 'PDF Invoice' },
    headers: { 'x-match': 'any', format: 'pdf', type: 'invoice' }
  },
  {
    msg: { text: 'Image Report' },
    headers: { 'x-match': 'all', format: 'jpg', type: 'report' }
  },
  {
    msg: { text: 'Text Invoice' },
    headers: { 'x-match': 'any', format: 'txt', type: 'invoice' }
  }
];

async function publishMessages() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const ch = await conn.createChannel();

  await ch.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: false });

  for (const { msg, headers } of messages) {
    ch.publish(EXCHANGE_NAME, '', Buffer.from(JSON.stringify(msg)), { headers });
    console.log('Sent:', msg, 'Headers:', headers);
  }

  setTimeout(() => {
    ch.close();
    conn.close();
  }, 500);
}

publishMessages().catch(console.error);