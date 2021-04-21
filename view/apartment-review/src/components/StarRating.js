import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, callback }) => {

    const [hover, setHover] = useState('');

    return (
        <div>
            {
                [ ...Array(5) ].map((star,idx) => {
                    const ratingValue = idx + 1;
                    return (
                        <label key={idx}>
                            <input className="starInput" 
                                type="radio" 
                                value={ratingValue}
                                onClick={() => callback(ratingValue)}
                            />

                            <i className="fa fa-star star" 
                                style={{color:(ratingValue <= (hover || rating))?"#FFCC00":"grey"}}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover('')}
                            ></i>
                        </label>
                    )
                })
            }
        </div>
    )
}

export default StarRating;