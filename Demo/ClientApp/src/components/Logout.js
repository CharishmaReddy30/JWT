import React, { Component } from 'react';
import Cookies from 'js-cookie';

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        Cookies.remove('demoAuthToken');
        window.location = "/login";
    }
    render() {
        return (<React.Fragment><h1>Logout</h1></React.Fragment>);
    }
}