import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleRestaurantDetails } from "../../managers/restaurantManager";
import { formatTime } from "../../managers/generalManager";
import { getMenuItemByLocationId } from "../../managers/menuManager";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import "./restaurant.css";

const cardStyle = {
  marginTop: "10px",
  maxWidth: "600px",
  margin: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust opacity here (0.9 for 90% opacity)
  backdropFilter: "blur(10px)", // Optional: Adds a blur effect to the background
};

const menuItemCardStyle = {
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust opacity here (0.9 for 90% opacity)
  backdropFilter: "blur(10px)", // Optional: Adds a blur effect to the background
};

export const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSingleRestaurantDetails(restaurantId).then((data) => {
      setRestaurant(data);
    });
  }, [restaurantId]);

  useEffect(() => {
    if (restaurant.location && restaurant.location.id) {
      getMenuItemByLocationId(restaurant.location.id).then((data) => {
        setMenuItems(data);
      });
    }
  }, [restaurant]);

  return (
    <div className="restaurant-container">
      <Card className="ride-details-card" style={cardStyle}>
        <CardContent>
          <img
            src={restaurant.restaurant_image}
            alt={restaurant.restaurant_name}
            className="ride-picture"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Typography variant="h4" className="ride-name" align="center">
            {restaurant.restaurant_name}
          </Typography>
          <Typography variant="body1" className="ride-description" align="center">
            {restaurant.restaurant_description}
          </Typography>
          <Typography variant="body2" className="ride-open" align="center">
            This restaurant opens at {formatTime(restaurant.restaurant_open)}
          </Typography>
          <Typography variant="body2" className="ride-close" align="center">
            This restaurant closes at {formatTime(restaurant.restaurant_close)}
          </Typography>
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              className="button"
              onClick={() => {
                navigate(`/reservations/create?locationId=${restaurant.location.id}`);
              }}
            >
              Make a reservation!
            </Button>
            <Button
              variant="contained"
              className="button"
              onClick={() => {
                navigate("/restaurants");
              }}
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={2} justifyContent="center">
        {menuItems.map((menuItem) => (
          <Grid item lg={3} key={`menu--${menuItem.id}`}>
            <Card className="menu-card" style={menuItemCardStyle}>
              <CardContent>
                <img
                  src={menuItem.image}
                  alt={menuItem.menu_name}
                  className="menu-picture"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <Typography variant="h6" className="menu-name" align="center">
                  {menuItem.name}
                </Typography>
                <Typography variant="body2" className="menu-price" align="center">
                  {menuItem.price}
                </Typography>
                <Typography variant="body2" className="menu-description" align="center">
                  {menuItem.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
