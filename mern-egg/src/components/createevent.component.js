import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker'
import auth from './auth'

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEventname = this.onChangeEventname.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        // this.onChangeUser = this.onChangeUser.bind(this);


        this.state = {
            eventName: '',
            description: '',
            date: '',
            user: [],
            id: '',
            // groups: []
        }
    }
    onChangeEventname(e) {
        this.setState({
            eventName: e.target.value
        })
    }
    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users`)
                    .then(res => {
                        this.setState({
                            user: res.data.filter(el => el._id === this.state.id).map(user => ({ id: user._id, username: user.username }))
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


    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        }
        )
    }

    onChangeDate(e) {
        this.setState({
            date: e
        })
    }

    // onChangeUser(e) {
    //     const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
    //     axios.post(`http://localhost:5000/login/token`, token)
    //         .then((res) => {
    //             this.setState({ id: res.data.id.id })
    //             axios.get(`http://localhost:5000/groups`)
    //                 .then(response => {
    //                     const all = response.data; 
    //                     let usergroups = [];
    //                     let copy = [];
    //                     for(let i = 0; i < all.length; i++){
    //                         const currentgroup = all[i]
    //                         for(let j = 0; j < currentgroup.groupMembers.length; j++){
    //                             const currentgroupmembersIds = currentgroup.groupMembers[j]['id']
    //                             if(currentgroupmembersIds === this.state.id){
    //                                 copy = usergroups.concat(currentgroup)
    //                             }
    //                         }
    //                     }
    //                     for(let i = 0; i < copy.length; i++){
    //                         if(e === copy[i].groupName){
    //                             this.setState({
    //                                 groups: copy[i],
    //                             })
    //                         }
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.log(error);
    //                 })
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //                     })
        
    //     this.setState({
    //         user: this.state.groups.groupMembers
    //     })
    // }

    onSubmit(e) {
        e.preventDefault();

        const event = {
            eventname: this.state.eventName,
            description: this.state.description,
            starttime: this.state.date[0],
            endtime: this.state.date[1],
            user: this.state.user
        }

        this.setState({
            eventName: '',
            description: [],
            date: ''
        })

        axios.post(`http://localhost:5000/events/add`, event)
            .then((res) => console.log(res.data), auth.login(() => {
                this.props.history.push("/home/events")
            }), )
            .catch((error) => {
                console.log(error);
            })

        
    }



    render() {
        return (
            <div className="bg-light">
                <h2>Add Event</h2>
                <form onSubmit={this.onSubmit}>
                    {/* <label>group? </label>
                    <input type="text"  value={this.state.user} onChange={this.onChangeUser} /> */}

                    <label>Event name: </label>
                    <input type="text" required value={this.state.eventName} onChange={this.onChangeEventname} />

                    <label>Description: </label>
                    <input type="text" required value={this.state.description} onChange={this.onChangeDescription} />
                    <div>
                        <label>Date: </label>
                        <DateTimeRangePicker required minDate={new Date()} value={this.state.date} onChange={this.onChangeDate} calendarClassName="react-datetime-picker__wrapper" />
                    </div>
                    <input type="submit" value="Create Event" />
                </form>
            </div>
        )
    }
}
