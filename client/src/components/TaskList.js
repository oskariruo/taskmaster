import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} />
      ))}
    </ul>
  );
};
