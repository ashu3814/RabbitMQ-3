module.exports = function handleMessage(msg) {
  const content = msg.content.toString();
  const headers = msg.properties.headers;
  console.log('Received message:', content, 'with headers:', headers);
};