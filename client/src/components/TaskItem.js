import React from "react";

export default function ListItem({ task, onComplete }) {
    return (
        <li>
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
            {task.text}
        </span>{' '}
        {!task.completed && (
            <button onClick={() => onComplete(task.id)}>Complete</button>
        )}
        </li>
    )
}