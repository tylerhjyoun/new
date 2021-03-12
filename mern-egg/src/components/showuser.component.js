import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from './timer.component'
import moment from 'moment'
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"


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
            events: [],
            profilepicture: 0

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

    userList() {

        return this.state.events.map(event => {
            return <Event event={event} key={event._id} />
        })
    }

    addFollowing(id) {
        axios.post('http://localhost:5000/users/addfollowing/' + this.state.id, { id })
            .then(response => { console.log(response.data) });
        axios.post('http://localhost:5000/users/addfollower/' + id, { id: this.state.id })
            .then(response => { console.log(response.data) });

    }

    render() {
        return (
            <div className="background">
                <h2>{this.state.user.username}'s Profile</h2>
                <div class="profile">
                    <img className = "avatar" src = {(this.state.profilepicture === 1 ? egg_pic : this.state.profilepicture === 2 ? man_pic : this.state.profilepicture === 3 ? beard_pic : null)}
                                alt = "Icon" width="150" height="150"
                    ></img>
                    <div>
                        <p>
                        Name: {this.state.user.name} <br />
                        Username: {this.state.user.username} <br />
                        Following: {this.state.following} <br />
                        Followers: {this.state.followers} <br />
                        <br /><br /><br />
                        </p>

                    </div>
                </div>
                {/*<h3> {this.state.user.name}'s Events: </h3>*/}
                <table className="table">
                    <thead className="thead-custom">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th> Started At </th>
                            <th> Ending At</th>
                            <th> Time Left</th>
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

{/*
    render() {
        return (
            <div className="background">
                <h2> Welcome back, {this.state.user.username}!</h2>
                <div class="profile">
                    <img className = "avatar" src = {(this.state.profilepicture === 1 ? egg_pic : this.state.profilepicture === 2 ? man_pic : this.state.profilepicture === 3 ? beard_pic : null)}
                                alt = "Icon" width="150" height="150"
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
*/}
