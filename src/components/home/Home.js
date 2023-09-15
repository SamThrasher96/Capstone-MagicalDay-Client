import React from 'react';

export const Home = () => {
    return (
        <main className="container">
            <h1>Magical Day</h1>
            <h2>Where Magic Happens</h2>
            <div className="buttons">
                <button className="button">Rides</button>
                <button className="button">Restaurants</button>
                <button className="button">Shows</button>
                <button className="button">Reservations</button>
            </div>
        </main>
    );
};