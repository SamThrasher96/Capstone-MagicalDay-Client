import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleShowDetails } from "../../managers/showManager";
import { formatTime } from "../../managers/generalManager";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "./show.css";

const cardStyle = {
  marginTop: "10px",
  maxWidth: "600px",
  margin: "auto",
};

export const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getSingleShowDetails(showId).then((data) => {
      setShow(data);
    });
  }, [showId]);

  return (
    <div className="show-container">
      <Card className="ride-details-card" style={cardStyle}>
        <CardContent>
          <img
            src={show.show_image}
            alt={show.show_name}
            className="ride-picture"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Typography variant="h4" className="ride-name" align="center">
            {show.show_name}
          </Typography>
          <Typography variant="body1" className="ride-description" align="center">
            {show.show_description}
          </Typography>
          <Typography variant="body2" className="ride-wait-time" align="center">
            This show lasts for {show.duration} minutes.
          </Typography>
          <Typography variant="body2" className="ride-open" align="center">
            This show opens at {formatTime(show.show_open)}
          </Typography>
          <Typography variant="body2" className="ride-close" align="center">
            This show closes at {formatTime(show.show_close)}
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              className="button"
              onClick={() => {
                navigate(`/reservations/create?locationId=${show.location.id}`);
              }}
            >
              Make a reservation!
            </Button>
            <Button
              variant="contained"
              className="button"
              onClick={() => {
                navigate("/shows");
              }}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};