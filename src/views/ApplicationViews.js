import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";
import { Authorized } from "./Authorized"; 

export const ApplicationViews = ({ token, setToken, isStaff, setIsStaff, setUserId }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
            <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
        </Routes>
    )
}