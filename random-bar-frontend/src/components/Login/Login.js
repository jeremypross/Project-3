import React, {Component} from "react";
import {Link, browserHistory} from "react-router";
import update from "react-addons-update";

import Nav from "../Nav/Nav";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: "",
      password: ""
    };
  }

  handleChange(event) {
    let newState = update(this.state, {
      user: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/authenticate`, {
      method: "POST",
      body: JSON.stringify(this.state)
    })
    .then((results) => {
      results.json().then((jwt) => {
        window.localStorage.setItem("MyToken", jwt.token);
        browserHistory.push("/");
      })
    })
    .catch((err) => {
      alert("Not Authenticated!");
    })
  }

  render() {
    return (
     <div>
     <Nav />
        <div className="container">
          <h2>Login Here</h2>
          <div className="form-container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <h4>Email:</h4>
              <input name="email" type="email" onChange={this.handleChange.bind(this)} />
              <h4>Password:</h4>
              <input name="password" type="password" onChange={this.handleChange.bind(this)} />
              <button className="standard-btn" type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
