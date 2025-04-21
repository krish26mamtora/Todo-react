import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import StatsBar from './components/StatsBar';
import BulkActions from './components/BulkActions';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('createdAt');

  // API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (text, dueDate) => {
    if (!text.trim()) return;
    try {
      const response = await axios.post(API_URL, { text, dueDate });
      setTodos([response.data, ...todos]);
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
    }
  };

  // Edit a todo
  const editTodo = async (id, newText, newDueDate) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { text: newText, dueDate: newDueDate });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (err) {
      setError('Failed to edit todo. Please try again.');
      console.error('Error editing todo:', err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  // Bulk: Complete all
  const completeAll = async () => {
    try {
      const ids = filteredTodos.filter(t => !t.completed).map(t => t._id);
      await Promise.all(ids.map(id => axios.put(`${API_URL}/${id}`)));
      fetchTodos();
    } catch (err) {
      setError('Failed to complete all.');
    }
  };

  // Bulk: Delete completed
  const deleteCompleted = async () => {
    try {
      const ids = filteredTodos.filter(t => t.completed).map(t => t._id);
      await Promise.all(ids.map(id => axios.delete(`${API_URL}/${id}`)));
      fetchTodos();
    } catch (err) {
      setError('Failed to delete completed.');
    }
  };

  // Filtering
  let filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'active' && !todo.completed) || (filter === 'completed' && todo.completed) || (filter === 'overdue' && todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date()))
  );
  // Sorting
  filteredTodos = filteredTodos.sort((a, b) => {
    if (sort === 'az') return a.text.localeCompare(b.text);
    if (sort === 'completed') return (a.completed === b.completed) ? 0 : a.completed ? 1 : -1;
    if (sort === 'dueDate') return (a.dueDate || '').localeCompare(b.dueDate || '');
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first
  });

  // Stats
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <StatsBar total={total} completed={completed} active={active} />
      <TodoFilters filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <TodoForm onAdd={addTodo} />
      <BulkActions onCompleteAll={completeAll} onDeleteCompleted={deleteCompleted} />
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      )}
    </div>
  );

}

export default App
