import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'


const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td><b>{moment(props.event.starttime).format("ddd, MMM DD HH:mm a")}</b> until <b>{moment(props.event.endtime).format("ddd, MMM DD HH:mm a")}</b></td>
        <td>
            <a href="#" onClick={() => { props.deleteEvent(props.event._id) }}>delete event</a>
        </td>
     </tr>
);

export default class MyEvents extends Component {
    constructor(props) {
        super(props)
        this.deleteEvent = this.deleteEvent.bind(this)
        this.state = {
            events: []
        }    
    }
   
    componentDidMount(){
        const a = new Date()
        console.log(a)
        axios.get(`http://localhost:5000/events`)
            .then(res => {
                this.setState({events: res.data});
            })
            .catch((error) => {
                console.log(error);
              })

    }

    deleteEvent(id){
        axios.delete('http://localhost:5000/events/'+id)
            .then(response => { console.log(response.data)});
  
        this.setState({
            events: this.state.events.filter(el => el._id !== id)
      })    
    }

    eventList(){
        this.state.events.sort(function(a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            return aval - bval;
        });
        const filtered = this.state.events.filter(e => 
            Math.floor((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) >= 0);
            return filtered.map(currentevent => {
             return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>})
            }

    render() {
        return (
            <div>
               <h2>Upcoming Events </h2> 
               <Link to='/home/event'> Add Event </Link>
 
            <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Duration</th>
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
