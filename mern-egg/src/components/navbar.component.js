import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/home" className="navbar-brand"> Egg Timer</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/home/users" className="nav-link"> Show Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/home/group" className="nav-link"> Create group </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/home/groups" className="nav-link"> Show Groups </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/home/events" className="nav-link"> My Events </Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        );
    }
}