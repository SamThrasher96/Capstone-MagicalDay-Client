import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

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
                <button className="button" onClick={() => {
                    navigate("/restaurants");
                }}>Restaurants</button>
                <button className="button" onClick={() => {
                    navigate("/shows");
                }}>Shows</button>
                <button className="button" onClick={() => {
                    navigate("/reservations");
                }}>Reservations</button>
            </div>
        </main>
    );
};