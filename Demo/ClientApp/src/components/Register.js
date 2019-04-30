import React, { Component } from 'react';
import axios from 'axios';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmit(e) {
        try {
            e.preventDefault();
            await axios.post("http://localhost:56281/api/auth/register",
                { "Username": this.state.username, "Password": this.state.password });
            window.location = "/";
        } catch (ex) {
            const errors = ex.response.data;
            this.setState({ errors })
        }
    }
    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form>
                    {this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input id="username" className="form-control" name="username" onChange={this.handleChange} />
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