import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { AllRides } from "../components/rides/Rides";
import { AllShows } from "../components/shows/Shows";
import { AllRestaurants } from "../components/restaurants/Restaurants";
import { UserReservations } from "../components/reservations/UserReservations";

export const ApplicationViews = ({ token, setToken, setUserId }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
            <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
            <Route path="/authorized/*" element={<Authorized />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rides" element={<AllRides />} />
            <Route path="/shows" element={<AllShows />} />
            <Route path="/restaurants" element={<AllRestaurants />} />
            <Route path="/reservations" element={<UserReservations />} />
        </Routes>
    );
};