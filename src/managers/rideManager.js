export const getAllRideDetails = () => {
    const token = localStorage.getItem("auth_token")
    const headers = token
    ? { "Authorization": `Token ${token}` }
    : {};

    return fetch("http://localhost:8000/ridedetails", {
    headers
    })
    .then(response => response.json());
};

export const getSingleRideDetails = (rideId) => {
    const token = localStorage.getItem("auth_token");
    const headers = token
        ? { "Authorization": `Token ${token}` }
        : {};

    return fetch(`http://localhost:8000/ridedetails/${rideId}`, {
        headers
    })
    .then(response => response.json());
};
