import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from './timer.component'
import moment from 'moment'
import '../UserProfile.css';
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"

const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td>{moment(props.event.starttime).format("ddd, MMM DD HH:mm a")}</td>
        <td>{moment(props.event.endtime).format("ddd, MMM DD HH:mm a")}</td>
    </tr>
);

export default class ShowUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            followers: 0,
            following: 0,
            profilepicture: 0,
            events: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/users/` + this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response.data,
                    followers: response.data.followers.length,
                    following: response.data.following.length,
                    profilepicture: response.data.profilepicture
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

    userList() {
        return this.state.events.map(event => {
            return <Event event={event} key={event._id} />
        })
    }

    render() {
        return (
            <div>
                <div class="user_profile">
                    <img className = "avatar" src = {(this.state.profilepicture === 1 ? egg_pic : this.state.profilepicture === 2 ? man_pic : this.state.profilepicture === 3 ? beard_pic : null)}
                                alt = "Icon" width="150" height="150"
                    ></img>
                    <div>
                        <h3> {this.state.user.name}'s Profile: </h3>
                        <p>
                        Name: {this.state.user.name} <br />
                        Username: {this.state.user.username} <br />
                        <br /><br /><br />
                        </p>
                    </div>
                </div>
                <h3>Followers: {this.state.followers}</h3>
                <h4>Following: {this.state.following}</h4>

                <table className="table">
                    <thead className="thead-custom">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        );
    }
}