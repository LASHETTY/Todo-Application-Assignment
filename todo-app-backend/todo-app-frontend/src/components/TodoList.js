// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo } from '../utils/api';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    async function loadTodos() {
      const data = await fetchTodos();
      setTodos(data);
    }
    loadTodos();
  }, []);

  const handleAddTask = async () => {
    if (newTask) {
      const todo = await createTodo(newTask);
      setTodos([...todos, todo]);
      setNewTask('');
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
