import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/login";
import { Register } from "../components/auth/register";
import { Authorized } from "./Authorized";
import { Home } from "../components/home/Home";
import { AllRides } from "../components/rides/Rides";
import { AllShows } from "../components/shows/Shows";
import { AllRestaurants } from "../components/restaurants/Restaurants";
import { UserReservations } from "../components/reservations/UserReservations";
import { User } from "../components/user/User";
import { EditUser } from "../components/user/EditUser";
import { RideDetails } from "../components/rides/RideDetails";
import { RestaurantDetails } from "../components/restaurants/RestaurantDetails";
import { ShowDetails } from "../components/shows/ShowDetails";

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
            <Route path="/user" element={<User token={token} />} />
            <Route path="/user/EditUser" element={<EditUser token={token} />} />
            <Route path="/rides/:rideId" element={<RideDetails />} />
            <Route path="/restaurants/:restaurantId" element={<RestaurantDetails />} />
            <Route path="/shows/:showId" element={<ShowDetails />} />
        </Routes>
    );
};