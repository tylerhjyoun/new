import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import Timer from './timer.component'
import auth from './auth'
import '../Groups.css';
import moment from 'moment'
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"
import woman_pic from "../profilepictures/woman_pic.png"


const Group = props => (
    <tr>
        <td>{props.group.groupName}</td>
       
        <td>{props.group._id}</td>
    </tr>
);

const Event = props => (
    <tr>
        <td>{props.event.user[0].username}</td>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td><Timer endtime={props.event.endtime} /></td>
    </tr>
);

export default class showGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            group: [],
            groupmembers: [],
            events: [],
            profilepicture: []
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
                    for(var i = 0; i < this.state.groupmembers.length; i++)
                        {
                            var final = []
                            axios.get(`http://localhost:5000/users/` + this.state.groupmembers[i].id)
                            .then(response => {
                                final.push(response.data.profilepicture)
                                this.setState({
                                    profilepicture: final
                                });
                                console.log(this.state.profilepicture)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                        }
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
                            for (var q = 0; q < this.state.groupmembers.length; q++)
                            {
                                if(curr.user[0].id === this.state.groupmembers[q].id){
                                    final.push(curr)
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
        console.log(this.state.events)
        this.state.events.sort(function (a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate()) / (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate()) / (1000));
            return aval - bval;
        });
        const filtered = this.state.events.filter(e =>
            Math.floor(
                (((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) >= 0) 
                && (((new Date().getTime() + new Date().getDate() - new Date(e.starttime).getTime() - new Date(e.starttime).getDate()) / 1000) >= 0)));
        return filtered.map(currentevent => {
            return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id} />
        })
    }


    render() {
        for(var i = 0; i < this.state.groupmembers.length; i++)
        {
            this.state.groupmembers[i].profilepicture = this.state.profilepicture[i];
        }
        console.log(this.state.groupmembers)
        const data = Array.from(this.state.groupmembers);

        const listUsers = data.map((d) => 
        <tr key={d.username}>
            
            <td><img className="ListIcon" src={(d.profilepicture === 1 ? man_pic : d.profilepicture === 2 ? beard_pic : d.profilepicture === 3 ? woman_pic : null)}
                alt="Icon" width="40" height="40"
            >
            </img><Link to={'/home/users/' + d.id}>{d.username}</Link></td>
        </tr>);
       
        return (
            <div>

                <h2>{this.state.group.groupName}'s Group Profile</h2>
                <div class="profile">
                <img className = "avatar" src = "https://cdn1.iconfinder.com/data/icons/business-avatar-vol-2/16/men_avatar_group_people_persons_community-512.png"
                                alt = "Icon" width="150" height="150"
                    ></img>
                </div>
                <p>
                <h6> Welcome to your Group's Profile Page! </h6>
                On this page, you can directly look at any <br/>
                events that your group currently has! <br/><br/>
                <h6>Group Size: {this.state.group.groupCount}</h6> <br/>
                </p>
                <h3>Group Members:</h3>
                <table className="table">
                <thead className="thead-custom">
                    <tr>

                        <th>Username</th>

                    </tr>
                </thead>
                <tbody>
                    {listUsers}
                </tbody>
                </table>

                <table className="table">
                <thead className="thead-custom">
                        <tr>
                            <th>User Name</th>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Time Left</th>
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
