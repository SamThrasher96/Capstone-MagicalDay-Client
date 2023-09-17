import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, editUser } from "../../managers/userManager";
import "./user.css";

export const EditUser = ({ token }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        full_name: "", 
        email: "",
        password: "",
        profile_pic: "",
    });
    const id = user.id;

    useEffect(() => {
        getUser(token).then((data) => {
            setUser(data);
        });
    }, [token]);

    const changeUserState = (event) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            full_name: user.full_name,
            email: user.email,
            password: user.password,
            profile_pic: user.profile_pic,
        };

        editUser(id, updatedUser, token)
            .then((response) => {
                console.log("User updated successfully:", response);
                navigate(`/user/${id}`);
            })
            .catch((error) => {
                console.error("Error updating user:", error);
            });
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <h2 className="userFrom-Title">Edit User</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        required
                        autoFocus
                        className="form-control"
                        value={user.full_name || ""}
                        onChange={changeUserState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        value={user.email || ""}
                        onChange={changeUserState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="form-control"
                        value={user.password || ""}
                        onChange={changeUserState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profile_pic">Profile Picture (URL):</label>
                    <input
                        type="url"
                        name="profile_pic"
                        required
                        className="form-control"
                        value={user.profile_pic || ""}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
}