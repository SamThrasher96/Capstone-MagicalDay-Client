import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllShowDetails } from "../../managers/showManager";
import "./show.css"; 

export const AllShows = () => {
    const [shows, setShows] = useState([]);
    const { showId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllShowDetails().then((data) => {
            setShows(data);
        });
    }, []);

    return (
        <div className="shows-container">
            <h2>All Shows</h2>
            <div className="shows-list">
                {shows.map((show) => (
                    <div
                        className="show-card"
                        key={`show--${show.id}`}
                        onClick={() => {
                            navigate(`/shows/${show.id}`);
                        }}
                    >
                        <img src={show.show_image} alt={show.show_name} className="show-picture" />
                        <div className="show-name">{show.show_name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}