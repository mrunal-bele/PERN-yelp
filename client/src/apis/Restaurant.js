import axios from 'axios';

export default axios.create({
    baseURL: "https://cloverfield-lane.herokuapp.com/api/v1/restaurants"
})