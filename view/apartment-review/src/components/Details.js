import React, {useState, useEffect} from 'react';
import './Details.css';
import Apartment1 from '../images/apart1.jpg';
import Apartment2 from '../images/apart2.jpg';
import Apartment3 from '../images/apart3.jpg';
import Guest from '../images/guest.jpg';
import Host from '../images/host.jpg';
import Axios from 'axios';

const Details = (props) => {
    const users = JSON.parse(sessionStorage.getItem('users'));
    const filteredUser = users.filter(user => {
        return user._id === props.match.params.id
    })

    const [reviews, setReviews] = useState();

    useEffect(() => {
        Axios.get(`/guestReview/${props.match.params.id}`)
        .then(res => {
            setReviews(res.data);
        })
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="img-gallery row">
                        <div className="col-sm-7 apart1">
                            <img src={Apartment1} alt="apart1-img"/>
                        </div>

                        <div className="col-sm-5 apart2">
                            <img src={Apartment2} alt="apart2-img"/>
                            <img src={Apartment3} alt="apart3-img"/>
                        </div>
                    </div>

                    <h4><b>Landmark</b></h4>
                    <div>
                        <b>Bandra, New Way Street, Mumbai</b>
                        <p>1 guest . 1 bedroom . 1 bed . 1 bathroom</p>
                    </div>

                    <div className="about">
                        <h4><b>About Apartment</b></h4>
                        <p>The landmark is available for stay</p>

                        <h4><b>Aminities</b></h4>
                        <div className="aminities">
                            <ul>
                                <li>Essentials</li>
                                <li>Kitchen</li>
                                <li>Air conditioner</li>
                            </ul>

                            <ul>
                                <li>Laptop friendly work space</li>
                                <li>Hot water</li>
                                <li>Elevator</li>
                            </ul>
                        </div>

                        <h4><b>Some House Rules</b></h4>
                        <div className="rules">
                            <ul>
                                <li>Pets Allowed</li>
                            </ul>

                            <ul>
                                <li>Smoking Allowed</li>
                            </ul>
                        </div>

                        <h4><b>Reviews</b></h4>
                        <div className="reviews">
                            {
                                reviews && reviews.length > 0 && 
                                reviews.map((review, idx) => {
                                    console.log(review)
                                    return (
                                        <div className="review-cont" key={idx}>
                                            <div className="col-md-3">
                                                <img src={Guest} alt="guest-img"/>
                                            </div>

                                            <div className="col-md-9">
                                                <h4>{review.guestName}</h4>
                                                <p>{review.publicReview}</p>
                                                <p className="post-date">{`Posted: ${review.date}`}</p>

                                                {
                                                    sessionStorage.getItem('userDetails') && 
                                                    JSON.parse(sessionStorage.getItem('userDetails')).role === 'Host' && 
                                                    <button onClick={() => props.history.push(`/hostRvw/${props.match.params.id}`)} className="btn btn-default">
                                                        Add Review
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {
                                (!reviews || reviews.length === 0) &&
                                <p>No reviews yet!</p>
                            }

                            {
                                sessionStorage.getItem('userDetails') && 
                                JSON.parse(sessionStorage.getItem('userDetails')).role === 'Guest' && 
                                <button onClick={() => props.history.push(`/guestRvw/${props.match.params.id}`)} 
                                className="btn btn-default" style={{width: "100px"}}>Add Review</button>
                            }
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="host">
                        <p>Rs.1000/night</p>
                        <div className="host-body">
                            <img src={filteredUser[0].imageUrl?filteredUser[0].imageUrl:'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'} alt="host-img"/>
                            <h4><b>{filteredUser[0].name}</b></h4>
                            <span>({filteredUser[0].role})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details;