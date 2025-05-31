# RabbitMQ-3

This project demonstrates a simple RabbitMQ setup with one exchange and one queue using Node.js and the `amqplib` library.

## Flowchart: One Exchange, One Queue

```mermaid
flowchart LR
    Producer --|Publishes Message|> Exchange
    Exchange --|Routes Message|> Queue
    Queue --|Delivers Message|> Consumer
```

## Files

- `producer.js`: Sends a test mail message to the queue via the exchange.
- `consumer.js`: Listens for messages from the queue and processes them.

## How It Works

1. The producer connects to RabbitMQ, creates an exchange and a queue, binds them, and publishes a message.
2. The consumer connects to RabbitMQ, creates the same exchange and queue, binds them, and waits for messages to process.

## Usage

1. **Start RabbitMQ** on your local machine (default URL: `amqp://localhost:5672`).
2. **Install dependencies** (if not already):
   ```sh
   npm install amqplib
   ```
3. **Run the consumer** (in one terminal):
   ```sh
   node consumer.js
   ```
4. **Run the producer** (in another terminal):
   ```sh
   node producer.js
   ```

You should see the consumer receive and log the message sent by the producer.

## Message Example

```json
{
  "to": "test@test.com",
  "subject": "Test Mail",
  "text": "This is a test mail"
}
```

