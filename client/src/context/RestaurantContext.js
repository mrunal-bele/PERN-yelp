import React, { createContext, useState } from 'react'

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState([])
    const [reviews,setReviews] = useState([])

    const addRestaurants = (restaurant)=>{
        setRestaurants([...restaurants,restaurant])
    }
    const addReviews = (review)=>{
        setReviews([...reviews,review])
    }

    return (
        <RestaurantContext.Provider value={{restaurants, setRestaurants, addRestaurants, addReviews, selectedRestaurant, setSelectedRestaurant}}> 
            {props.children}
        </RestaurantContext.Provider>
    )
}


//Benefit of storing data within context api rather than local state is that all of the components have
//access to data and we dont have to use props.