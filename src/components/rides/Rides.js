import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRideDetails } from "../../managers/rideManager";
import { Button, TextField } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "./ride.css";

export const AllRides = () => {
    const [rides, setRides] = useState([]);
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
        getAllRideDetails().then((data) => {
            setRides(data);
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

    const filteredRides = rides.filter((ride) =>
        ride.ride_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rides-container">
            <h2 className="ride-name">All Rides</h2>
            <TextField
                label="Search for rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined" 
                fullWidth 
                className="search-input"
            />
            <div className="rides-list">
                {filteredRides.map((ride) => (
                    <div
                        className="ride-card"
                        key={`ride--${ride.id}`}
                        onClick={() => {
                            navigate(`/rides/${ride.id}`);
                        }}
                    >
                        <img src={ride.ride_image} alt={ride.ride_name} className="ride-picture" />
                        <div className="ride-name">{ride.ride_name}</div>
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