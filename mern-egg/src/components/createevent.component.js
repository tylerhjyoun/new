import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEventname = this.onChangeEventname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate= this.onChangeDate.bind(this);
 

        this.state = {
            eventName: '',
            description: '',
            date: '',
         }    
    }
    onChangeEventname(e){
        this.setState({
            eventName: e.target.value
        })
    }

    

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        }    
        )
    }
    
    onChangeDate(e){
        this.setState({
            date: e
        })
    } 

    onSubmit(e) {
        e.preventDefault();

        const event = {
            eventname: this.state.eventName,
            description: this.state.description,
            starttime: this.state.date[0],
            endtime: this.state.date[1],
         }

        axios.post(`http://localhost:5000/events/add`, event)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              })
        
        this.setState({
            eventName: '',
            description: [],
            date: ''
        })
        window.location = 'home/events';
    }



    render(){
        return (
            <div>
                
               <h2>Add Event</h2>  
                <form onSubmit={this.onSubmit}>     
                     <label>Event name: </label>
                     <input  type="text" required value={this.state.eventName} onChange={this.onChangeEventname} />
                   

                    <label>Description: </label>
                    <input  type="text" required value={this.state.description} onChange={this.onChangeDescription} />
                    <div>
                        <label>Date: </label>
                        <DateTimeRangePicker value={this.state.date} onChange={this.onChangeDate} calendarClassName="react-datetime-picker__wrapper"/>
                        
                    </div>
                     <input type="submit" value="Create Event" />
                </form>
            </div>    
        )
        }
}