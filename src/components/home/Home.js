import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';
import HomePageVideo from './HomePageVideo.mp4';
import MagicalDay from "/Users/samthrasher/workspace/capstone-magicalday-client/src/Magical Day.png";
import './home.css';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <main className="container">
          <video autoPlay loop muted className="video-banner">
            <source src={HomePageVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Card className="content-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "40px" // Increase the margin for the MagicalDay image
                }}
              >
                <img
                  src={MagicalDay}
                  alt="Magical Day Logo"
                  style={{ width: "400px", height: "auto" }} // Adjust image size
                />
              </div>
              <div className="buttons">
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large" // Increase button size
                    style={{
                        width: "140px", // Increase the width
                        height: "140px", // Increase the height
                        borderRadius: "50%", // Make the button circular
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    onClick={() => {
                      navigate('/rides');
                    }}
                  >
                    Rides
                  </Button>
      
                  <Button
                    variant="contained"
                    color="primary"
                    size="large" // Increase button size
                    style={{
                        width: "140px", // Increase the width
                        height: "140px", // Increase the height
                        borderRadius: "50%", // Make the button circular
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    onClick={() => {
                      navigate('/restaurants');
                    }}
                  >
                    Restaurants
                  </Button>
      
                  <Button
                    variant="contained"
                    color="primary"
                    size="large" // Increase button size
                    style={{
                        width: "140px", // Increase the width
                        height: "140px", // Increase the height
                        borderRadius: "50%", // Make the button circular
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    onClick={() => {
                      navigate('/shows');
                    }}
                  >
                    Shows
                  </Button>
      
                  <Button
                    variant="contained"
                    color="primary"
                    size="large" // Increase button size
                    style={{
                        width: "140px", // Increase the width
                        height: "140px", // Increase the height
                        borderRadius: "50%", // Make the button circular
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    onClick={() => {
                      navigate('/reservations');
                    }}
                  >
                    Reservations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      );
      
};


