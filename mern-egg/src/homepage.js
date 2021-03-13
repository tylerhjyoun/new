
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";


import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import ShowUsers from "./components/showusers.component"

import ShowGroups from "./components/showgroups.component"
import CreateGroup from "./components/creategroup.component"
import MyEvents from "./components/myevents.component"
import CreateEvent from "./components/createevent.component"
import AddFollowing from "./components/addfollowing.component"
import ShowFollowing from "./components/showfollowing.component"
import ShowUser from "./components/showuser.component"
import EditUser from "./components/edituser.component"
import ShowGroup from "./components/showgroup.component"

export const homepage = () => {
   return (
      <div className="container">
            <Navbar />
            <br />
            <Route path="/home" exact component={Home} />
            <Route path="/home/users" exact component={ShowUsers} />
            <Route path="/home/groups" exact component={ShowGroups} />
            <Route path="/home/groups/:id" component={ShowGroup} />
            <Route path="/home/group" exact component={CreateGroup} />
            <Route path="/home/events" exact component={MyEvents} />
            <Route path="/home/event" exact component={CreateEvent} />
            <Route path="/home/user/friends/addFollowing" exact component={AddFollowing} />
            <Route path="/home/user/friends/showfollowing" exact component={ShowFollowing} />
            <Route path="/home/users/:id" component={ShowUser} />
            <Route path="/home/user/edit" component={EditUser} />
      </div>
   );
}

