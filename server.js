// server.js
const express = require('express');
const mongoose = require('mongoose');
const { register, metricsMiddleware } = require('./metrics/metrics');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Use the Prometheus metrics middleware from metrics/metrics.js
app.use(metricsMiddleware);

// Expose a /metrics endpoint to serve all metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Todo API',
    endpoints: {
      'GET /todos': 'Get all todos',
      'GET /todos/{id}': 'Get a single todo',
      'POST /todos': 'Create a new todo',
      'PUT /todos/{id}': 'Update a todo',
      'DELETE /todos/{id}': 'Delete a todo'
    }
  });
});

// Routes
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
