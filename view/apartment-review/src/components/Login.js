import './Form.css';
import { Link, withRouter } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changeHandler = (e) => {
        if(e.target.name === "email") {
            setEmail(e.target.value)
        }else {
            setPassword(e.target.value)
        }
    }

    const renderSubmit = (e) => {
        e.preventDefault();
        if(email && password) {
            const authData = { email, password }
            Axios.post('/users/login', authData)
            .then(res => {
                sessionStorage.setItem('token', res.data.token);
                setError('');
                setSuccess('Login Successful')

                const userInfo = async () => {
                    const headers = {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json', 
                        'x-access-token': res.data.token
                    }

                    let resp = await Axios.get('/users/profile', {headers});

                    return resp.data
                }

                userInfo().then(data => sessionStorage.setItem('userDetails', JSON.stringify(data)))

                setTimeout(() => {
                    props.setIsLogin(true);
                    props.history.push('/');
                }, 1000)
            })
            .catch(err => {
                setError('Invalid Email or Password');
            })
        }else {
            setError('Both fields are required')
        }
    }
    
    return (
        <div className="main-continer">
            <div className="form-class">
                <form className="form-data">
                    <h3 className="font-size">Login Form</h3>
                    <hr/>

                    <div className="form-group">
                        <label className="font-size">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="font-size">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div style={{fontSize:"16px",color:"red"}}>
                        <span>{error}</span>
                    </div>

                    <div style={{fontSize:"16px",color:"green"}}>
                        <span>{success}</span>
                    </div>

                    <button type="submit" className="btn btn-secondary btn-block" onClick={renderSubmit}>Sign In</button>

                    <p className="forgot-password text-right">Not a member? <Link to='/signup' style={{color:"dodgerblue"}}>sign up</Link>
                    </p>    
                </form>
            </div>
        </div>
        
    );
}

export default withRouter(Login);