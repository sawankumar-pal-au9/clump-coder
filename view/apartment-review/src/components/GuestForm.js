import React, { useReducer } from 'react';
import StarRating from './StarRating';
import './GuestForm.css';
import Axios from 'axios';

const user = JSON.parse(sessionStorage.getItem('userDetails'));
const initialState = {
    guest_id: user?user._id:'',
    host_id: '',
    guestName: user?user.name:'',
    hospitalityRating: '',
    cleanlinessRating: '',
    communicationRating: '',
    locationRating: '',
    valueRating: '',
    overallRating: '',
    publicReview: '',
    PrivateReview: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'HOSTID':
            return { ...state, host_id: action.payload };

        case 'HOSPITALITY':
            return { ...state, hospitalityRating: action.payload };

        case 'CLEANLINESS':
            return { ...state, cleanlinessRating: action.payload };
        
        case 'COMMUNICATION':
            return { ...state, communicationRating: action.payload };

        case 'LOCATION':
            return { ...state, locationRating: action.payload };

        case 'VALUE':
            return { ...state, valueRating: action.payload };

        case 'OVERALL':
            return { ...state, overallRating: action.payload };

        case 'RECOMMEND':
            return { ...state, recommend: action.payload };

        case 'PUBLICREVIEW':
            return { ...state, publicReview: action.payload };

        case 'PRIVATEREVIEW':
            return { ...state, PrivateReview: action.payload };

        default:
            return state
    }
}

const HostForm = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    if(!state.host_id) {
        dispatch({type:"HOSTID", payload: props.match.params.id});
    };
    console.log(state)

    const renderSubmit = (e) => {
        e.preventDefault();
        Axios.post('/guestReview/add', state)
        .then(res => {
            alert("Your response added successfully");
            props.history.push('/');
        })
    };

    return ( 
        <div className="container wraper">
            <center>
                <h3><b><u>Guest Review</u></b></h3>
            </center>
            <br/>

            <div className="form-wraper">
                <form className="form-group" encType="multipart/form-data">
                    <h4><b>Tell us about your experience with (Host Name)</b></h4>

                    <ol>
                        <li>
                            Cleanliness
                            <div className="star">
                                <StarRating rating={state.cleanlinessRating} 
                                    callback={(value) => dispatch({type:'CLEANLINESS', payload:value})}
                                />
                            </div>
                        </li>

                        <li>
                            Hopitality
                            <div className="star">
                                <StarRating rating={state.hospitalityRating} 
                                    callback={(value) => dispatch({type:'HOSPITALITY', payload:value})}
                                />
                            </div>
                        </li>

                        <li>
                            Communication
                            <div className="star">
                                <StarRating rating={state.communicationRating} 
                                    callback={(value) => dispatch({type:'COMMUNICATION', payload:value})}
                                />
                            </div>
                        </li>

                        <li>
                            Location
                            <div className="star">
                                <StarRating rating={state.locationRating} 
                                    callback={(value) => dispatch({type:'LOCATION', payload:value})}
                                />
                            </div>
                        </li>

                        <li>
                            Value
                            <div className="star">
                                <StarRating rating={state.valueRating} 
                                    callback={(value) => dispatch({type:'VALUE', payload:value})}
                                />
                            </div>
                        </li>
                    </ol>

                    <p><b>Upload a short video of exactly how you left the apartment</b></p>
                    <input type="file" name="short video"></input>
                    <button onClick={(e) => e.preventDefault()} className="btn btn-info upload-btn">
                        Upload
                    </button>
                    
                    <div className="overall">
                        <p><b>Overall rating</b></p>
                        <div className="star">
                            <StarRating rating={state.overallRating} 
                                callback={(value) => dispatch({type:'OVERALL', payload:value})}
                            />
                        </div>
                    </div>

                    <div className="review">
                        <p>Write a public review</p>
                        <textarea className="form-control" rows="4" cols="50"
                            onChange={(e) => dispatch({type:'PUBLICREVIEW', payload:e.target.value})}
                        />
                    </div>

                    <div className="prvt-review">
                        <p>Write a private note to (Host Name)?</p>
                        <textarea className="form-control" rows="4" cols="50"
                            onChange={(e) => dispatch({type:'PRIVATEREVIEW', payload:e.target.value})}
                        />
                    </div>

                    <button onClick={renderSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default HostForm;