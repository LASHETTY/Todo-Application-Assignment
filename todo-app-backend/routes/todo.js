const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
};

// CRUD Routes for Todos

// Create Todo
router.post('/', verifyToken, async (req, res) => {
  const { task } = req.body;
  const todo = new Todo({
    task,
    userId: req.userId,
  });
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all Todos for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Todo
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.status = req.body.status || todo.status;
    todo.task = req.body.task || todo.task;

    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Todo
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
