import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { Grid, Container, ThemeProvider, createTheme, CssBaseline, Button } from "@mui/material";
import Login from "./pages/Login";
import Register from './pages/Register';
import Yesterday from "./pages/Yesterday";
import Today from "./pages/Today";
import Tomorrow from "./pages/Tomorrow";
import Nav from "./components/Nav";
import ConfirmationDialog from "./components/ConfirmationDialog";
import PrivateRoute from './components/PrivateRoute';
import useAuth from './auth/auth';

// Main App Component
export default function App() {

  // Authentication and state management
  const { authenticated, checkAuthentication } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Theme handling
  const toggleTheme = () => {
    console.log('Toggle Theme button clicked');
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Task management functions
  //Adding a task
  const addTask = async (task, location) => {
    const currentDate = new Date();
    let taskDate;

    if (location === "tomorrow") {
      taskDate = new Date(currentDate);
      taskDate.setDate(currentDate.getDate() + 1);
    } else if (location === "yesterday") {
      taskDate = new Date(currentDate);
      taskDate.setDate(currentDate.getDate() - 1);
    } else {
      taskDate = new Date(
        Date.UTC(
          currentDate.getUTCFullYear(),
          currentDate.getUTCMonth(),
          currentDate.getUTCDate()
        )
      );
    }
    try {
      const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: task, date: taskDate }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add task: ${response.statusText}`);
      }
  
      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error(error);
    }
  };

  //Deleting a task
  const deleteTask = async (taskId) => {
    setSelectedTaskId(taskId);
    setConfirmationDialogOpen(true);
  };

  //Closing dialog
  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setSelectedTaskId(null);
  };

  //Confirming deletion of an item
  const confirmDeletion = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${selectedTaskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      closeConfirmationDialog();
    }
  };

  //Checkbox input handling
  const handleCheckboxChange = async (taskId, checked) => {
    try {
      // this is an optimistic update: Update state before waiting for the server response
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: checked } : task
        )
      );
  
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ completed: checked }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);

      fetchTasks();
    }
  };
  
  //Fetching ALL tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks`);
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  //Logic for sorting dates
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  //Function to getting yesterdays date
  const getYesterdayDate = () => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    return yesterday;
  };

  //Function for getting tomorrows date
  const getTomorrowDate = () => {
    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    return tomorrow;
  };

  //Filtering tasks to get date specific tasks
  const filterTasksByDate = (date) => {
    return tasks.filter((task) => isSameDay(task.date, date));
  };

  const todayTasks = filterTasksByDate(new Date());
  const yesterdayTasks = filterTasksByDate(getYesterdayDate());
  const tomorrowTasks = filterTasksByDate(getTomorrowDate());

  //Routing
  const router = createBrowserRouter([
  { path: '/', element: <Nav toggleTheme={toggleTheme} /> },
  {
    path: "/login",
    element: <Login onLogin={checkAuthentication} isAuthenticated={authenticated} />,
  },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/yesterday",
      element: <PrivateRoute element={<Yesterday tasks={yesterdayTasks} addTask={(task) => addTask(task, 'yesterday')} deleteTask={deleteTask} handleCheckboxChange={handleCheckboxChange} />} />, },
      {
      path: "/today",
      element: <PrivateRoute element={<Today tasks={todayTasks} addTask={(task) => addTask(task)} deleteTask={deleteTask} handleCheckboxChange={handleCheckboxChange} />} />,
      },
      {
      path: "/tomorrow",
      element: <PrivateRoute element={<Tomorrow tasks={tomorrowTasks} addTask={(task) => addTask(task, 'tomorrow')} deleteTask={deleteTask} handleCheckboxChange={handleCheckboxChange} />} />,
      },      
  ]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchTasks();
    }
  }, [authenticated]);



  return (
    <React.StrictMode>
      <RouterProvider router={router}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            {/* Rest of your components */}
          </Grid>
          <ConfirmationDialog
            open={confirmationDialogOpen}
            onClose={closeConfirmationDialog}
            onConfirm={confirmDeletion}
          />
        </Container>
      </ThemeProvider>
    </RouterProvider>
    </React.StrictMode>
  );
}
