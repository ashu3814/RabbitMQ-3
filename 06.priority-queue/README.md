# RabbitMQ Priority Queue Example

This folder demonstrates how to use RabbitMQ's **priority queue** feature in Node.js.

## Files

- `priorityPublisher.js`  
  Publishes messages with different priorities to the queue.

- `priorityConsumer.js`  
  Consumes messages from the queue, receiving higher-priority messages first.

## How to Run

1. **Start RabbitMQ** on your machine.

2. **Install dependencies** (if not already):
   ```sh
   npm install amqplib
   ```

3. **Run the consumer** (start this first):
   ```sh
   node priority-queue/priorityConsumer.js
   ```

4. **Run the publisher** (in another terminal):
   ```sh
   node priority-queue/priorityPublisher.js
   ```

## What Happens

- The publisher sends three messages with different priorities (1, 5, 10).
- The consumer receives messages in order of priority (highest first).

## Reference

- [RabbitMQ Priority Queues](https://www.rabbitmq.com/priority.html)