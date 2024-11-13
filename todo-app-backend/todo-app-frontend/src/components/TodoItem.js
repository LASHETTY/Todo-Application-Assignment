// src/components/TodoItem.js
import React from 'react';
import { updateTodoStatus, deleteTodo } from '../utils/api';

const TodoItem = ({ todo, setTodos }) => {
  const handleStatusChange = async (e) => {
    const updatedTodo = await updateTodoStatus(todo.id, e.target.value);
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updatedTodo : t)));
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  return (
    <li>
      <span>{todo.task}</span>
      <select value={todo.status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
