export const getAllRestaurantDetails = () => {
    const token = localStorage.getItem("auth_token")
    const headers = token
    ? { "Authorization": `Token ${token}` }
    : {};

    return fetch("http://localhost:8000/restaurantdetails", {
    headers
    })
    .then(response => response.json());
};