import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserReservations } from "../../managers/reservationManager";
import "./reservations.css";

export const UserReservations = ({ token }) => {
    const [reservations, setReservations] = useState([]);
    const { reservationId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserReservations({ token }).then((data) => {
            setReservations(data);
        });
    } ,[token]);

    return (
        <div className="reservations-container">
            <h2>Your Reservations</h2>
            <div className="reservations-list">
                {reservations.map((reservation) => (
                    <div
                        className="reservation-card"
                        key={`reservation--${reservation.id}`}
                        onClick={() => {
                            navigate(`/reservations/${reservation.id}`);
                        }}
                    >
                    <img src={reservation.reservation_image} alt={reservation.reservation_location_name} className="reservation-image" />
                    <div className="reservation-location">Your reservation is at {reservation.reservation_location_name}</div>
                    <div className="reservation-date">Reservation Date: {reservation.date}</div>
                    <div className="reservation-time">Reservation time: {reservation.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}