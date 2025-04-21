import React, { useState } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo._id, editText, editDueDate);
    setIsEditing(false);
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        <div className="todo-edit-fields">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="todo-input"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="todo-date-input"
          />
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      ) : (
        <div className="todo-content" onClick={() => onToggle(todo._id)}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
            className="todo-checkbox"
          />
          <span className="todo-text">{todo.text}</span>
          {todo.dueDate && (
            <span className="todo-due-date">Due: {todo.dueDate}</span>
          )}
        </div>
      )}
      <div className="todo-actions">
        {!isEditing && <button onClick={handleEdit} className="edit-button">Edit</button>}
        <button onClick={() => onDelete(todo._id)} className="delete-button">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
