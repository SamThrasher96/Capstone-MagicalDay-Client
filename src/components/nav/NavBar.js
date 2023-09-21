import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { getUser } from "../../managers/userManager";

export const NavBar = ({ token, setToken, isStaff, setIsStaff, setUserId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [guests, setGuests] = useState([]);
  const navigate = useNavigate();
  const avatarRef = useRef();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((data) => {
          setGuests(data);
        })
        .catch((error) => {
          // Handle any errors if needed.
        });
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    navigate("/login");
    handleAvatarClose();
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
      <Avatar
        alt="User Avatar"
        src={guests[0]?.profile_picture} // Use the first user's profile picture URL
        onClick={handleAvatarClick}
        ref={avatarRef}
        style={{
          cursor: "pointer",
          zIndex: 100,
          width: "70px", // Adjust the width as needed
          height: "70px", // Adjust the height as needed
        }}
      />
      {/* Rest of the code remains the same */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarClose}
        anchorReference="anchorEl"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={handleAvatarClose}>
          <Link to="/home" className="navbar-item">
            <Button variant="text">Home</Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleAvatarClose}>
          <Link to="/user" className="navbar-item">
            <Button variant="text">User</Button>
          </Link>
        </MenuItem>
        {token && (
          <MenuItem onClick={handleLogout}>
            <Button variant="text">Log Out</Button>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};





  
  