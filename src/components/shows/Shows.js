import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShowDetails } from "../../managers/showManager";
import "./show.css"; 

export const AllShows = () => {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllShowDetails().then((data) => {
            setShows(data);
        });
    }, []);

    const filteredShows = shows.filter((show) =>
        show.show_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="shows-container">
            <h2>All Shows</h2>
            <input
                type="text"
                placeholder="Search for rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="shows-list">
                {filteredShows.map((show) => (
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