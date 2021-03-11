import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Select from 'react-select'
import auth from './auth'
import '../Followers.css';

const User = props => (
    <tr>
        <td>
        <img className = "ListIcon" src = "https://image.flaticon.com/icons/png/512/147/147144.png"
        alt = "ListIcon" width="40" height="40"
        ></img>
        {props.user.name}</td>
        <td><Link to={'/home/users/'+props.user._id}>{props.user.username}</Link></td>
        <td>
            <button className = "Unfollow"
            href="#" onClick={() => { props.unFollow(props.user._id) }}>Unfollow</button>
        </td>
    </tr>
);

const Fuser = props => (
    <tr>
        <td>{props.user.name}</td>
        <td><Link to={'/home/users/'+props.user._id}>{props.user.username}</Link></td>
        <td>
        </td>
    </tr>
);

export default class ShowFollowing extends Component {
    constructor(props) {
        super(props)
        this.unFollow = this.unFollow.bind(this)
        this.addFollowing = this.addFollowing.bind(this)

        this.state = {
            id: '',
            following: [],
            followers: [],
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
                            followers: response.data.followers,
                            following_count: response.data.following.length,
                            follower_count: response.data.followers.length
                        })
                        let user = localStorage.getItem('data');
                        const usertoken = user
                        axios.get(`http://localhost:5000/users`, { headers: { "Authorization": `Bearer ${usertoken}` } }) // get all users
                            .then(res => {
                                this.setState({
                                    users: res.data.filter((el) => this.state.following.includes(el._id)),
                                    followers: res.data.filter((el) => this.state.followers.includes(el._id))
                                });
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
    followersList() {
        return this.state.followers.map(currentuser => { // filteredUsers is an array of objects
            return <Fuser user={currentuser} addFollowing={this.addFollowing} key={currentuser._id} />
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

    addFollowing(id) {
        axios.post('http://localhost:5000/users/addfollowing/' + this.state.id, { id })
            .then(response => { console.log(response.data) });
        axios.post('http://localhost:5000/users/addfollower/' + id, { id: this.state.id })
            .then(response => { console.log(response.data) });

        this.setState({
            users: this.state.users.filter(el => el._id !== id),
        })
    }

    render() {
        return (
           
            
            <div >
                <div className = "FollowData">
                    <h3>Following: {this.state.following_count} </h3>
                    <h4>Followers: {this.state.follower_count} </h4>
                </div>
                <input class="form-control" id="myInput" type="text" placeholder="Search.."/>
                <table className="table">
                    <thead className="thead-custom">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
                <h2>Followers: {this.state.follower_count} </h2>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.followersList()}
                    </tbody>
                </table>
            </div >
        );
    }
}
