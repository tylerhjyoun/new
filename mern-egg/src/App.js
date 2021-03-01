import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {homepage} from "./homepage.js"
import Login from "./components/login.component"


function App() {
  return (
  <Router>
      <Switch>

      <Route path="/home" component={homepage}/>
      <Route path="/" component={Login}/>
        </Switch>

  </Router>  
  );
}

export default App;
