export const getUser = (token) => {
    return fetch(`http://localhost:8000/guests?token=${token}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    .then(response => response.json())
}

export const editUser = (guest) => {
    return fetch(`http://localhost:8000/guests/${guest.id}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(guest)
    })
}

