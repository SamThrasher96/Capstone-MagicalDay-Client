import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, editUser } from "../../managers/userManager";
import "./user.css";

export const EditUser = ({ token }) => {
    const navigate = useNavigate();
    const [users, setUser] = useState({
        user: "",
        email: "",
        password: "",
        profile_picture: ""
    });
    const id = users.id;


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
        <form className="user-form">
            <h2 className="userForm-Title">Edit User</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        autoFocus
                        className="form-control"
                        value={users.email}
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
                        value={users.password}
                        placeholder="Password"
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
                        value={users.profile_picture}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <button
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
                className="btn btn-primary"
            >
                Update User
            </button>
        </form>
    );
};
