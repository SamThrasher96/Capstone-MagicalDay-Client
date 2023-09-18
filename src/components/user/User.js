import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../managers/userManager";
import "./user.css";

export const User = ({ token }) => {
    const [guests, setGuest] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUser(token).then((data) => { setGuest(data); });
    }, [token]);


    return (
        <div className="user-container">
            <h2>User Profile</h2>
            <div className="user-list">
                {guests.map((guest) => (
                    <div
                        className="user-card"
                        key={`user--${guest.id}`}
                    >
                        <img src={guest.profile_picture} alt={guest.full_name} className="profile-picture" />
                        <h2>Name: {guest.full_name}</h2>
                        <h2>Email: {guest.email}</h2>
                        <button className="button" onClick={() => {
                            navigate("/user/EditUser");
                        }}>Edit User</button>
                    </div>
                    ))}
            </div>
        </div>
    );
}
