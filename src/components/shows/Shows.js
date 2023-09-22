import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShowDetails } from "../../managers/showManager";
import { Button, TextField } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import "./show.css";

export const AllShows = () => {
    const [shows, setShows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false); 
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        getAllShowDetails().then((data) => {
            setShows(data);
        });


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const filteredShows = shows.filter((show) =>
        show.show_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rides-container"> 
            <h2 className="ride-name">All Shows</h2>
            <TextField
                label="Search for shows..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                fullWidth
                className="search-input" 
            />
            <div className="rides-list"> 
                {filteredShows.map((show) => (
                    <div
                        className="ride-card" 
                        key={`show--${show.id}`}
                        onClick={() => {
                            navigate(`/shows/${show.id}`);
                        }}
                    >
                        <img src={show.show_image} alt={show.show_name} className="ride-picture" /> {/* Use the ride-picture class for styling */}
                        <div className="ride-name">{show.show_name}</div>
                    </div>
                ))}
            </div>

            {showScrollButton && (
                <Button
                    className="scroll-to-top" 
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        right: "40px",
                        color: "#fff",
                        borderRadius: "8px",
                        width: "50px",
                        height: "50px",
                        zIndex: "99",
                    }}
                    startIcon={
                        <KeyboardDoubleArrowUpIcon
                            style={{ fontSize: 50 }}
                        />
                    }
                >
                </Button>
            )}
        </div>
    );
};
