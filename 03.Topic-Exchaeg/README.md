# RabbitMQ Topic Exchange Example

This example demonstrates how to use a **Topic Exchange** in RabbitMQ with one producer and two consumers.

## Files

- `producer.js` – Sends two messages: one for order creation and one for payment completion, each with a different topic routing key.
- `order.consumer.js` – Listens for messages with routing keys matching `order.*`.
- `payment.consumer.js` – Listens for messages with routing keys matching `payment.*`.

## How to Run

1. **Start the consumers in separate terminals:**

   ```sh
   node order.consumer.js
   node payment.consumer.js
   ```

2. **Run the producer to send messages:**

   ```sh
   node producer.js
   ```

## Expected Output

- `order.consumer.js` will print messages related to orders (e.g., `order.created`).
- `payment.consumer.js` will print messages related to payments (e.g., `payment.completed`).

Each consumer receives only the messages relevant to its binding key, demonstrating the power of topic-based routing.