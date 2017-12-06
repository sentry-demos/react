/*global Raven:false*/

import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        var email = this.state.email;
        Raven.setUserContext({email});
        this.props.history.pushState({email}, "/errors");
    }

    render() {
        return (
            <div className="center">
                <h2>Please login</h2>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address:</label>
                        <input type="email" className="form-control" onChange={this.handleChange} placeholder="Enter email"/>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
              </form>
            </div>
        );
    }
}

export default Login;
