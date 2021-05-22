import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router';
import Restaurant from "../apis/Restaurant"
//import {RestaurantContext} from "../context/RestaurantContext"

const UpdateRestaurant = () => {
    const {id} = useParams()
    const [name,setName] = useState("")
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    //const {restaurants} = useContext(RestaurantContext)
    
    let history = useHistory()

    useEffect(()=>{
        const f = async()=>{
            const response = await Restaurant.get(`/${id}`)
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        }
        f();
    },[])

    const handleClick = async (e)=>{
        e.preventDefault()
        try {
            await Restaurant.put(`/${id}`,{
                name,
                location,
                price_range: priceRange
            })
            history.push("/")
        } catch (error) {
            
        }
    }
    return (
        <div>
            <h1 className="text-center font-weight-light display-1 mb-5">UPDATE</h1>
                <div className="mb-3 mt-4">
                    <label htmlFor="name" className="form-label">NAME</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">LOCATION</label>
                    <input type="text" className="form-control" id="location" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pricerange" className="form-label">PRICE RANGE</label>
                    <select className="form-select" id="pricerange" value={priceRange} onChange={e=>setPriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleClick}>Submit</button>
        </div>
    )
}
export default UpdateRestaurant
