import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import Yesterday from "./pages/Yesterday";
import Today from "./pages/Today";
import Tomorrow from "./pages/Tomorrow";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const addTask = (task, status) => {
    const currentDate = new Date();
    let taskDate;
  
    switch (status) {
      case "today":
        taskDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        break;
      case "yesterday":
        taskDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "tomorrow":
        taskDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        taskDate.setHours(0, 0, 0, 0);
        break;
      default:
        taskDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    }
  
    setTasks([...tasks, { id: tasks.length + 1, text: task, status, date: taskDate }]);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const moveTasksBasedOnDay = () => {
    const currentDate = new Date();
    const updateTasks = tasks.map((task) => {
      const taskDate = new Date(task.date);
      const isToday = isSameDay(taskDate, currentDate);
      const isTomorrow = isSameDay(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), taskDate);
  
      switch (task.status) {
        case "today":
          if (!isToday) return { ...task, status: "yesterday" };
          break;
        case "tomorrow":
          if (!isTomorrow) return { ...task, status: "today" };
          break;
        default:
          return task;
      }
      return task;
    });
    setTasks(updateTasks);
  };

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  useEffect(() => {
    if (tasks.length > 0) {
      moveTasksBasedOnDay();
    }
  }, [tasks]);

  useEffect(() => {
    setTasks([]);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Today tasks={tasks.filter((task) => task.status === "today")} addTask={(task) => addTask(task, "today")} completeTask={completeTask} />,
    },
    {
      path: "/yesterday",
      element: <Yesterday tasks={tasks.filter((task) => task.status === "yesterday")} addTask={(task) => addTask(task, "yesterday")} completeTask={completeTask} />,
    },
    {
      path: "/today",
      element: <Today tasks={tasks.filter((task) => task.status === "today")} addTask={(task) => addTask(task, "today")} completeTask={completeTask} />,
    },
    {
      path: "/tomorrow",
      element: <Tomorrow tasks={tasks.filter((task) => task.status === "tomorrow")} addTask={(task) => addTask(task, "tomorrow")} completeTask={completeTask} />,
    },
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <Button onClick={toggleTheme}>Teema </Button>
      </ThemeProvider>
    </React.StrictMode>
  );
}
