import React, { useEffect, useState } from "react";
import { createReservation } from "../../managers/reservationManager";
import { getAllLocations } from "../../managers/locationManager";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography, Grid, Select, MenuItem } from "@mui/material";
import wdwEaridescent from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/wdw earidescent.jpeg";
import NightTimeCastle from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/Night time castle.jpeg";
import "./reservations.css";

export const CreateUserReservation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialLocationId = queryParams.get("locationId");

    const [reservation, updateReservation] = useState({
        location: initialLocationId ? parseInt(initialLocationId) : 0,
        date: '',
        time: ''
    });

    const [allLocations, setLocations] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        getAllLocations().then((locations) => {
            setLocations(locations);
        });
    }, []);

    const handleSaveButtonClick = async (event) => {
        event.preventDefault();
        const location = allLocations.find((loc) => loc.id === reservation.location);

        const { opening_time, closing_time } = location;

        const selectedTime = new Date(reservation.date + " " + reservation.time);
        const openingTime = new Date(reservation.date + " " + opening_time);
        const closingTime = new Date(reservation.date + " " + closing_time);

        const currentDate = new Date().toISOString().split('T')[0];

        if (reservation.date < currentDate) {
            window.alert("Please select today's date or a future date.");
            return;
        }

        if (selectedTime < openingTime || selectedTime > closingTime) {
            window.alert("We're sorry! The location you selected is closed at that time. Please select a different time.");
            return;
        }

        const finishedReservation = { ...reservation };
        const createdReservation = await createReservation(finishedReservation);
        setSuccessMessage("Reservation saved successfully!");
        navigate("/reservations");
    };

    const handleLocationChange = (event) => {
        const locationId = event.target.value;
        updateReservation({
            ...reservation,
            location: parseInt(locationId),
        });
    };

    const handleDateChange = (event) => {
        const dateValue = event.target.value;
        updateReservation({
            ...reservation,
            date: dateValue,
        });
    };

    const handleTimeChange = (event) => {
        const timeValue = event.target.value;
        updateReservation({
            ...reservation,
            time: timeValue,
        });
    };

    return (
        <Grid container>
            <Grid item xs={6}>
                <img
                    src={NightTimeCastle}
                    alt="Castle Image"
                    style={{
                        width: "100%",
                        objectFit: "cover",
                        height: "100vh",
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        position: "relative",
                    }}
                >
                    <img
                        src={wdwEaridescent}
                        alt="Earidescent Image"
                        style={{
                            width: "100%",
                            objectFit: "cover",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                    <Card
                        style={{
                            width: "70%",
                            backgroundColor: "rgba(245, 229, 221, 0.8)",
                            border: "1px solid #ccc",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            zIndex: 1,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body1"
                                style={{
                                    fontSize: "18px",
                                    color: "#777",
                                    marginBottom: "20px",
                                    textAlign: "center",
                                }}
                            >
                                Create a Reservation
                            </Typography>

                            <Select
                                label="Select Location"
                                fullWidth
                                onChange={handleLocationChange}
                                value={reservation.location}
                                style={{ marginBottom: "20px" }}
                            >
                                <MenuItem value={0}>Select a location</MenuItem>
                                {allLocations.map((location) => (
                                    <MenuItem key={location.id} value={location.id}>
                                        {location.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <TextField
                                type="date"
                                fullWidth
                                onChange={handleDateChange}
                                value={reservation.date}
                                style={{ marginBottom: "20px" }}
                            />

                            <TextField
                                type="time"
                                fullWidth
                                onChange={handleTimeChange}
                                value={reservation.time}
                                style={{ marginBottom: "20px" }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleSaveButtonClick}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    backgroundColor: "#2C7AAF",
                                    color: "#ffffff",
                                }}
                            >
                                Save Reservation
                            </Button>

                            {successMessage && (
                                <p className="success-message">{successMessage}</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    );
};