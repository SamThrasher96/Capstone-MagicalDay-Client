import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurantDetails } from "../../managers/restaurantManager"; 
import "./restaurant.css";

export const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurantDetails().then((data) => {
            setRestaurants(data);
        });
    }, []);

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="restaurants-container">
            <h2>All Restaurants</h2>
            <input
                type="text"
                placeholder="Search for rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="restaurants-list">
                {filteredRestaurants.map((restaurant) => (
                    <div
                        className="restaurant-card"
                        key={`restaurant--${restaurant.id}`}
                        onClick={() => {
                            navigate(`/restaurants/${restaurant.id}`);
                        }}
                    >
                        <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} className="restaurant-picture" />
                        <div className="restaurant-name">{restaurant.restaurant_name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}