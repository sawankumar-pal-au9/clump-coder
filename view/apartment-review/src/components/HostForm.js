import React, { useReducer } from 'react';
import StarRating from './StarRating';
import './HostForm.css';
import Axios from 'axios';

const user = JSON.parse(sessionStorage.getItem('userDetails'));

const initialState = {
    host_id: user?user._id:'',
    guest_id: '',
    hostName: user?user.name:'',
    adherenceRating: '',
    cleanlinessRating: '',
    communicationRating: '',
    overallRating: '',
    recommend: '',
    publicReview: '',
    PrivateReview: ''
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'GUESTID':
            return { ...state, guest_id: action.payload };

        case 'ADHERENCE':
            return { ...state, adherenceRating: action.payload };

        case 'CLEANLINESS':
            return { ...state, cleanlinessRating: action.payload };
        
        case 'COMMUNICATION':
            return { ...state, communicationRating: action.payload };

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
    if(!state.guest_id){
        dispatch({type:"GUESTID", payload: props.match.params.id});
    };

    const renderSubmit = (e) => {
        e.preventDefault();
        Axios.post('/hostReview/add', state)
        .then(res => {
            alert("Your response added successfully");
            props.history.push('/');
        })
    };

    return ( 
        <div className="container wraper">
            <center>
                <h3><b><u>Host Review</u></b></h3>
            </center>
            <br/>

            <div className="form-wraper">
                <form className="form-group" encType="multipart/form-data">
                    <h4><b>Tell us about your experience with (Guest Name)</b></h4>

                    <ol>
                        <li>
                            Adherence to House Rules
                            <div className="star">
                                <StarRating rating={state.adherenceRating} 
                                    callback={(value) => dispatch({type:'ADHERENCE', payload:value})}
                                />
                            </div>
                        </li>

                        <li>
                            Cleanliness
                            <div className="star">
                                <StarRating rating={state.cleanlinessRating} 
                                    callback={(value) => dispatch({type:'CLEANLINESS', payload:value})}
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
                    </ol>

                    <p><b>Upload a short video of how (guest name) left the apartment</b></p>
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

                    <div className="recommend">
                        <p>Would you recommend these guests?</p>
                        <div>
                            <label>
                                <input onClick={(e) => dispatch({type:'RECOMMEND', payload:e.target.value})} 
                                    type="radio" name="recommend" value="yes"
                                /> Yes !
                            </label>
                        </div>

                        <div>
                            <label>
                                <input onClick={(e) => dispatch({type:'RECOMMEND', payload:e.target.value})}
                                    type="radio" name="recommend" value="no"
                                /> No !
                            </label>
                        </div>
                    </div>

                    <div className="review">
                        <p>Write a public review</p>
                        <textarea className="form-control" rows="4" cols="50"
                            onChange={(e) => dispatch({type:'PUBLICREVIEW', payload:e.target.value})}
                        />
                    </div>

                    <div className="prvt-review">
                        <p>Do you want to let us know a private feedback about your experience with (Guest Name)?</p>
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