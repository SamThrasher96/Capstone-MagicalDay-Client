import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRestaurantDetails } from "../../managers/restaurantManager";
import "./restaurant.css";

export const RestaurantDetails = ({ token }) => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getSingleRestaurantDetails(restaurantId).then((data) => {
            setRestaurant(data);
        });
    } ,[restaurantId]);

    return (
        <div className="restaurant-container">
            <h2>Restaurant Details</h2>
            <div className="restaurant-card" key={`restaurant--${restaurant.id}`}>
                <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} className="restaurant-picture" />
                <div className="restaurant-name">{restaurant.restaurant_name}</div>
                <div className="restaurant-description">{restaurant.restaurant_description}</div>
                <div className="restaurant-open"> This restaurant opens at {restaurant.restaurant_open}</div>
                <div className="restaurant-close"> This restaurant closes at {restaurant.restaurant_close}</div>
            </div>
            <button className="button" onClick={() => {
                navigate("/restaurants");
            }}>Back</button>
        </div>
    );
}