import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../CreateUser.css';
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"

export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this)


        this.state = {
            name: '',
            username: '',
            password: '',
            profilepicture: 1
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onChangeProfilePicture(e) {
        this.setState({
            profilepicture: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            profilepicture: this.state.profilepicture
        }

        console.log(user)

        axios.post(`http://localhost:5000/users/`, user)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
            })

        this.setState({
            name: '',
            username: '',
            password: '',
            profilepicture: 0
        })
        window.location = '/';

    }
    render() {
        return (
            <div className="bg">
                <div className="createUser">
                    <div class="signUp">
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

                        <input className = "login" type="submit" value="Create User" />
                    </form>
                </div>
            </div >

        )
    }
}