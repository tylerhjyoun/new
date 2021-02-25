import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'

export default class CreateGroup extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGroupname = this.onChangeGroupname.bind(this);
        this.onChangeUsers = this.onChangeUsers.bind(this);
        this.onChangeCount = this.onChangeCount.bind(this);

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

    onChangeCount(e){
        this.setState({
            groupCount: e.target.value
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
            groupCount: this.state.groupCount
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
    }

   
    render(){
        console.log(this.state.users);
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
                
                Add Group
                <form onSubmit={this.onSubmit}>          
                    <label>Group name: </label>
                    <input  type="text" required value={this.state.name} onChange={this.onChangeGroupname} />
                    <label>Members: </label>
                    {/* <select multi ref="userInput" required value={this.state.group} onChange={this.onChangeUsers}>
                        {
                            this.state.users.map(function(user) {
                                return <option key={user} value={user}>
                                        {user}
                                        </option>;
                            })
                        }
                        </select> */}
                        {users}
                     <div> 
                                       <Select isMulti ref="userInput" setValue={this.state.group} options={userList} onChange={this.onChangeUsers}
                                        />
                  
                        </div>

                    <input type="submit" value="Create Group"/>
                </form>
            </div>    
        )
        }
}