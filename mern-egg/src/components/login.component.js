import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import axios from 'axios'


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
        }    
    }

    // componentDidMount(){
    //     axios.get(`http://localhost:5000/login`)
    //         .then(res => {

    //             this.setState({
    //                  users: res.data.map(user=>user.username)
    //             })            
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //           })

    // } 
    
    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
        console.log(this.state.username)
    } 

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    } 

    async onSubmit(e) {
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
    
        axios.post(`http://localhost:5000/login/`, data)
            .then(res => {
                console.log(res.data)
                if (res.data == "Logged In"){
                 window.location = '/home';
                }
                else{
                    console.log("error")
                }
            })
            .catch((error) => {
                console.log(error);
              })
    }

    render(){
        return (
            <div> 
                Welcome to Eggtimer!
                <Link to="/user" className="nav-link"> Add new user </Link>
                <form onSubmit={this.onSubmit}>
                <label>Username: </label>
                <input  type="text"
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                />
                <label>Password: </label>
                <input  type="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
                <input type="submit" value="Login"/>
                </form>
           
            </div>    
        )
    }
}