export const getAllLocations = async () => {
    const response = await fetch(`http://localhost:8000/locations`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
    const locations = await response.json();
    return locations
}

