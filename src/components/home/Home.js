import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import HomePageVideo from './HomePageVideo.mp4'; 

export const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="container">
            <video autoPlay loop muted className="video-banner">
                <source src={HomePageVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <h1>Magical Day</h1>
                <br/>
                <br/>
                <br/>
                <br/>
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
            </div>
        </main>
    );
};