import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../Groups.css';
import moment from 'moment'

const Group = props => (
    <tr>
        <td>{props.group.groupName}</td>
        {/*<Link to={`/users/${props.group.groupMembers[0]}`}>       
            <td>{props.group.groupMembers}</td>
        </Link>*/}
        {/* <td>...members...</td> */}
        <td>{props.group._id}</td>
        {/* Remove the delete button later on */}
    </tr>
);

const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td>{moment(props.event.starttime).format("ddd, MMM DD HH:mm a")}</td>
        <td>{moment(props.event.endtime).format("ddd, MMM DD HH:mm a")}</td>
    </tr>
);

export default class showGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group: [],
            groupmembers: [],
            events: []
        }  
    
    }


    componentDidMount() {
            console.log(this.props.match.params.id);
            axios.get(`http://localhost:5000/groups/` + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        group: response.data,
                        groupmembers: response.data.groupMembers
                    });
                    console.log(this.state.group)
                })
                .catch((error) => {
                    console.log(error);
                })
            axios.get(`http://localhost:5000/events/`)
                    .then(res => {
                        console.log(res.data)
                        const eventsData = res.data
                        var final = []
                        for (var i = 0; i < res.data.length; i++) { 
                            var curr = eventsData[i]
                            console.log(curr.user[0].username)
                            for (var q = 0; q < this.state.groupmembers.length; q++)
                            {
                                console.log(this.state.groupmembers[q].username)
                                if(curr.user[0].username === this.state.groupmembers[q].username){
                                    final.push(curr)
                                    console.log(final);
                                }
                            }
                        }
                        this.setState({
                            events: final,
                        });
                        console.log(this.state.events)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
        }

    eventList() {
        var eventsUnfiltered = this.state.events;
        console.log(this.state.groupmembers.length);
        for(var i = 0; i < this.state.groupmembers.length; i++)
        {

        }
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
        const data = Array.from(this.state.groupmembers);
        const listUsers = data.map((d) => <li key={d.username}><Link to={'/home/users/' + d.id}>{d.username}</Link></li>);
        return (
            <div>
                <h2>Group Name: {this.state.group.groupName}</h2>
                <h2>Group Size: {this.state.group.groupCount}</h2>
                <h2>Group Members:</h2>
                <ul className="UserList">{listUsers}</ul>
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
                    {this.eventList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
