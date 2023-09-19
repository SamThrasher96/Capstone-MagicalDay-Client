import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleShowDetails } from "../../managers/showManager"; 
import { formatTime } from "../../managers/generalManager";
import "./show.css"; 

export const ShowDetails = ({ token }) => {
    const { showId } = useParams();
    const [show, setShow] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getSingleShowDetails(showId).then((data) => {
            setShow(data);
        });
    } ,[showId]);

    return (
        <div className="show-container">
            <h2>Show Details</h2>
            <div className="show-card" key={`show--${show.id}`}>
                <img src={show.show_image} alt={show.show_name} className="show-picture" />
                <div className="show-name">{show.show_name}</div>
                <div className="show-description">{show.show_description}</div>
                <div className="show-duration">This show lasts for {show.duration} minutes. </div>
                <div className="show-open"> This show opens at {formatTime(show.show_open)}</div>
                <div className="show-close"> This show closes at {formatTime(show.show_close)}</div>
            </div>
            <button className="button" onClick={() => {
                navigate("/shows");
            }}>Back</button>
        </div>
    );
}