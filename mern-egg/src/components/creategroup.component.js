import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../AddGroup.css';

export default class CreateGroup extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGroupname = this.onChangeGroupname.bind(this);
        this.onChangeUsers = this.onChangeUsers.bind(this);

        this.state = {
            groupName: '',
            groupMembers: [],
            groupCount: 0,
            users: [],
            id: '',
            currentUser: []
        }
    }

    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users`)
                    .then(res => {
                        this.setState({
                            users: res.data.map(user => ({id: user._id, username: user.username})).filter(el => el.id !== this.state.id),
                            currentUser: res.data.filter(el => el._id === this.state.id).map(user => ({id: user._id, username: user.username}))
                        })
                        console.log(this.state.currentUser)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })



    }

    onChangeGroupname(e) {

        this.setState({
            groupName: e.target.value
        })
    }



    onChangeUsers(e) {
        this.setState({
            groupMembers: e
        }
        )
    }

    onSubmit(e) {
        e.preventDefault();
       
        const group = {
            groupName: this.state.groupName,
            groupMembers: this.state.groupMembers.map(user => ({id: user.value, username: user.label})).concat(this.state.currentUser),
            groupCount: this.state.groupMembers.length
        }
        console.log(group.groupMembers)
        this.setState({
            groupName: '',
            groupMembers: [],
            groupCount: 0
        })
        axios.post(`http://localhost:5000/groups/add`, group)
            .then(
                (res) => console.log(res.data),
                auth.login(() => {
                    this.props.history.push("/home/groups")
                }),
            )
            .catch((error) => {
                console.log(error);
            })
            
    }


    render() {
        const userList = [];
        this.state.users.forEach(function (element) {
            userList.push({ label: element.username, value: element.id })
        })

        return (
            <div className="bg-light">
                <h2>Add Group</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Group Name: </label>
                    </div>
                    <input type="text" required value={this.state.name} onChange={this.onChangeGroupname} />
                    <div>

                        <label>Members: </label>
                        <Select isMulti ref="userInput" setValue={this.state.group} options={userList} onChange={this.onChangeUsers}
                        />

                    </div><br/>
                    <div className = "CreateGroupBtn">
                        <input type="submit" value="Create Group" className="btn"/>
                    </div>
                    
                </form>
            </div>
        )
    }
}