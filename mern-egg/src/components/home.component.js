import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Timer from "./timer.component";

import '../Home.css';

const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td><Timer endtime={props.event.endtime}/></td>
        
     </tr>
);

export default class MyEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: []
        }    
    }
   
    componentDidMount(){
        axios.get(`http://localhost:5000/events`)
            .then(res => {
                this.setState({events: res.data});
            })
            .catch((error) => {
                console.log(error);
              })

    }

    eventList(){
        return this.state.events.map(currentevent => {
             return <Event event={currentevent} key={currentevent._id}/>})
    }

    render() {
        return (
            <div>
               <h2> Home </h2> 
 
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th> Time Left </th>
                </tr>
            </thead>
                <tbody>
                { this.eventList() }
                </tbody>
            </table>
            </div>    
        );
    }
}
