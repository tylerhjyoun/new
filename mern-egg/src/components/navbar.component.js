import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand"> Egg Timer</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/users" className="nav-link"> Show Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link"> Add new user </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/group" className="nav-link"> Create group </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/groups" className="nav-link"> Show Groups </Link>
                        </li>
                    </ul>
                    </div>
            </nav>
        );
    }
}