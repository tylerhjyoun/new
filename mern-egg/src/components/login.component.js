import React, { Component, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios'
import auth from './auth'

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onChangeUsername(e) {
        setUsername(e.target.value)
        console.log(username)
    }
    function onChangePassword(e) {
        setPassword(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }

        axios.post(`http://localhost:5000/login/`, data)
            .then(res => {
                if (res.data.user.username == username) {
                    console.log("Logged In!")
                    auth.login(() => props.history.push("/home"))
                }
                else {
                    console.log("User not found")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div>
            Welcome to Eggtimer!
            <Link to="/user" className="nav-link"> Add new user </Link>
            <form onSubmit={onSubmit}>
                <label>Username: </label>
                <input type="text"
                    required
                    value={username}
                    onChange={onChangeUsername}
                />
                <label>Password: </label>
                <input type="password"
                    required
                    value={password}
                    onChange={onChangePassword}
                />
                <input type="submit" value="Login" />
            </form>

        </div>
    )
}

export default withRouter(Login)

// export default class Login extends Component {
//     constructor(props) {
//         super(props)

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             username: '',
//             password: '',
//         }    
//     }

//     onChangeUsername(e){
//         this.setState({
//             username: e.target.value
//         })
//         console.log(this.state.username)
//     } 

//     onChangePassword(e){
//         this.setState({
//             password: e.target.value
//         })
//     } 

//     onSubmit(e) {
//         e.preventDefault();
//         const data = {
//             username: this.state.username,
//             password: this.state.password
//         }

//         axios.post(`http://localhost:5000/login/`, data)
//             .then(res => {
//                // console.log(res.data)
//                 if (res.data != "Logged In"){
//                     console.log(this.isAuth)


//                   //  window.location = '/home';
//                 }
//                 else{
//                   }
//             })
//             .catch((error) => {
//                 console.log(error);
//               })
//     }

//     render(){
//         return (
//             <div> 
//                 Welcome to Eggtimer!
//                 <Link to="/user" className="nav-link"> Add new user </Link>
//                 <form onSubmit={this.onSubmit}>
//                 <label>Username: </label>
//                 <input  type="text"
//                     required
//                     value={this.state.username}
//                     onChange={this.onChangeUsername}
//                 />
//                 <label>Password: </label>
//                 <input  type="password"
//                     required
//                     value={this.state.password}
//                     onChange={this.onChangePassword}
//                 />
//                 <input type="submit" value="Login"/>
//                 </form>

//             </div>    
//         )
//     }
// }