import React from 'react'
import StarRating from './StarRating'

const Reviews = ({ reviews }) => {

    return (
        <>
            <div className="row row-cols-1 mb-5 mt-5 d-flex justify-content-center">
                {reviews.map((review) => {
                    return (
                        <div key={review.id} className="card text-white bg-dark mb-3 mr-4" style={{ maxWidth: "20rem", margin: "2%" }}>
                            <div className="card-header d-flex justify-content-between">
                                <span className="text-uppercase">{review.name}</span>
                                <span>{<StarRating rating={review.rating} />}</span>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{review.review}</p>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </>
    )
}

export default Reviews
