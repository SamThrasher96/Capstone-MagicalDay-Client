import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRestaurantDetails } from "../../managers/restaurantManager";
import { formatTime } from "../../managers/generalManager";
import { getMenuItemByLocationId } from "../../managers/menuManager";
import "./restaurant.css";

export const RestaurantDetails = ({ token }) => {
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState({});
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSingleRestaurantDetails(restaurantId).then((data) => {
            setRestaurant(data);
        });
    }, [restaurantId]);

    useEffect(() => {
        if (restaurant.location && restaurant.location.id) {
            getMenuItemByLocationId(restaurant.location.id).then((data) => {
                setMenuItems(data);
            });
        }
    }, [restaurant]);

    return (
        <div className="restaurant-container">
            <h2>Restaurant Details</h2>
            <div className="restaurant-card" key={`restaurant--${restaurant.id}`}>
                <img src={restaurant.restaurant_image} alt={restaurant.restaurant_name} className="restaurant-picture" />
                <div className="restaurant-name">{restaurant.restaurant_name}</div>
                <div className="restaurant-description">{restaurant.restaurant_description}</div>
                <div className="restaurant-open"> This restaurant opens at {formatTime(restaurant.restaurant_open)}</div>
                <div className="restaurant-close"> This restaurant closes at {formatTime(restaurant.restaurant_close)}</div>
            </div>
            <button className="button" onClick={() => {
                navigate("/restaurants");
            }}>Back</button>
            <button className="button" onClick={() => {
                    navigate(`/reservations/create?locationId=${restaurant.location.id}`);
                }}>Make a reservation!</button>
            <h2>Menu</h2>
            <div className="menu-list">
                {menuItems.map((menuItem) => (
                    <div className="menu-card" key={`menu--${menuItem.id}`}>
                        <img src={menuItem.image} alt={menuItem.menu_name} className="menu-picture" />
                        <div className="menu-name">{menuItem.name}</div>
                        <div className="menu-price">{menuItem.price}</div>
                        <div className="menu-description">{menuItem.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}