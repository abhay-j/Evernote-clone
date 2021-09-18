import "./App.css";
import React from "react";
import NotesPage from "./pages/Notes/Notes";
import TodosPage from "./pages/Todos/Todos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route exact path="/">
            <NotesPage />
          </Route>
          <Route path="/todo">
            <TodosPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
