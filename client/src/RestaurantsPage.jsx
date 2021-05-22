import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import Restaurant from "./apis/Restaurant"
import AddReview from './components/AddReview'
import Reviews from './components/Reviews'
import StarRating from './components/StarRating'
import { RestaurantContext } from "./context/RestaurantContext"

const RestaurantsPage = () => {
    const { id } = useParams()
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext)
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        const f = async () => {
            try {
                const response = await Restaurant.get(`/${id}`)
                setSelectedRestaurant(response.data.data)
                setLoading(false)
            }
            catch (error) {
                console.error(error)
            }
        }

        f();
    }, [])

    const render = () => {

        if (loading) return <h1 className="text-center">...LOL</h1>
        else {
            var avg;
            var sum = 0;
            for(var i = 0;i<selectedRestaurant.reviews.length;i++){
                sum+=selectedRestaurant.reviews[i].rating;
            }
            avg = sum/selectedRestaurant.reviews.length;

            return (
            <div>
                {
                    <>
                        <h1 className="text-center display-2 mt-5 mb-5">{selectedRestaurant.restaurant.name.toUpperCase()} RESTAURANT REVIEWS</h1>
                        <div className="text-center"><StarRating rating={Number(avg) || 0} />{`(${selectedRestaurant.reviews.length})`}</div>
                        <div className="mt-3">
                            <Reviews reviews={selectedRestaurant.reviews} />
                            <AddReview />
                        </div>
                    </>
                }
            </div>
        )}
    }
    return render()
}

export default RestaurantsPage
