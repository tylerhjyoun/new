import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import moment from 'moment'

import '../Events.css';


const Event = props => (
    <tr>
        <td>{props.event.eventname}</td>
        <td>{props.event.description}</td>
        <td><b>{moment(props.event.starttime).format("ddd, MMM DD HH:mm a")}</b> until <b>{moment(props.event.endtime).format("ddd, MMM DD HH:mm a")}</b></td>
        <td>
            <button class = "RemoveButton" 
            href="#" onClick={() => { props.deleteEvent(props.event._id) }}>Remove</button>
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
   
    /*
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
    */
    deleteEvent(id){
        axios.delete('http://localhost:5000/events/'+id)
            .then(response => { console.log(response.data)});
  
        this.setState({
            events: this.state.events.filter(el => el._id !== id)
      })    
    }

    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
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

    userTimer(timer) {
        axios.post('http://localhost:5000/users/timer/' + this.state.id, { timer })
            .then(response => { console.log(response.data) });
    }

    eventList() {
        this.state.events.sort(function(a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
               return aval - bval;
        });
        const filtered = this.state.events.filter(e => Math.floor((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) > 0);
        
        return filtered.map(currentevent => {
        return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id} />
        })
    }
   /* i couldnt figure out how to delete old events 
        - i tried to setState to the filtered list but it gets called too many times so it thinks theres an infinite loop
        - i tried writing a clean function and then using set interval to call it but i couldnt get it to work since its async and tried using th efunction before there was any data idk 
        with an old list the user can delete the events later */
    oldList() { 
        this.state.events.sort(function(a, b) {
            const aval = Math.floor((new Date(a.endtime).getTime() + new Date(a.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
            const bval = Math.floor((new Date(b.endtime).getTime() + new Date(b.endtime).getDate() - new Date().getTime() - new Date().getDate())/ (1000));
               return aval - bval;
        });
        const filtered = this.state.events.filter(e => 
            Math.floor((new Date(e.endtime).getTime() + new Date(e.endtime).getDate() - new Date().getTime() - new Date().getDate()) / 1000) <= 0);
            return filtered.map(currentevent => {
            return <Event event={currentevent} deleteEvent={this.deleteEvent} key={currentevent._id} />
        })
    }

    render() {
        return (
            <div>
               <h2>Events </h2> 
               <form action="/home/event">
                    <input className = "AddEvent" type="submit" value="Add Event" />
                </form>
               <Link to='/home/event'> Add Event </Link><br/><br/>
            <h3> Upcoming Events: </h3>
            <table className="table">
            <thead className="thead-custom">
                <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                { this.eventList() }
                </tbody>
            </table>
            <h3> Past Events: </h3>
            <table className="table">
            <thead className="thead-custom">
                <tr>
                    <th>Event Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                { this.oldList() }
                </tbody>
            </table>

            </div>    
        );
    }
}
