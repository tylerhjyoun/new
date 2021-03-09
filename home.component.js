import React, { Component } from 'react';
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
            events: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/events`)
            .then(res => {
                this.setState({ events: res.data });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    eventList() {
        this.state.events.sort(function(a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            return aval - bval;
        });
        const filtered = this.state.events.filter(e => 
            Math.floor((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) >= 0);
        return filtered.map(currentevent => {
             return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>
        })
    }

    render() {
        return (
            <div className ="background">
                <h2> Home </h2> <button onClick={() => {
                    auth.logout(() => {
                        console.log(this.props.history)
                        this.props.history.push("/")
                    })
                }}> Logout </button>

                <table className="table">
                    <thead className="thead-light">
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
            </div>
        );
    }
}
