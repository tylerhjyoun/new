import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTimer = this.onChangeTimer.bind(this);

        this.state = {
            name: '',
            username: '',
            usertimer: 0
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
    onChangeTimer(e){
        this.setState({
            usertimer: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            username: this.state.username,
            usertimer: this.state.usertimer
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
            usertimer: 0
        })
        window.location = '/';

    }
    render(){
        return (
            <div>
                Create User
                <form onSubmit={this.onSubmit}>
                <label>Name: </label>
                <input  type="text"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                />
                <label>Username: </label>
                <input  type="text"
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label>Timer: </label>
                <input type="number"
                    required
                    value={this.state.usertimer}
                    onChange={this.onChangeTimer}
                />
                <input type="submit" value="Create User"/>
                </form>
           
            </div>    
        )
        }
}