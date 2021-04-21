import { Link } from 'react-router-dom';
import './Form.css';
import { useState } from 'react';
import Axios from 'axios';

const Signup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changeHandler = (e) => {
        if(e.target.name === "name") {
            setName(e.target.value)
        }else if(e.target.name === "email") {
            setEmail(e.target.value)
        }else if(e.target.name === "password") {
            setPassword(e.target.value)
        }else if(e.target.name === "phone") {
            setPhone(e.target.value)
        }else if(e.target.name === "location") {
            setLocation(e.target.value)
        }else if(e.target.name === "role") {
            setRole(e.target.value)
        }else {
            if(e.target.files.length > 0) {
                setImage(e.target.files[0])
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(name && email && password) {
            let userData;
            if(image) {
                const data = new FormData();
                data.append('file', image);
                data.append('upload_preset', 'image_uploader')
                data.append('clone_name', 'sawan')

                let imageUrl = async () => {
                    let res = await Axios.post('https://api.cloudinary.com/v1_1/sawan/upload', data);
                    console.log(res);
                    return res.data.url
                }

                imageUrl().then(res => {
                    userData = { name, email, password, phone, location, role, imageUrl: res };
                    Axios.post('/users/register', userData)
                    .then(res => {
                        setError('');
                        setSuccess('Signup Successful');
                        setTimeout(() => {
                            props.history.push('/');
                        }, 1000);
                    })
                    .catch(err => {
                        console.log(err)
                        setError('All fields should be valid')
                    })
                })
            }else {
                userData = { name, email, password, phone, location, role };
                Axios.post('/users/register', userData)
                .then(res => {
                    setError('');
                    setSuccess('Signup Successful');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 1000);
                })
                .catch(err => {
                    console.log(err)
                    setError('All fields should be valid')
                })
            }
        }else {
            setError('Name, Email and Password are required fields')
        }
    }

    return(
        <div className="main-continer">
            <div className="form-class">
            <form className="form-data" encType="multipart/form-data">
                <h3 className="font-size">Sign Up Form</h3>
                <hr/>

                <div className="form-group">
                    <label className="font-size">User name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter User name"
                        autoComplete="new-off" 
                        name="name"
                        onChange={changeHandler}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="font-size">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        autoComplete="new-off"
                        name="email"
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
                        autoComplete="new-off" 
                        name="password"
                        onChange={changeHandler}
                        required
                    />
                </div>	

                <div className="form-group">
                    <label className="font-size">Phone</label>
                    <input 
                        type="phone" 
                        className="form-control" 
                        placeholder="Enter phone number"
                        autoComplete="new-off" 
                        name="phone"
                        onChange={changeHandler}
                        required
                    />
                </div>	

                <div className="form-group">
                    <label className="font-size">location</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter password"
                        autoComplete="new-off" 
                        name="location"
                        onChange={changeHandler}
                        required
                    />
                </div>	

                <div className="form-group">
                    <label className="font-size">Role</label>
                    
                    <label style={{marginLeft:"5px"}}>
                        <input 
                            type="radio" 
                            name="role"
                            value="Guest"
                            onClick={changeHandler}
                            required
                        /> Guest
                    </label>

                    <label style={{marginLeft:"5px"}}>
                        <input 
                            type="radio"  
                            name="role"
                            value="Host"
                            onClick={changeHandler}
                            required
                        /> Host
                    </label>
                </div>	

                <div className="form-group">	
                    <label className="font-size">Profile Image</label>	
                    <input 	
                        type="file" className="form-control" 	
                        className="form-control" 	
                        placeholder="Upload image"	
                        name="image"
                        onChange={changeHandler}
                    />	
                </div>	

                <div style={{fontSize:"16px",color:"red"}}>
                    <span>{error}</span>
                </div>

                <div style={{fontSize:"16px",color:"green"}}>
                    <span>{success}</span>
                </div>

                <button type="submit" className="btn btn-secondary btn-block"
                    onClick= {submitHandler}>Sign Up
                </button>

                <p className="forgot-password text-right">
                    Already registered? <Link to='/login'  style={{color:"dodgerblue"}}>sign in</Link>
                </p>
            </form>
        </div>
        </div>
                
    );
}

export default Signup;