import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export class NavMenu extends Component {

    render() {
        let cookies = null;
        let user = null;
        cookies = Cookies.get('demoAuthToken');
        if (cookies) {
             user = jwtDecode(cookies).Username;
            console.log(user)}
        
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Demo
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {!cookies ? <React.Fragment><li className="nav-item active">
                        <NavLink className="nav-link" to="/login">
                            Login <span className="sr-only" />
                        </NavLink>
                    </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/register">
                                Register <span className="sr-only" />
                            </NavLink>
                        </li></React.Fragment> : <React.Fragment><li className="nav-item active">
                            <NavLink className="nav-link" to="/welcome">
                                {user} <span className="sr-only" />
                            </NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/logout">
                                Logout <span className="sr-only" />
                                </NavLink>
                            </li></React.Fragment>}
                    
                   
                </ul>
            </div>
        </nav>
    );
  }
}
