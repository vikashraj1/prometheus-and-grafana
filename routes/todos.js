// routes/todos.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Import custom metrics
const { todosCreatedTotal, todoCreationDuration } = require('../metrics/metrics');

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new todo with custom instrumentation
router.post("/", async (req, res) => {
  const start = Date.now();
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    // Increment the custom counter for todos created
    todosCreatedTotal.inc();
    
    // Record the duration of the todo creation
    const durationInSeconds = (Date.now() - start) / 1000;
    todoCreationDuration.observe(durationInSeconds);
    
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.description != null) {
      todo.description = req.body.description;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
