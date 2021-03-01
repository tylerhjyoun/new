import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

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
            <div>
                Welcome to Eggtimer!
                <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <input  type="text"
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <input type="submit" value="Login"/>
                </form>
           
            </div>    
        )
    }
}