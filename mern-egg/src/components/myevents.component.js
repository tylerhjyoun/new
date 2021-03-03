import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'



const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td>{props.event.starttime} until {props.event.endtime}</td>
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
        return this.state.events.map(currentevent => {
             return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id}/>})
    }

    render() {
        return (
            <div>
               <h2>Logged Events </h2> 
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
