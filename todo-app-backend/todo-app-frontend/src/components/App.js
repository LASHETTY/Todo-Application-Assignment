// src/App.js (Frontend in React)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Importing Components
import TodoList from './components/TodoList';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Check if token exists and set it in state
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" render={() => <Profile token={token} />} />
          <Route path="/" exact render={() => <TodoList token={token} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
