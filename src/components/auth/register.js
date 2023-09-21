import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/authManager";
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import BehindCastleImage from "/Users/samthrasher/workspace/capstone-magicalday-client/src/components/auth/auth_images/Behind castle.jpeg";
import MagicalDay from "/Users/samthrasher/workspace/capstone-magicalday-client/src/Magical Day.png"; 

export const Register = ({ setToken, setUserId }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const height = useRef();
  const profile_picture = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        height: height.current.value,
        profile_picture: profile_picture.current.value
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
          setUserId(res.user);
        }
        navigate("/login");
      });
    } else {
      setIsPasswordMismatch(true);
      passwordDialog.current.showModal();
    }
  };

  return (
    <div style={{ backgroundColor: "#2C7AAF", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ flex: "1", overflow: "hidden", position: "relative", height: "100%" }}>
        <img src={BehindCastleImage} alt="Behind Castle" style={{ width: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0, height: "100%" }} />
      </div>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card style={{ width: "70%", backgroundColor: "#F5E5DD", border: "1px solid #ccc", borderRadius: "15px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
              <img src={MagicalDay} alt="Magical Day Logo" style={{ width: "300px", height: "auto" }} />
            </div>
            <Typography variant="body1" style={{ fontSize: "18px", color: "#777", marginBottom: "20px", textAlign: "center" }}>
              Create an account
            </Typography>

            <TextField
              label="First Name"
              inputRef={firstName}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="Last Name"
              inputRef={lastName}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="Email"
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

            <TextField
              label="Verify Password"
              type="password"
              inputRef={verifyPassword}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="Height"
              inputRef={height}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <TextField
              label="Profile Picture"
              inputRef={profile_picture}
              fullWidth
              style={{ marginBottom: "20px" }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleRegister}
              style={{ width: "100%", padding: "10px", backgroundColor: "#2C7AAF", color: "#ffffff" }}
            >
              Submit
            </Button>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <Link to="/login" style={{ display: "inline-block", color: "#2C7AAF" }}>
                Cancel
              </Link>
            </div>
            {isPasswordMismatch ? (
              <p className="help is-danger">Passwords do not match</p>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
