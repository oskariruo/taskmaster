import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material'
import Yesterday from "./pages/Yesterday";
import Today from "./pages/Today";
import Tomorrow from "./pages/Tomorrow";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    },
  });

  const addTask = (task) => {
    setTasks([...tasks, { text: task, status: "today" }]);
  };

  const moveTasksBasedOnDay = () => {
    const updateTasks = tasks.map((task) => {
      switch (task.status) {
        case "today":
          return { ...task, status: "yesterday" };
        case "tomorrow":
          return { ...task, status: "today" };
        default:
          return task;
      }
    });
    setTasks(updateTasks);
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
      path:"/",
      element: <Today tasks={tasks} /> 
      },
      {
      path:"/yesterday",
      element: <Yesterday tasks={tasks} /> 
      },
      { 
        path:"/today",
        element: <Today tasks={tasks} /> 
        },
      { 
        path:"/tomorrow",
        element: <Tomorrow tasks={tasks} /> 
        },
]);

  return (
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <RouterProvider router={router} />
  <Button onClick={toggleTheme}>Teema </Button>
  </ThemeProvider>
  </React.StrictMode>
  ) 
}
