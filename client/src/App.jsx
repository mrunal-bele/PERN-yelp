import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home';
import RestaurantsPage from './RestaurantsPage';
import UpdatePage from './UpdatePage';
import "./App.css"
import {RestaurantContextProvider} from "./context/RestaurantContext"

const App = () => {
    return <RestaurantContextProvider>
        <div className="container">
            <Router >
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/restaurants/:id" component={RestaurantsPage} />
                    <Route exact path="/restaurants/:id/update" component={UpdatePage} />
                </Switch>
            </Router>
        </div>
    </RestaurantContextProvider>
}

export default App;