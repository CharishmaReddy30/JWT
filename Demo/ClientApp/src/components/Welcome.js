import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:""
        };
    }
    async componentDidMount() {
        try {
            var cookies = Cookies.get('demoAuthToken');
            var headers = {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            };
            const result = await axios.get("http://localhost:56281/api/values", { headers: headers });
            this.setState({ message: result.data[0] });
            console.log(this.state.message)
        }
        catch (ex) {
            
        }
    }

    render() {
        return (<div className="alert alert-primary" role="alert">
            {this.state.message}
        </div>);
    }



}