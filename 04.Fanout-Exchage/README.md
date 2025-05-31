# RabbitMQ Fanout Exchange Example

This example demonstrates the use of a **Fanout Exchange** in RabbitMQ, which is used to broadcast messages to all queues that are bound to the exchange, regardless of routing key.

## Files

- `producer.js` – Publishes a broadcast message to the `logs` fanout exchange.
- `consumer1.js` – Receives all messages from the `logs` exchange and prints them (see code in this file).
- `consumer2.js` – Also receives all messages from the `logs` exchange and prints them.

## What is a Fanout Exchange?

A **Fanout Exchange** routes messages to all queues bound to it. It ignores the routing key, so every consumer connected to a queue bound to this exchange will receive every message. This is useful for scenarios where you want to broadcast the same message to multiple consumers.

### Why use a Fanout Exchange?

- **Broadcasting:** When you need to send the same message to multiple consumers (e.g., notifications, logs, pub/sub systems).
- **Decoupling:** Producers do not need to know about the consumers or queues; they just send messages to the exchange.

### Common Use Cases

- **Logging:** Send log messages to multiple log processing services.
- **Notifications:** Broadcast system-wide notifications to all connected clients.
- **Data Replication:** Distribute data updates to multiple services or caches.

## How to Run

1. **Start the consumers in separate terminals:**

   ```sh
   node consumer1.js
   node consumer2.js
   ```

2. **Run the producer to send a broadcast message:**

   ```sh
   node producer.js
   ```

## Expected Output

Both `consumer1.js` and `consumer2.js` will print the broadcast message, showing that all queues bound to the fanout exchange receive every message sent.
