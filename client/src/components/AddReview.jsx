import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import Restaurant from '../apis/Restaurant';
import { RestaurantContext } from '../context/RestaurantContext'

const AddReview = () => {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [rating, setRating] = useState("Rating");
    const [review, setReview] = useState("");
    const history = useHistory()
    const { addReviews } = useContext(RestaurantContext)

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const response = await Restaurant.post(`/${id}/addReview`, {
                name,
                rating,
                review
            })
            console.log(response)
            addReviews(response.data.data.review)
            setName("")
            setRating("")
            setReview("")
            history.push("/")
            history.push(`/restaurants/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
        <h1 className="text-center display-5 mt-5">ADD A REVIEW</h1>
        <div className="row row-cols-2 mb-2 mt-3 d-flex justify-content-center">
            <div className="col" style={{ maxWidth: "100%" }}>
                <label htmlFor="name" className="form-label">NAME</label>
                <input type="text" className="form-control mb-2" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col" style={{ maxWidth: "100%" }}>
                <label htmlFor="rate" className="form-label">RATING</label>
                <select className="form-select mb-2" id="rate" value={rating} onChange={(e) => setRating(e.target.value)} required>
                    <option disabled>Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className="col">
                <label htmlFor="review" className="form-label">REVIEW</label>
                <textarea className="form-control" placeholder="Write a review" id="review" rows="3" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
        </div>
        <div className="col text-center">
            <button className="btn btn-dark mt-2" onClick={handleClick} type="submit">Add</button>
        </div>
    </>
    )
}

export default AddReview
