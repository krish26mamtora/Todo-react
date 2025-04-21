import React from 'react';

const TodoFilters = ({ filter, setFilter, search, setSearch, sort, setSort }) => (
  <div className="todo-filters">
    <input
      type="text"
      value={search}
      onChange={e => setSearch(e.target.value)}
      placeholder="Search todos..."
      className="search-input"
    />
    <select value={filter} onChange={e => setFilter(e.target.value)} className="filter-select">
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
      <option value="overdue">Overdue</option>
    </select>
    <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
      <option value="createdAt">Newest</option>
      <option value="az">A-Z</option>
      <option value="completed">Completed</option>
      <option value="dueDate">Due Date</option>
    </select>
  </div>
);

export default TodoFilters;
