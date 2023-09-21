import { useState } from "react";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./components/nav/NavBar";

export const MagicalDay = () => {
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'));
    const [userId, setUserIdState] = useState(parseInt(localStorage.getItem('user')));

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken);
        setTokenState(newToken);
    };

    const setUserId = (id) => {
        setUserIdState(id);
        const newUser = userId;
        localStorage.setItem("user", newUser);
    };

    const renderNavBar = token ? <NavBar token={token} setToken={setToken} setUserId={setUserId} /> : null;

    return (
        <>
            {renderNavBar}
            <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} />
        </>
    );
};