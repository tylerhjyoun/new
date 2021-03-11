import React, { Component, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from "./timer.component";
import '../Home.css';
import auth from "./auth"

const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td><Timer endtime={props.event.endtime} /></td>

    </tr>
);

export default class MyEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            id: '',
            user: []
        }
    }
    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(response => {
                        this.setState({
                            user: response.data
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                axios.get(`http://localhost:5000/events/find/` + this.state.id)
                    .then(response => {
                        this.setState({
                            events: response.data,
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    eventList() {
        this.state.events.sort(function (a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate()) / (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate()) / (1000));
            return aval - bval;
        });
        const filtered = this.state.events.filter(e =>
            Math.floor((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) >= 0);
        return filtered.map(currentevent => {
            return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id} />
        })
    }

    render() {
        return (
            <div className="background">
                <h2> Welcome back, {this.state.user.username}!</h2>
                <div class="profile">
                    <img className="avatar" src="https://image.flaticon.com/icons/png/512/147/147144.png"
                        alt="Profile Picture" width="150" height="150"
                    ></img>
                    <div>
                        <h3> My Profile: </h3>
                        <p>
                            Name: {this.state.user.name} <br />
                        Username: {this.state.user.username} <br />
                        Password: ****** <br /><br /><br />
                        </p>
                        <Link to="/home/user/edit" className="edit"> Edit Profile </Link>
                    </div>
                </div>
                <h3> My Events: </h3>
                <table className="table">
                    <thead className="thead-custom">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th> Time Left </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventList()}
                    </tbody>
                </table>
            </div >
        );
    }
}
