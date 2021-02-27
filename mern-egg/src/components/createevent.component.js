import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
 

export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGroupname = this.onChangeGroupname.bind(this);
        this.onChangeUsers = this.onChangeUsers.bind(this);

        this.state = {
            groupName: '',
            groupMembers: [],
            groupCount: 0,
            users: []
        }    
    }
   
    componentDidMount(){
        axios.get(`http://localhost:5000/users`)
            .then(res => {

                this.setState({
                     users: res.data.map(user=>user.username)
                })            
            })
            .catch((error) => {
                console.log(error);
              })

    } 

    onChangeGroupname(e){

        this.setState({
            groupName: e.target.value
        })
    }

    

    onChangeUsers(e){
        this.setState({
            groupMembers: e
        }    
        )
    }

    onSubmit(e) {
        e.preventDefault();

        const group = {
            groupName: this.state.groupName,
            groupMembers: this.state.groupMembers.map(function(item) {
                return item['label']
            }),
            groupCount: this.state.groupMembers.length
        }
        console.log(group)

        axios.post(`http://localhost:5000/groups/add`, group)
            .then(res => console.log(res.data))
            .catch((error) => {
                console.log(error);
              })
        
        this.setState({
            groupName: '',
            groupMembers: [],
            groupCount: 0
        })
        window.location = '/groups';
    }

   
    render(){
        const userList = [];
        this.state.users.forEach(function(element) {
            userList.push({label: element, value: element})
        })

        const users = this.state.users.map(user=> {
            console.log(user.username)
            console.log(user.name)
            return <li key={user.username}> {user.username} </li>
         })
        return (
            <div>
                
               <h2>Add Event</h2>  
                <form onSubmit={this.onSubmit}>     
                     <label>Event name: </label>
                     <input  type="text" required value={this.state.name} onChange={this.onChangeGroupname} />
                   

                    <label>Description: </label>
                    <input  type="text" required value={this.state.name} onChange={this.onChangeGroupname} />
 
                    <label>Interval: </label>
                    <input  type="text" required value={this.state.name} onChange={this.onChangeGroupname} />

                     <input type="submit" value="Create Group" />
                </form>
            </div>    
        )
        }
}