import React from 'react';

export default function TaskList({ tasks, onComplete }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.text}{' '}
          <button onClick={() => onComplete(index)}>Complete</button>
        </li>
      ))}
    </ul>
  );
};
