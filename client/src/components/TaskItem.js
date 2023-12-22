import React from "react";
import { ListItem, ListItemText, Button, Checkbox } from "@mui/material";

export default function TaskItem({ task, onDelete, onCheckToggle }) {

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleCheckToggle = () => {
    onCheckToggle(task._id, !task.completed)
  }

  return (
    <ListItem>
        <Checkbox 
          checked={task.completed} 
          onChange={handleCheckToggle}
        />
        <ListItemText>
          {task.text}
        </ListItemText>
      <Button onClick={handleDelete}>Delete</Button>
    </ListItem>
  );
}