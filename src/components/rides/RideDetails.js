import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRideDetails } from "../../managers/rideManager";
import { formatTime } from "../../managers/generalManager";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "./ride.css";

const cardStyle = {
    marginTop: "10px",
    maxWidth: "600px",
    margin: "auto",
};

export const RideDetails = () => {
    const { rideId } = useParams();
    const [ride, setRide] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getSingleRideDetails(rideId).then((data) => {
            setRide(data);
        });
    }, [rideId]);

    return (
        <div className="ride-container">
            <Card className="ride-details-card" style={cardStyle}>
                <CardContent>
                    <img
                        src={ride.ride_image}
                        alt={ride.ride_name}
                        className="ride-picture"
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                    <Typography variant="h4" className="ride-name" align="center">
                        {ride.ride_name}
                    </Typography>
                    <Typography variant="body1" className="ride-description" align="center">
                        {ride.ride_description}
                    </Typography>
                    <Typography variant="body2" className="ride-wait-time" align="center">
                        The current wait time for this ride is {ride.expected_wait_time} minutes.
                    </Typography>
                    <Typography variant="body2" className="ride-open" align="center">
                        This ride opens at {formatTime(ride.ride_open)}
                    </Typography>
                    <Typography variant="body2" className="ride-close" align="center">
                        This ride closes at {formatTime(ride.ride_close)}
                    </Typography>
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Button
                            variant="contained"
                            className="button"
                            onClick={() => {
                                navigate(`/reservations/create?locationId=${ride.location.id}`);
                            }}
                        >
                            Make a reservation:
                        </Button>
                        <Button
                            variant="contained"
                            className="button"
                            onClick={() => {
                                navigate("/rides");
                            }}
                        >
                            Back
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
};




