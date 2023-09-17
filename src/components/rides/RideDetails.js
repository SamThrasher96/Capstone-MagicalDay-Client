import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRideDetails } from "../../managers/rideManager";
import "./ride.css";

export const RideDetails = ({ token }) => {
    const { rideId } = useParams();
    const [ride, setRide] = useState({});
    const navigate = useNavigate();

    console.log(rideId)

    useEffect(() => {
        getSingleRideDetails(rideId).then((data) => {
            setRide(data);
        });
    } ,[rideId]);

    return (
        <div className="ride-container">
            <h2>Ride Details</h2>
            <div className="ride-card" key={`ride--${ride.id}`}>
                <img src={ride.ride_image} alt={ride.ride_name} className="ride-picture" />
                <div className="ride-name">{ride.ride_name}</div>
                <div className="ride-description">{ride.ride_description}</div>
                <div className="ride-open"> This ride opens at {ride.ride_open}</div>
                <div className="ride-close"> This ride closes at {ride.ride_close}</div>
            </div>
            <button className="button" onClick={() => {
                navigate("/rides");
            }}>Back</button>
        </div>
    );
}