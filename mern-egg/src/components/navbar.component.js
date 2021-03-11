import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';
import auth from "./auth"
import axios from 'axios'
import Timer from "./timer.component";
import { withRouter } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-custom navbar-expand-lg fixed-top">
                <div class="container-fluid">
                    <img className = "egg" src="http://pixelartmaker.com/art/4b4b065c35b8482.png"
                    alt = "Egg" width="20" height="30"
                    ></img>
                    <Link to="/home" className="navbar-brand">Egg Timer</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/home/users" className="nav-link"> "Users"</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/groups" className="nav-link"> Groups </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/events" className="nav-link"> Events </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/user/friends/addfollowing" className="nav-link"> Users </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/home/user/friends/showfollowing" className="nav-link"> Friends </Link>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <button className = "logout" onClick={() => {
                                auth.logout(() => {
                                console.log(this.props.history)
                                this.props.history.push("/")
                                })
                            }}> Logout </button>
                            <img className = "icon" src = "https://image.flaticon.com/icons/png/512/147/147144.png"
                                alt = "Icon" width="50" height="50"
                            ></img>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar)