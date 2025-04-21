import React from 'react';

const StatsBar = ({ total, completed, active }) => (
  <div className="stats-bar">
    <span>Total: <b>{total}</b></span>
    <span>Completed: <b>{completed}</b></span>
    <span>Active: <b>{active}</b></span>
  </div>
);

export default StatsBar;
