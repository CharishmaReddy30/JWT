import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors:""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:56281/api/auth/login",
                { "Username": this.state.username, "Password": this.state.password });
            Cookies.set('demoAuthToken', result.data.token);
            window.location = "/welcome";
        }
        catch (ex) {
            const errors = ex.response.data;
            this.setState({ errors });
        }
    }
    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="form-control" name="username" onChange={this.handleChange} />
                        {this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" name="password" type="password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit} > Submit</button>
                </form>
            </div>
        )
    }
}