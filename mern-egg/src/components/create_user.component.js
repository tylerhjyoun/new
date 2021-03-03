import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../CreateUser.css';

export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: '',
            username: '',
            password: ''
        }    
    }
   
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    } 
    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password
        }

        console.log(user)

        axios.post(`http://localhost:5000/users/add`, user)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              })
        
        this.setState({
            name: '',
            username: '',
            password: ''
        })
        window.location = '/';

    }
    render(){
        return (
            <div className = "createUser">
                <div class = "signUp">
                    Sign Up
                </div>
                <form onSubmit={this.onSubmit}>
                <input type="text"
                    placeholder="Name..."
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                />
                <input type="text"
                    placeholder="Username..."
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <input type="password"
                    placeholder="Password..."
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
                <input type="password"
                    placeholder="Re-enter Password..."
                    required
                />
                <input type="submit" value="Create User"/>
                </form>
            </div>    
        )
    }
}