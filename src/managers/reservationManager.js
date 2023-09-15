export const getUserReservations = ({ token }) => {
    return fetch("http://localhost:8000/reservations?user", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch((error) => {
        console.error("Error fetching user reservations:", error);
        throw error; 
    });
}
