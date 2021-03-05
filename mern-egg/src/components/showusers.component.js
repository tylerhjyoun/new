import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from './timer.component'

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.username}</td>
        <td><Timer count={props.user.usertimer}/></td>
    </tr>
);

export default class ShowUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }    
    }
    
    componentDidMount(){
        let user = sessionStorage.getItem('data');
        const token = user
        axios.get(`http://localhost:5000/users`, {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res => {
                console.log(res)
                this.setState({users: res.data});
            })
            .catch((error) => {
                console.log(error);
              })

    }

    userList(){
        return this.state.users.map(currentuser => {
             return <User user={currentuser} key={currentuser._id}/>})
    }

    render() {
        return (
            <div>
               <h2>Logged Users </h2> 
 
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Timer</th>
                </tr>
            </thead>
                <tbody>
                { this.userList() }
                </tbody>
            </table>
            </div>    
        );
    }
}