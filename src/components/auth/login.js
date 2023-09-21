import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../managers/authManager";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import DisneyWorldRailroadImage from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/Disney world railroad.jpeg";
import MagicalDay from "/Users/samthrasher/workspace/capstone-magicalday-client/src/Magical Day.png"; 

export const Login = ({ setToken, setUserId }) => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };
    loginUser(user).then((res) => {
      if ("valid" in res && res.valid) {
        setToken(res.token);
        setUserId(res.user);
        navigate("/Home");
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <div style={{ backgroundColor: "#2C7AAF", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ flex: "1", overflow: "hidden", position: "relative", height: "100%" }}>
        <img src={DisneyWorldRailroadImage} alt="Disney Railroad" style={{ width: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, height: "100%" }} />
      </div>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card style={{ width: "70%", backgroundColor: "#F5E5DD", border: "1px solid #ccc", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
              <img src={MagicalDay} alt="Magical Day Logo" style={{ width: "300px", height: "auto" }} />
            </div>
            <Typography variant="body1" style={{ fontSize: "18px", color: "#777", marginBottom: "20px", justifyContent: "center"}}>
              Plan your day at the most magical place on earth!
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Typography variant="subtitle1">Please sign in</Typography>
            </div>

            <TextField
              label="Email"
              type="email"
              inputRef={email}
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <TextField
              label="Password"
              type="password"
              inputRef={password}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleLogin}
              style={{ width: "100%", padding: "10px", backgroundColor: "#2C7AAF", color: "#ffffff" }}
            >
              Submit
            </Button>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <Link to="/register" style={{ display: "inline-block", color: "#2C7AAF" }}>
                Register
              </Link>
            </div>
            {isUnsuccessful ? (
              <p className="help is-danger">Email or password not valid</p>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


