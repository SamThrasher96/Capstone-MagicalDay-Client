import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, editUser } from "../../managers/userManager";
import { Button, Card, CardContent, TextField, Typography, Grid } from "@mui/material";
import TangledTower from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/tangledTower.jpeg";
import wdwEaridescent from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/wdw earidescent.jpeg";
import MagicalDay from "/Users/samthrasher/workspace/capstone-magicalday-client/src/Magical Day.png";

export const EditUser = ({ token }) => {
  const navigate = useNavigate();
  const [users, setUser] = useState({
    user: "",
    email: "",
    password: "",
    profile_picture: "",
  });

  useEffect(() => {
    getUser(token).then((data) => setUser(data[0]));
  }, [token]);

  const changeUserState = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <img src={TangledTower} alt="Tangled Tower" style={{ width: "100%", objectFit: "cover", height: "100vh" }} />
      </Grid>
      <Grid item xs={6}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", position: "relative" }}>
          <img src={wdwEaridescent} alt="Earidescent Image" style={{ width: "100%", objectFit: "cover", height: "100%", position: "absolute" }} />

          <Card style={{
            width: "70%",
            backgroundColor: "rgba(245, 229, 221, 0.8)",
            border: "1px solid #ccc",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "1"
          }}>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
                <img src={MagicalDay} alt="Magical Day Logo" style={{ width: "300px", height: "auto" }} />
              </div>
              <Typography variant="body1" style={{ fontSize: "18px", color: "#777", marginBottom: "20px", textAlign: "center" }}>
                Update your profile information
              </Typography>
              <div style={{ textAlign: "center" }}>
                <Typography variant="subtitle1">Edit your profile</Typography>
              </div>

              <TextField
                label="Email"
                type="email"
                name="email"
                value={users.email}
                onChange={changeUserState}
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={users.password}
                onChange={changeUserState}
                fullWidth
                style={{ marginBottom: "20px" }}
              />
              <TextField
                label="Profile Picture (URL)"
                type="url"
                name="profile_picture"
                value={users.profile_picture}
                onChange={changeUserState}
                fullWidth
                style={{ marginBottom: "20px" }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={(evt) => {
                  evt.preventDefault();

                  const updatedUser = {
                    id: users.id,
                    user: users.user.id,
                    username: users.email,
                    password: users.password,
                    profile_picture: users.profile_picture,
                  };

                  editUser(updatedUser)
                    .then((response) => {
                      console.log("User updated successfully:", response);
                      navigate(`/user`);
                    })
                    .catch((error) => {
                      console.error("Error updating user:", error);
                    });
                }}
                style={{ width: "100%", padding: "10px", backgroundColor: "#2C7AAF", color: "#ffffff" }}
              >
                Update User
              </Button>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};
