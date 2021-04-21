import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import Axios from 'axios';

const Header = (props) => {

    const renderLogout = (e) => {
        e.preventDefault();
        props.setIsLogin(false);
        sessionStorage.removeItem('userDetails');
        sessionStorage.removeItem('token');
        props.history.push('/login');
    }

    return (
        <header>
            <div className="header">
                <div className="logo" 
                    onClick={() => {props.history.push('/')}}>
                    <h3><b>Book Apartment</b></h3>
                </div>


                {
                    props.isLogin && 
                    <>
                        <div className="logout">
                            <button className="btn btn-secondary" onClick={renderLogout}>
                                <b>Logout</b>
                            </button>
                        </div>
                    </>
                }

                {
                    !props.isLogin && 
                    <button onClick={() => {props.history.push('/login')}} className="btn btn-secondary login">
                        <b>Login/Signup</b>
                    </button>
                }
            </div>
        </header>
    );
}

export default withRouter(Header);