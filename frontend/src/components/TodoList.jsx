import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => (
  <ul className="todo-list">
    {todos.length === 0 ? (
      <li className="empty-message">No todos yet. Add one above!</li>
    ) : (
      todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))
    )}
  </ul>
);

export default TodoList;
