import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="container">
            <h1>Magical Day</h1>
            <h2>Where the Magic Happens</h2>
            <div className="buttons">
                <button className="button" onClick={() => {
                    navigate("/rides");
                }}>Rides</button>
                <button className="button">Restaurants</button>
                <button className="button">Shows</button>
                <button className="button">Reservations</button>
            </div>
        </main>
    );
};