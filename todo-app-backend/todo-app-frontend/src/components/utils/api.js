// src/utils/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function signup(data) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function login(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.token) localStorage.setItem('token', result.token);
  return result;
}

export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchTodos() {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    headers: { ...getAuthHeaders() },
  });
  return response.json();
}

export async function createTodo(task) {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ task }),
  });
  return response.json();
}

export async function updateTodoStatus(id, status) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ status }),
  });
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeaders() },
  });
  return response.json();
}
