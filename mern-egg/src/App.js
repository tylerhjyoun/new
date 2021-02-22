import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import ShowUsers from "./components/showusers.component"

import CreateUser from "./components/create_user.component"
import ShowGroups from "./components/showgroups.component"
import CreateGroup from "./components/creategroup.component"

function App() {
  return (
  <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={Home}/> 
      <Route path="/users" exact component={ShowUsers} />
      <Route path="/user" exact component={CreateUser} />
      <Route path="/groups" exact component={ShowGroups} />
      <Route path="/group" exact component={CreateGroup} />
      </div> 
  </Router>  
  );
}

export default App;
