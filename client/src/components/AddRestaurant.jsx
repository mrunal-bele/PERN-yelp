import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import Restaurant from "../apis/Restaurant"
import { RestaurantContext } from "../context/RestaurantContext"

const AddRestaurant = () => {
    const [name, setName] = useState("")
    const [location, setLocation] = useState("");
    const [priceRange, setpriceRange] = useState("Price Range");
    const { addRestaurants } = useContext(RestaurantContext)
    const history = useHistory()
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await Restaurant.post("/", {
                name,
                location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant)
            setName("")
            setLocation("")
            setpriceRange("Price Range")
            history.push("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mb-4 mt-4">
            <form action="">
                <h1 className="text-center display-5 mt-5">ADD RESTAURANT</h1>
                <div className="row row-cols-1 mb-2 mt-5 d-flex justify-content-center">
                    <div className="col" style={{ maxWidth: "25rem" }}>
                        <input type="text" placeholder="Name" className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="col" style={{ maxWidth: "25rem" }}>
                        <input type="text" placeholder="Location" className="form-control mb-2" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div className="col" style={{ maxWidth: "25rem" }}>
                        <select className="form-select mb-2" value={priceRange} onChange={e => setpriceRange(e.target.value)}>
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <div  style={{ maxWidth: "10rem" }}>
                        <button type="submit" onClick={handleClick} className="btn btn-success">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddRestaurant
