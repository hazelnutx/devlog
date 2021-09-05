import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./router/PrivateRoute";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/dashboard/project/:id">
            <ProjectPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
