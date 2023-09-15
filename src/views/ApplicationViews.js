import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";

export const ApplicationViews = ({ token, setToken, setUserId }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
            <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
            <Route path="/authorized/*" element={<Authorized />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    );
};