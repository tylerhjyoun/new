import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import auth from './auth'
import egg_pic from "../profilepictures/egg_pic.png"
import man_pic from "../profilepictures/man_pic.png"
import beard_pic from "../profilepictures/beard_pic.png"
import woman_pic from "../profilepictures/woman_pic.png"
import '../EditUser.css';


export default class EditUser extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this)


        this.state = {
            username: '',
            password: '',
            profilepicture: 0,

            user: [],
            id: ''
        }
    }
    onChangeUsername(e) {
        console.log(e.target.value)
        this.setState({
            username: e.target.value
        })
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        }
        )
    }

    onChangeProfilePicture(e) {
        this.setState({
            profilepicture: e.target.value
        })
    }

    componentDidMount() {
        const token = { token: localStorage.getItem('data') } // determine user that is logged in and set state to its id
        axios.post(`http://localhost:5000/login/token`, token)
            .then((res) => {
                this.setState({ id: res.data.id.id })
                axios.get(`http://localhost:5000/users/` + this.state.id)
                    .then(res => {
                        this.setState({
                            user: res.data,
                            profilepicture: res.data.profilepicture
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




    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            id: this.state.id,
            profilepicture: this.state.profilepicture
        }

        this.setState({
            username: '',
            password: '',
            profilepicture: 0,
            user: [],
            id: ''
        })

        axios.post(`http://localhost:5000/users/update/` + user.id, user)
            .then((res) => console.log(res.data), alert("Changes Saved!"))
            .catch((error) => {
                console.log(error);
            })
        

    }



    render() {
        return (
            <div className="bg-light">
                

                <h2>Edit User</h2>
                
                <form onSubmit={this.onSubmit}>
                    <h6>Current Username: {this.state.user.username}</h6>
                    <Link to="/home/" className="edit"> Back to Home </Link><br/>
                    <div>
                        <br/>
                        <label>New Username: </label><br/>
                        <input type="text" required value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div>
                        <label>New Password: </label><br/>
                        <input type="password" required value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div>
                        <br/>
                        <h6> Change Your Profile Picture!</h6>
                        <p> You have Selected Option: {this.state.profilepicture}</p>
                        <select required onChange={this.onChangeProfilePicture}>
                                <option value= "1"> 1 </option>
                                <option value= "2"> 2 </option>
                                <option value= "3"> 3 </option>
                        </select>
                    </div>
                    
                    <input type="image" src={man_pic} alt="default" width="96" height="96"
                        value={this.state.profilepicture}
                        onChange={this.onChangeProfilePicture}
                    />
                    <input type="image" src={beard_pic} alt="man" width="96" height="96"
                        value={this.state.profilepicture}
                        onChange={this.onChangeProfilePicture}
                    />
                    <input type="image" src={woman_pic} alt="woman" width="96" height="96"
                        value={this.state.profilepicture}
                        onChange={this.onChangeProfilePicture}
                    />
                    <pre>    Option 1       Option 2       Option 3</pre>
                    <input type="submit" value="Save Changes" className = "btn"/>

                </form>
            </div>
        )
    }
}