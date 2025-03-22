// metrics/metrics.js
const client = require('prom-client');

// Create a new Registry
const register = new client.Registry();

// Collect default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Create a custom counter to track HTTP requests
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route']
});
register.registerMetric(httpRequestsTotal);

// Create a custom counter for todos created
const todosCreatedTotal = new client.Counter({
  name: 'todos_created_total',
  help: 'Total number of todos created'
});
register.registerMetric(todosCreatedTotal);

// Create a histogram to measure todo creation duration in seconds
const todoCreationDuration = new client.Histogram({
  name: 'todo_creation_duration_seconds',
  help: 'Time taken to create a todo in seconds',
  buckets: [0.1, 0.5, 1, 2, 5] // Customize buckets as needed
});
register.registerMetric(todoCreationDuration);

// Middleware to count each incoming HTTP request
const metricsMiddleware = (req, res, next) => {
  httpRequestsTotal.inc({ method: req.method, route: req.path });
  next();
};

module.exports = {
  register,
  metricsMiddleware,
  todosCreatedTotal,
  todoCreationDuration
};
