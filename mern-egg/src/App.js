import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {homepage} from "./homepage.js"
import Login from "./components/login.component"
import CreateUser from "./components/create_user.component"


function App() {
  return (
  <Router>
      <Switch>

        <Route path="/home" component={homepage}/>
        <Route path="/" component={Login}/>

      </Switch>

      <Route path="/user" exact component={CreateUser} />

  </Router>  
  );
}

export default App;
