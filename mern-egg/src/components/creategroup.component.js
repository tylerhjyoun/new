import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../Login.css';

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
            users: []
        }
    }

    async componentDidMount() {
        axios.get(`http://localhost:5000/users`)
            .then(res => {

                this.setState({
                    users: res.data.map(user => user.username)
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
            groupMembers: this.state.groupMembers.map(function (item) {
                return item['label']
            }),
            groupCount: this.state.groupMembers.length
        }
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
            userList.push({ label: element, value: element })
        })

        const users = this.state.users.map(user => {
            return <li key={user.username}> {user.username} </li>
        })
        return (
            <div className="bg-light">
                <div class="title">Add Group</div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Group name: </label>
                    </div>
                    <input type="text" required value={this.state.name} onChange={this.onChangeGroupname} />
                    <div>

                        <label>Members: </label>
                        <Select isMulti ref="userInput" setValue={this.state.group} options={userList} onChange={this.onChangeUsers}
                        />

                    </div>
                    <input type="submit" value="Create Group" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}