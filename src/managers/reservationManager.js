export const getUserReservations = ({ token }) => {
    const currentDate = new Date().toISOString().split('T')[0];

    return fetch(`http://localhost:8000/reservations?user`, {
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
    .then((reservations) => {
        const filteredReservations = reservations.filter((reservation) => {
            const reservationDate = reservation.date;
            return reservationDate >= currentDate;
        });
        return filteredReservations;
    })
    .catch((error) => {
        console.error("Error fetching user reservations:", error);
        throw error; 
    });
}

export const deleteReservation = ({ reservationId }) => {
    return fetch(`http://localhost:8000/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}

export const createReservation =  async (reservation) => {
    const res = await fetch("http://localhost:8000/reservations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(reservation)
    });
    return await res.json();
}
