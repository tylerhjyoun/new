import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.username}</td>
        
        <td>
            <a href="#" onClick={() => { props.unFollow(props.user._id) }}>un-follow</a>
        </td>
    </tr>
);

export default class ShowFollowing extends Component {
    constructor(props) {
        super(props)
        this.unFollow = this.unFollow.bind(this)

        this.state = {
            id: '',
            following: [],
            users: [],
            follower_count: 0,
            following_count: 0
        }
    }


    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(response => {
                        console.log(response.data)
                        this.setState({
                            following: response.data.following,
                            following_count: response.data.following.length,
                            follower_count: response.data.followers.length
                        })
                        let user = localStorage.getItem('data');
                        const usertoken = user
                        axios.get(`http://localhost:5000/users`, { headers: { "Authorization": `Bearer ${usertoken}` } }) // get all users
                            .then(res => {
                                this.setState({
                                    users: res.data.filter((el) => this.state.following.includes(el._id))
                                });
                                console.log(this.state.following)
                                console.log(this.state.users)
                            })
                            .catch((error) => {
                                console.log(error);
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
    userList() {
        return this.state.users.map(currentuser => { // filteredUsers is an array of objects
            return <User user={currentuser} unFollow={this.unFollow} key={currentuser._id} />
        })
    }

    unFollow(id) {
        axios.post('http://localhost:5000/users/unfollow/' + this.state.id, { id })
            .then(response => { console.log(response.data) });
        axios.post('http://localhost:5000/users/removefollower/' + id, { id: this.state.id })
            .then(response => { console.log(response.data) });
        this.setState({
            users: this.state.users.filter(el => el._id !== id),
            following_count: this.state.following_count-1
        })
        console.log(this.state.following_count)
    }

    render() {
        return (
            <div>
                <h2>Following: {this.state.following_count} </h2>
                <h2>Followers: {this.state.follower_count} </h2>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div >
        );
    }
}
