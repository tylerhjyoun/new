import React, { Component, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios'
import '../Login.css';
import auth from './auth'

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onChangeUsername(e) {
        setUsername(e.target.value)
        console.log(username)
    }
    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5000/login/`, data)
            .then(res => {
                if (res.data.user.username == username) {
                    console.log("Logged In!")
                    auth.login(() => props.history.push("/home"))
                }
                else {
                    console.log("User not found")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className = "submitForm">
            <div class = "title">
                EGGTIMER
            </div>
            <div class = "desc">
                Welcome to Eggtimer!
            </div>
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Username..."
                    required
                    value={username}
                    onChange={onChangeUsername}
                />
                <input type="password"
                    placeholder="Password..."
                    required
                    value={password}
                    onChange={onChangePassword}
                />
                <input type="submit" value="LOGIN"/>
            </form>
            <Link to="/user" className="nav-link"> Don't have an account? </Link>
        </div>
    )
}

export default withRouter(Login)
