import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllRideDetails } from "../../managers/rideManager";
import "./ride.css"; // Import your CSS file for styling

export const AllRides = () => {
    const [rides, setRides] = useState([]);
    const { rideId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllRideDetails().then((data) => {
            setRides(data);
        });
    }, []);

    return (
        <div className="rides-container"> 
            <h2>All Rides</h2>
            <div className="rides-list">
                {rides.map((ride) => (
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
}