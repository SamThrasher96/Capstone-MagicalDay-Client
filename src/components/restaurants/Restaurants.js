import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRestaurantDetails } from "../../managers/restaurantManager";
import { Button, TextField } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "./restaurant.css";

export const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        getAllRestaurantDetails().then((data) => {
            setRestaurants(data);
        });

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="restaurants-container">
            <h2 className="restaurant-name">All Restaurants</h2>
            <TextField
                label="Search for restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                fullWidth
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

            {showScrollButton && (
                <Button
                    className="scroll-to-top"
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "40px",
                        color: "#fff",
                        borderRadius: "8px",
                        width: "50px",
                        height: "50px",
                        zIndex: "99",
                    }}
                    startIcon={
                        <KeyboardDoubleArrowUpIcon
                            style={{ fontSize: 50 }}
                        />
                    }
                >
                </Button>
            )}
        </div>
    );
};
