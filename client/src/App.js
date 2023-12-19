import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Yesterday from "./pages/Yesterday";
import Today from "./pages/Today";
import Tomorrow from "./pages/Tomorrow";

export default function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { text: task, status: 'today'}]);
  };

  const moveTasksBasedOnDay = () => {
    const updateTasks = tasks.map(task => {
      switch (task.status) {
        case 'today':
          return {...task, status: 'yesterday'};
        case 'tomorrow':
          return {...task, status: 'today'};
          default:
            return task;
      }
    });
    setTasks(updateTasks)
  };

  useEffect(() => {
    moveTasksBasedOnDay();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/yesterday">
          <Yesterday tasks={tasks} />
        </Route>
        <Route path="/today">
          <Today tasks={tasks} />
        </Route>
        <Route path="/tomorrow">
          <Tomorrow tasks={tasks} />
        </Route>
      </Switch>
      </Router>
  );
}

