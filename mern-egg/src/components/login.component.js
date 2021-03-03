import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: '',
        }    
    }
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    } 

    onSubmit(e) {
        e.preventDefault();
        
    }

    render(){
        return (
            <div className = "submitForm">
                <div class = "title">
                    EGGTIMER
                </div>
                <div class = "desc">
                    Welcome to Eggtimer!
                </div>
                <form onSubmit={this.onSubmit}>
                <input type="text"
                    placeholder="Username..."
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <input type="password"
                    placeholder="Password..."
                    required
                />
                <input type="submit" value="LOGIN"/>
                </form>
                <Link to="/user" className="nav-link"> Don't have an account? </Link>
           
            </div>    

        )
    }
}