import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRideDetails } from "../../managers/rideManager";
import "./ride.css";

export const AllRides = () => {
    const [rides, setRides] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllRideDetails().then((data) => {
            setRides(data);
        });
    }, []);

    const filteredRides = rides.filter((ride) =>
        ride.ride_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rides-container">
            <h2>All Rides</h2>
            <input
                type="text"
                placeholder="Search for rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        </div>
    );
};