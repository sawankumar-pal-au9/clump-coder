import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Apartment1 from '../images/apart1.jpg';
import StarRating from './StarRating';
import './Home.css';

const Home = (props) => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        Axios.get('/users')
        .then(res => {
            sessionStorage.setItem('users', JSON.stringify(res.data));
            const filteredData = res.data.filter(user => {
                return user.role === 'Host';
            })

            setUsers(filteredData);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="container">
            <center>
                <h3><b>Available Apartments</b></h3>
            </center>

            <hr/>

            <div className="apart-cont">
                {
                    users && users.length > 0 && 
                    users.map((user, idx) => {

                        return (
                            <div className="card" key={idx}>
                                <div className="image" onClick={() => props.history.push(`/details/${user._id}`)}>
                                    <img src={Apartment1} alt="apart-img"/>
                                </div>
                                <div className="card-body">
                                    <h4><b>{`Apartment${idx + 1}`}</b></h4>
                                    <p>Rs.1000/night</p>
                                    <StarRating rating={4} callback={()=>{}}/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;