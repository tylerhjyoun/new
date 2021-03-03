import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { homepage } from "./homepage.js"
import Login from "./components/login.component"
import CreateUser from "./components/create_user.component"
import { ProtectedRoute } from "./ProtectedRoute"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <ProtectedRoute path="/home" component={homepage}/>
        <Route path="/user" exact component={CreateUser} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>

    </Router>
  );
}

export default App;
