import React from 'react';

const BulkActions = ({ onCompleteAll, onDeleteCompleted }) => (
  <div className="bulk-actions">
    <button onClick={onCompleteAll} className="bulk-complete">Mark All Completed</button>
    <button onClick={onDeleteCompleted} className="bulk-delete">Delete Completed</button>
  </div>
);

export default BulkActions;
