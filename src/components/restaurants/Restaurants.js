import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRestaurantDetails } from "../../managers/restaurantManager"; 
import "./restaurant.css";

export const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { restaurantId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurantDetails().then((data) => {
            setRestaurants(data);
        });
    }, []);

    return (
        <div className="restaurants-container">
            <h2>All Restaurants</h2>
            <div className="restaurants-list">
                {restaurants.map((restaurant) => (
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