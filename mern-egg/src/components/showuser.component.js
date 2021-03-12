import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from './timer.component'
import moment from 'moment'

const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td>{moment(props.event.starttime).format("ddd, MMM DD HH:mm a")}</td>
        <td>{moment(props.event.endtime).format("ddd, MMM DD HH:mm a")}</td>
        <td><Timer endtime={props.event.endtime} /></td> 
    </tr>
);

export default class ShowUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            followers: 0,
            following: 0,
            events: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/users/` + this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response.data,
                    followers: response.data.followers.length,
                    following: response.data.following.length
                });
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(`http://localhost:5000/events/find/` + this.props.match.params.id)
            .then(response => {
                this.setState({
                    events: response.data,
                });
                console.log(this.state.events)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    eventList() {
        return this.state.events.map(event => {
            return <Event event={event} key={event._id} />
        })
    }

    render() {
        return (
            <div>
                <h2>Username: {this.state.user.username}</h2>
                <h2>Name: {this.state.user.name}</h2>
                <h2>Followers: {this.state.followers}</h2>
                <h2>Following: {this.state.following}</h2>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Timer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
