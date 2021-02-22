import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export default class ShowUsers extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            name: '',
            username: ''
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
    
    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            username: this.state.username
        }

        console.log(user)

        axios.post(`http://localhost:5000/users/add`, user)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              })
        
        this.setState({
            name: '',
            username: ''
        })
    }



     

    render(){
        return (
            <div>
                Add User
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
                <input type="submit" value="Create User"/>
                </form>
           
            </div>    
        )
        }
}