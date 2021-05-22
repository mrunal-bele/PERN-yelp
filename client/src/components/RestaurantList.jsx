import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router';
import Restaurant from "../apis/Restaurant"
import { RestaurantContext } from "../context/RestaurantContext"
import StarRating from './StarRating';

const RestaurantList = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);
    let history = useHistory()
    useEffect(() => {
        const f = async () => {
            try {
                const response = await Restaurant.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {
                console.error(error);
            }
        }
        f();
    }, [])
    const handleUpdate = async (e, id) => {
        e.stopPropagation()                 //stops from taking us to details page on clicking modify delete button
        try {
            history.push(`/restaurants/${id}/update`)
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()                 //stops from taking us to details page on clicking modify delete button
        try {
            await Restaurant.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        } catch (error) {
            console.error(error)
        }
    }

    const handleClick = async (id) => {
        history.push(`/restaurants/${id}`)
    }

    return (

        <div className="row row-cols-1 mt-5 d-flex justify-content-center">
            {/* <table className="table table-dark table-hover">
            <thead>
                <tr className="table-primary">
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants.map(restaurant => {
                    return (
                        <tr key={restaurant.id} onClick={() => handleClick(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td><StarRating rating={restaurant.average_rating || 0} /></td>
                            <td><button className="btn btn-secondary" onClick={(e) => handleUpdate(e, restaurant.id)}>Modify</button></td>
                            <td><button className="btn btn-danger" onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button></td>
                        </tr>)
                })}

            </tbody>
            </table> */}
            {restaurants.map(restaurant => {
                return (<div class="col card text-white bg-dark mb-3" style={{ maxWidth: "23rem", marginRight: "2%" }} key={restaurant.id} onClick={() => handleClick(restaurant.id)}>
                    <h2 class="card-header text-center">{restaurant.name.toUpperCase()}</h2>
                    <div class="card-body">
                        <h5 class="card-title mb-3">Location: {restaurant.location}</h5>
                        <h5 class="card-title mb-3">Price Range: {"₹".repeat(restaurant.price_range)}</h5>
                        <h5 class="card-title mb-3">Rating: <StarRating rating={restaurant.average_rating || 0} /></h5>
                        <button className="btn btn-secondary" onClick={(e) => handleUpdate(e, restaurant.id)}>Modify</button>
                        <button className="btn btn-danger float-end" onClick={(e) => handleDelete(e, restaurant.id)}>Delete</button>
                    </div>
                </div>
                )
            })
            }
        </div>
    )
}

export default RestaurantList
