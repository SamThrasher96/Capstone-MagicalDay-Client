import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../managers/userManager";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import wdwEaridescent from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/wdw earidescent.jpeg";

const UserCard = ({ guest, onEditUserClick }) => (
  <Card style={{
    width: "300px", // Adjust the width
    height: "450px", // Adjust the height
    backgroundColor: "rgba(245, 229, 221, 0.8)",
    border: "1px solid #ccc",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center horizontally
    justifyContent: "center", // Center vertically
  }}>
    <CardContent style={{ textAlign: "center" }}>
      <img
        src={guest.profile_picture}
        alt={guest.full_name}
        style={{
          width: "150px", // Increase the width
          height: "150px", // Increase the height
          borderRadius: "50%", // Make it circular
          objectFit: "cover", // Ensure the image covers the circle
        }}
      />
      <Typography variant="h6">Name: {guest.full_name}</Typography>
      <Typography variant="subtitle1">Email: {guest.email}</Typography>
      <Button variant="contained" color="primary" onClick={onEditUserClick}>
        Edit User
      </Button>
    </CardContent>
  </Card>
);

export const User = ({ token }) => {
  const [guests, setGuest] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(token).then((data) => {
      setGuest(data);
    });
  }, [token]);

  return (
    <Grid container style={{ background: `url(${wdwEaridescent})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h4" style={{ color: "#fff", marginBottom: "20px" }}>
            User Profile
          </Typography>
          {guests.map((guest) => (
            <UserCard
              key={`user--${guest.id}`}
              guest={guest}
              onEditUserClick={() => navigate("/user/EditUser")}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};





