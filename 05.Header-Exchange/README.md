# RabbitMQ Headers Exchange Example

This example demonstrates how to use a **Headers Exchange** in RabbitMQ with Node.js, including handling multiple header patterns and message cases.

## What is a Headers Exchange?

A Headers Exchange routes messages based on message header values instead of routing keys. You can specify one or more headers, and the exchange will deliver messages to queues whose binding headers match the message headers.

- Use the `x-match` property:
  - `all`: All headers must match.
  - `any`: At least one header must match.

## Files

- `config.js`: RabbitMQ connection and exchange configuration.
- `producer.js`: Publishes multiple messages, each with different headers.
- `consumer.js`: Binds a queue with multiple header patterns and consumes messages matching any of them.
- `messageHandler.js`: Handles and logs received messages.

## How it works

1. **Producer** sends multiple messages, each with different headers, for example:
   - `{ format: 'pdf', type: 'report', 'x-match': 'all' }`
   - `{ format: 'pdf', type: 'invoice', 'x-match': 'any' }`
   - `{ format: 'jpg', type: 'report', 'x-match': 'all' }`
   - `{ format: 'txt', type: 'invoice', 'x-match': 'any' }`
2. **Consumer** binds a queue to the exchange with multiple header patterns:
   - Only PDF reports (`all` match)
   - Any JPG or invoice (`any` match)
   - Only TXT invoices (`all` match)
3. The consumer receives messages if their headers match any of the binding patterns.

## Usage

1. Start RabbitMQ server locally.
2. Install dependencies:
   ```
   npm install amqplib
   ```
3. Run the consumer:
   ```
   node consumer.js
   ```
4. In another terminal, run the producer:
   ```
   node producer.js
   ```

You should see the consumer receive messages whose headers match any of the specified patterns.

## Reference

- [RabbitMQ Headers Exchange Documentation](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchange-headers)