import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserReservations, deleteReservation } from "../../managers/reservationManager";
import { formatTime, formatDate } from "../../managers/generalManager";
import { Button, Card, CardContent, Grid, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MyReservations from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/reservations/MyReservations.png"
import "./reservations.css";

export const UserReservations = ({ token }) => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getUserReservations({ token }).then((data) => {
            setReservations(data);
        });
    }, [token]);

    const handleDelete = (reservationId) => {
        const confirmed = window.confirm("Are you sure you want to delete this reservation?");

        if (confirmed) {
            deleteReservation({ reservationId }).then(() => {
                getUserReservations({ token }).then((data) => {
                    setReservations(data);
                });
            });
        }
    };

    const confirmDelete = () => {
        if (selectedReservation) {
            deleteReservation({ token, reservationId: selectedReservation }).then(() => {
                getUserReservations({ token }).then((data) => {
                    setReservations(data);
                });
                setSelectedReservation(null);
                setShowConfirmation(false);
            });
        }
    };

    const cancelDelete = () => {
        setSelectedReservation(null);
        setShowConfirmation(false);
    };

    return (
        <div className="reservations-container custom-bg-color">
            <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
                <img src={MyReservations} alt="My Reservations Logo" style={{ width: "400px", height: "auto" }} />
            </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate("/reservations/create");
                    }}
                    style={{ marginTop: "40px", marginBottom: "40px" }}
                >
                    Make a Reservation
                </Button>
            </div>
            <Grid container spacing={2}>
                {reservations.map((reservation) => (
                    <Grid item xs={12} sm={6} md={4} key={`reservation--${reservation.id}`}>
                        <Card className="reservation-card" style={{ height: "100%" }}>
                            <img
                                src={reservation.reservation_image}
                                alt={reservation.reservation_location_name}
                                style={{ height: "200px", objectFit: "cover", width: "100%" }}
                            />
                            <CardContent>
                                <Typography variant="h6">{reservation.reservation_location_name}</Typography>
                                <Typography variant="body2">Reservation Date: {formatDate(reservation.date)}</Typography>
                                <Typography variant="body2">Reservation Time: {formatTime(reservation.time)}</Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(reservation.id)}
                                    style={{ marginTop: "10px" }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {showConfirmation && (
                <div className="confirmation-modal">
                    <Typography variant="body1">Are you sure you want to delete this reservation?</Typography>
                    <Button variant="contained" color="error" onClick={confirmDelete}>
                        Yes
                    </Button>
                    <Button variant="contained" onClick={cancelDelete}>
                        No
                    </Button>
                </div>
            )}
        </div>
    );
};





